// What the page is wearing: the book in hand's cloth and foil. Client-side
// helpers (no React) shared by the shelf and the route watcher. The state lives
// on <html>:
//
//   --book-bg / --book-fg   the book in hand's pair     (remembered per tab)
//
// app/globals.css turns those into --bg / --fg. The same logic runs once before
// first paint from the inline script in app/layout.tsx (SURFACE_INIT below), so
// a reload never flashes the wrong cloth.

const BOOK_KEY = "book";

/** Keep the mobile browser chrome on the page's ground. */
function syncChrome(bg: string) {
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
  syncChrome(bg);
}

/** The book last in hand in this tab, if any. */
export function lastBook(): string | null {
  try {
    return sessionStorage.getItem(BOOK_KEY);
  } catch {
    return null;
  }
}

/**
 * The before-paint script. `pairs` maps slug → [bg, fg]; `house` is the pair
 * worn when no book is in hand. It works out the book from the URL or the tab's
 * memory and writes its pair to <html> synchronously during parse.
 *
 * On the landing it also raises [data-restore] when the tab remembers a book,
 * so the shelf can stay hidden for the few frames before it turns to that book
 * instead of flashing its default one.
 */
export function surfaceInit(
  pairs: Record<string, [string, string]>,
  house: [string, string],
): string {
  return `(function(){try{var d=document.documentElement,P=${JSON.stringify(pairs)},H=${JSON.stringify(house)},s=null;var m=location.pathname.match(/\\/book\\/([^\\/]+)/);try{s=m?decodeURIComponent(m[1]):sessionStorage.getItem('${BOOK_KEY}')}catch(e){}var p=(s&&P[s])||H;d.style.setProperty('--book-bg',p[0]);d.style.setProperty('--book-fg',p[1]);if(!m&&s&&P[s]&&/^\\/(fr\\/?)?$/.test(location.pathname)){d.setAttribute('data-restore','');setTimeout(function(){d.removeAttribute('data-restore')},2500)}var c=document.querySelector('meta[name="theme-color"]');if(!c){c=document.createElement('meta');c.setAttribute('name','theme-color');document.head.appendChild(c)}c.setAttribute('content',p[0])}catch(e){}})();`;
}
