import { c as createComponent } from './astro-component_iWIsUysT.mjs';
import 'piccolore';
import { w as createRenderInstruction, h as addAttribute, k as renderTemplate, s as spreadAttributes, u as unescapeHTML, o as renderComponent, x as renderHead, y as renderSlot } from './entrypoint_u29Gd9dC.mjs';
import 'clsx';
import { ToggleRightIcon, ToggleLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$OpenGraphArticleTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro", void 0);

const $$OpenGraphBasicTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}><meta property="og:type"${addAttribute(openGraph.basic.type, "content")}><meta property="og:image"${addAttribute(openGraph.basic.image, "content")}><meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro", void 0);

const $$OpenGraphImageTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}${height ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}${alt ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/OpenGraphImageTags.astro", void 0);

const $$OpenGraphOptionalTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro", void 0);

const $$ExtendedTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}${props.extend.meta?.map(({ content, httpEquiv, media, name, property }) => renderTemplate`<meta${addAttribute(name, "name")}${addAttribute(property, "property")}${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(media, "media")}>`)}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/ExtendedTags.astro", void 0);

const $$TwitterTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/TwitterTags.astro", void 0);

const $$LanguageAlternatesTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro", void 0);

const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || (props.openGraph.basic.title ?? void 0) == void 0 || (props.openGraph.basic.type ?? void 0) == void 0 || (props.openGraph.basic.image ?? void 0) == void 0) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is strongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  const baseUrl = Astro2.site ?? Astro2.url;
  const defaultCanonicalUrl = new URL(Astro2.url.pathname + Astro2.url.search, baseUrl);
  const shouldRemoveTrailingSlash = Astro2.props.removeTrailingSlashForRoot && Astro2.url.pathname === "/";
  const canonicalHref = shouldRemoveTrailingSlash ? defaultCanonicalUrl.origin + defaultCanonicalUrl.search : defaultCanonicalUrl.href;
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}<link rel="canonical"${addAttribute(Astro2.props.canonical || canonicalHref, "href")}>${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}${Astro2.props.noarchive ? ", noarchive" : ""}${Astro2.props.nocache ? ", nocache" : ""}${Astro2.props.robotsExtras ? `, ${Astro2.props.robotsExtras}` : ""}`, "content")}>${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "E:/REACT/ferdian/node_modules/astro-seo/src/SEO.astro", void 0);

function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleToggle,
      className: "flex items-center gap-2 cursor-pointer",
      children: [
        /* @__PURE__ */ jsx("p", { children: "Switcher" }),
        isLight ? /* @__PURE__ */ jsx(ToggleRightIcon, { size: 16, weight: "light" }) : /* @__PURE__ */ jsx(ToggleLeftIcon, { size: 16, weight: "light" })
      ]
    }
  );
}

const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, wrapperClass = "mb-1" } = Astro2.props;
  let clacks = 0;
  try {
    const response = await fetch(new URL("/api/tap-counter", Astro2.url));
    if (response.ok) {
      const data = await response.json();
      clacks = data.count ?? 0;
    }
  } catch {
    clacks = 0;
  }
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"><meta name="viewport" content="width=device-width"><meta name="author" content="Ferdian Nur Fariza"><meta name="description" content="Ferdian Nur Fariza is AI Engineer based in Indonesia. Co-founder at Oxidraw, Tech Lead intern at PT Lumintu Group, and Research Assistant at IDSS. Former Software Engineer and AI Engineer intern at Telkom Indonesia."><meta name="keywords" content="Ferdian Nur Fariza, Ferdian Fariza, software engineer, Indonesia, Oxidraw, Telkom Indonesia, AI engineer, full-stack developer, web development, IDSS, Dian Nuswantoro"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><title>Ferdian N. Fariza</title>${renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> <div${addAttribute(`md:border max-w-3xl mx-auto h-auto mt-2 md:mt-10 p-5 text-xs ${wrapperClass}`, "class")} data-astro-cid-sckkx6r4> <div class="mb-10" data-astro-cid-sckkx6r4> <div class="flex justify-between border-y py-2" data-astro-cid-sckkx6r4> <a href="/" class="hover:opacity-70 transition-opacity font-medium" aria-label="Back to home" data-astro-cid-sckkx6r4>
Ferdian N. Fariza
</a> <div id="clock" data-astro-cid-sckkx6r4></div> ${renderComponent($$result, "ThemeToggle", ThemeToggle, { "client:load": true, "client:component-hydration": "load", "client:component-path": "E:/REACT/ferdian/src/components/ThemeToggle", "client:component-export": "ThemeToggle", "data-astro-cid-sckkx6r4": true })} </div> <div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-b py-2" data-astro-cid-sckkx6r4> <a href="https://www.linkedin.com/in/ferdian-nur-fariza/" target="_blank" rel="noopener noreferrer" class="flex gap-2 hover:opacity-70 transition-opacity" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>Connect</p> ${renderComponent($$result, "ArrowUpRightIcon", ArrowUpRightIcon, { "size": 10, "weight": "light", "data-astro-cid-sckkx6r4": true })} </a> <a href="/experience" class="flex gap-2 hover:opacity-70 transition-opacity" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>Experience</p> ${renderComponent($$result, "ArrowUpRightIcon", ArrowUpRightIcon, { "size": 10, "weight": "light", "data-astro-cid-sckkx6r4": true })} </a> <a href="https://github.com/ferdianfariza" target="_blank" rel="noopener noreferrer" class="flex gap-2 hover:opacity-70 transition-opacity" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>GitHub</p> ${renderComponent($$result, "ArrowUpRightIcon", ArrowUpRightIcon, { "size": 10, "weight": "light", "data-astro-cid-sckkx6r4": true })} </a> <a href="mailto:ferdianfariza@gmail.com" class="flex gap-2 hover:opacity-70 transition-opacity" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>Mail</p> ${renderComponent($$result, "ArrowUpRightIcon", ArrowUpRightIcon, { "size": 10, "weight": "light", "data-astro-cid-sckkx6r4": true })} </a> <!-- <div class="hidden sm:flex gap-2 font-bold sm:ml-auto ">
            <p>Clackz: <span id="clacks-display">{clacks}</span></p>
          </div> --> </div> <div class="flex gap-2 font-bold sm:ml-auto border-b py-2" data-astro-cid-sckkx6r4> <p data-astro-cid-sckkx6r4>Clackz: <span id="clacks-display" data-astro-cid-sckkx6r4>${clacks}</span></p> </div> </div> ${renderSlot($$result, $$slots["default"])} </div> <div class="h-1 md:h-25" data-astro-cid-sckkx6r4></div> ${renderScript($$result, "E:/REACT/ferdian/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} ${renderScript($$result, "E:/REACT/ferdian/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts")} ${renderScript($$result, "E:/REACT/ferdian/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts")}</body></html>`;
}, "E:/REACT/ferdian/src/layouts/Layout.astro", void 0);

export { $$Layout as $, renderScript as r };
