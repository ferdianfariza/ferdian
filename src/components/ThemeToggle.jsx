import { useState, useEffect } from "react";
import { ToggleRightIcon, ToggleLeftIcon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    // Baca preferensi yang tersimpan
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark";
    setIsLight(!dark);
  }, []);

  function handleToggle() {
    const html = document.documentElement;
    const nowDark = html.classList.toggle("dark");
    setIsLight(!nowDark);
    localStorage.setItem("theme", nowDark ? "dark" : "light");
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 cursor-pointer"
    >
      <p>Switcher</p>
      {isLight ? (
        <ToggleRightIcon size={16} weight="light" />
      ) : (
        <ToggleLeftIcon size={16} weight="light" />
      )}
    </button>
  );
}
