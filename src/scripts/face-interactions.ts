import confetti from "canvas-confetti";

const faceTrigger = document.getElementById("face-trigger");
const counterValue = document.getElementById("tap-counter-value");
const fallbackStorageKey = "face-tap-counter-local";
const FLUSH_INTERVAL_MS = 30_000;
const MAX_BATCH_SIZE = 20;

let currentCount = 0;
let counterEnabled = true;
let lastTapTimestamp = 0;
let hasLoadedInitialCount = false;
let pendingTapCount = 0;
let flushTimerId: number | null = null;
let flushInProgress = false;

function renderCount(nextCount: number) {
  if (!counterValue) {
    return;
  }

  currentCount = nextCount;
  counterValue.textContent = String(nextCount);

  // Add pop animation
  counterValue.classList.add("counter-pop");
  setTimeout(() => {
    counterValue.classList.remove("counter-pop");
  }, 500);
}

function readFallbackCount() {
  try {
    const storedValue = window.localStorage.getItem(fallbackStorageKey);
    const parsedValue = Number(storedValue);
    return Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : 0;
  } catch {
    return 0;
  }
}

function writeFallbackCount(nextCount: number) {
  try {
    window.localStorage.setItem(fallbackStorageKey, String(nextCount));
  } catch {
    // Ignore storage failures and keep the in-memory value.
  }
}

function handleTap() {
  if (!faceTrigger) {
    return;
  }

  // Add click animation
  faceTrigger.classList.add("face-click");
  setTimeout(() => {
    faceTrigger.classList.remove("face-click");
  }, 600);

  const rect = faceTrigger.getBoundingClientRect();
  const originX = (rect.left + rect.width / 2) / window.innerWidth;
  const originY = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 55,
    spread: 72,
    startVelocity: 35,
    origin: { x: originX, y: originY },
  });

  queueIncrement();
}

async function loadCount() {
  try {
    const response = await fetch("/api/tap-counter", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    counterEnabled = data.configured !== false;

    if (!counterEnabled) {
      renderCount(readFallbackCount());
      return;
    }

    if (typeof data.count === "number") {
      renderCount(data.count);
    }
  } catch {
    counterEnabled = false;
    renderCount(readFallbackCount());
  } finally {
    hasLoadedInitialCount = true;
  }
}

async function flushTapQueue(force = false) {
  if (!counterEnabled || flushInProgress || pendingTapCount < 1) {
    return;
  }

  const amount = pendingTapCount;
  pendingTapCount = 0;
  flushInProgress = true;

  try {
    const response = await fetch("/api/tap-counter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ interaction: "tap", amount }),
      keepalive: force,
    });

    if (!response.ok) {
      throw new Error("Counter request failed.");
    }

    const data = await response.json();
    counterEnabled = data.configured !== false;

    if (!counterEnabled) {
      writeFallbackCount(currentCount);
      return;
    }

    if (typeof data.count === "number") {
      renderCount(data.count);
    }
  } catch {
    pendingTapCount += amount;
  } finally {
    flushInProgress = false;
  }
}

function ensureFlushTimer() {
  if (flushTimerId !== null) {
    return;
  }

  flushTimerId = window.setInterval(() => {
    void flushTapQueue();
  }, FLUSH_INTERVAL_MS);
}

function queueIncrement() {
  if (!counterEnabled) {
    const fallbackCount = currentCount + 1;
    writeFallbackCount(fallbackCount);
    renderCount(fallbackCount);
    return;
  }

  if (!hasLoadedInitialCount) {
    void loadCount();
  }

  pendingTapCount += 1;
  renderCount(currentCount + 1);

  ensureFlushTimer();

  if (pendingTapCount >= MAX_BATCH_SIZE) {
    void flushTapQueue();
  }
}

function initFaceInteractions() {
  if (faceTrigger) {
    faceTrigger.addEventListener("pointerup", (event) => {
      if (event.pointerType === "mouse") {
        return;
      }

      lastTapTimestamp = Date.now();
      handleTap();
    });

    faceTrigger.addEventListener("click", () => {
      if (Date.now() - lastTapTimestamp < 500) {
        return;
      }

      handleTap();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      void flushTapQueue(true);
    }
  });

  window.addEventListener("pagehide", () => {
    void flushTapQueue(true);
  });

  loadCount();
}

initFaceInteractions();
