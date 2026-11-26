// What the page is wearing. Client-side helpers (no React) shared by the shelf,
// the light switch and the route watcher. The state lives on <html>:
//
//   [data-light]            tint | day | night          (persisted: localStorage)
//   --book-bg / --book-fg   the book in hand's pair     (persisted per tab)
//
// app/globals.css turns those into --bg / --fg. The same logic runs once before
// first paint from the inline script in app/layout.tsx (SURFACE_INIT below), so
// a reload never flashes the wrong cloth.

export type Light = "tint" | "day" | "night";

export const LIGHTS: Light[] = ["tint", "day", "night"];

// Mirrors --day-* / --night-* in app/globals.css (for the browser-chrome colour).
const DAY_BG = "#ffffe1";
const NIGHT_BG = "#060504";

const BOOK_KEY = "book";
const LIGHT_KEY = "light";

export function currentLight(): Light {
  const v = document.documentElement.getAttribute("data-light");
  return v === "day" || v === "night" ? v : "tint";
}

/** Keep the mobile browser chrome on the page's ground. */
function syncChrome() {
  const root = document.documentElement;
  const light = currentLight();
  const bg =
    light === "day"
      ? DAY_BG
      : light === "night"
        ? NIGHT_BG
        : root.style.getPropertyValue("--book-bg") || "#4a141c";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg);
}

/** Dress the page in a book's pair, and remember which book for this tab. */
export function wear(slug: string, bg: string, fg: string) {
  const root = document.documentElement;
  root.style.setProperty("--book-bg", bg);
  root.style.setProperty("--book-fg", fg);
  try {
    sessionStorage.setItem(BOOK_KEY, slug);
  } catch {
    /* storage blocked: the page still wears the book for this view */
  }
  syncChrome();
}

/** The book last in hand in this tab, if any. */
export function lastBook(): string | null {
  try {
    return sessionStorage.getItem(BOOK_KEY);
  } catch {
    return null;
  }
}

export function setLight(light: Light) {
  document.documentElement.setAttribute("data-light", light);
  try {
    localStorage.setItem(LIGHT_KEY, light);
  } catch {
    /* storage blocked: the light still applies for this view */
  }
  syncChrome();
}

/**
 * The before-paint script. `pairs` maps slug → [bg, fg]; `house` is the pair
 * worn when no book is in hand. It reads the saved light (migrating the old
 * light/dark `theme` key), works out the book from the URL or the tab's memory,
 * and writes both to <html> synchronously during parse.
 *
 * On the landing it also raises [data-restore] when the tab remembers a book,
 * so the shelf can stay hidden for the few frames before it turns to that book
 * instead of flashing its default one.
 */
export function surfaceInit(
  pairs: Record<string, [string, string]>,
  house: [string, string],
): string {
  return `(function(){try{var d=document.documentElement,P=${JSON.stringify(pairs)},H=${JSON.stringify(house)},l=null,s=null;try{l=localStorage.getItem('${LIGHT_KEY}');if(!l){var o=localStorage.getItem('theme');l=o==='light'?'day':o==='dark'?'night':null}}catch(e){}if(l!=='day'&&l!=='night')l='tint';d.setAttribute('data-light',l);var m=location.pathname.match(/\\/book\\/([^\\/]+)/);try{s=m?decodeURIComponent(m[1]):sessionStorage.getItem('${BOOK_KEY}')}catch(e){}var p=(s&&P[s])||H;d.style.setProperty('--book-bg',p[0]);d.style.setProperty('--book-fg',p[1]);if(!m&&s&&P[s]&&/^\\/(fr\\/?)?$/.test(location.pathname)){d.setAttribute('data-restore','');setTimeout(function(){d.removeAttribute('data-restore')},2500)}var c=document.querySelector('meta[name="theme-color"]');if(!c){c=document.createElement('meta');c.setAttribute('name','theme-color');document.head.appendChild(c)}c.setAttribute('content',l==='day'?'${DAY_BG}':l==='night'?'${NIGHT_BG}':p[0])}catch(e){}})();`;
}
