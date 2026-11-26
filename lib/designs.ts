// The bindings. Every text in the library is its own object: a cloth, a foil,
// a spine set in its own manner, and a stamped device drawn from its subject.
// This file is that object's spec sheet, keyed by book slug. Content (titles,
// blurbs, files) stays in lib/books.ts; nothing here is content.
//
// A book with no entry still gets a sober default binding derived from its
// `color`, so adding a text to lib/books.ts remains a one-entry job. Give it an
// entry here when it has earned its own cloth.
//
// Units: `h` (height) and `t` (spine thickness) are in book-ems, where a
// full-height book is 31.25em tall and 1em is 16px on a 500px-tall shelf. The
// shelf scales the em with the viewport, so these are proportions, not pixels.

import type { Book } from "@/lib/books";

/** How the spine is lettered. */
export type SpineStyle = "roman" | "italic" | "caps" | "mono" | "monoLower";
/** Where the title block sits on the front cover. */
export type CoverLayout = "tl" | "center" | "foot";
/** Cover material: woven cloth, coarse buckram, or smooth paper over boards. */
export type Weave = "linen" | "buckram" | "paper";

export type DeviceId =
  | "digest"
  | "wire"
  | "globe"
  | "guilloche"
  | "tree"
  | "watch"
  | "blind"
  | "envelope"
  | "comb"
  | "baud"
  | "star"
  | "column"
  | "fractal"
  | "blocks"
  | "wayfare"
  | "fog"
  | "islands"
  | "smallworld"
  | "asymptote"
  | "borders"
  | "copy"
  | "rule";

export type Design = {
  /** Cover material colour. */
  cloth: string;
  /** Stamp colour: foil or ink, on the cloth. */
  foil: string;
  /** The page's ground when this book is in hand (the tinted light). */
  bg: string;
  /** The page's ink when this book is in hand. */
  fg: string;
  h: number;
  t: number;
  spine: SpineStyle;
  cover: CoverLayout;
  weave: Weave;
  device: DeviceId;
  /** How the device sits on the board: boxed in the middle (default), run edge
   *  to edge ("bleed"), or oversized and off the fore-edge ("edge"). */
  fit?: "bleed" | "edge";
};

const DESIGNS: Record<string, Design> = {
  "a-cypherpunks-manifesto": {
    cloth: "#7b2530",
    foil: "#e9cf96",
    bg: "#4a141c",
    fg: "#f1d6a4",
    h: 30.6,
    t: 3.3,
    spine: "roman",
    cover: "tl",
    weave: "linen",
    device: "digest",
  },
  "the-crypto-anarchist-manifesto": {
    cloth: "#19191c",
    foil: "#ea5a40",
    bg: "#101012",
    fg: "#ff8566",
    h: 29.6,
    t: 3.0,
    spine: "caps",
    cover: "foot",
    weave: "buckram",
    device: "wire",
    fit: "bleed",
  },
  "a-declaration-of-the-independence-of-cyberspace": {
    cloth: "#e6dcc0",
    foil: "#2a2118",
    bg: "#e2d7b8",
    fg: "#241c13",
    h: 31.25,
    t: 3.5,
    spine: "italic",
    cover: "center",
    weave: "paper",
    device: "globe",
  },
  "your-secret-right-to-cash": {
    cloth: "#3d5b4a",
    foil: "#dfe9dc",
    bg: "#22382c",
    fg: "#d6e8d2",
    h: 30.2,
    t: 3.4,
    spine: "mono",
    cover: "tl",
    weave: "linen",
    device: "guilloche",
    fit: "edge",
  },
  "the-praxeology-of-privacy": {
    cloth: "#2c323c",
    foil: "#dd8f5c",
    bg: "#191e26",
    fg: "#e69c69",
    h: 31.25,
    t: 5.3,
    spine: "caps",
    cover: "tl",
    weave: "buckram",
    device: "tree",
  },
  "of-cypherpunks-and-sousveillance": {
    cloth: "#38a3bb",
    foil: "#0b1a1f",
    bg: "#a3d9e6",
    fg: "#10242b",
    h: 29.4,
    t: 2.9,
    spine: "monoLower",
    cover: "foot",
    weave: "paper",
    device: "watch",
  },
  "protecting-privacy-with-electronic-cash": {
    cloth: "#5b3b29",
    foil: "#e6c78e",
    bg: "#38231a",
    fg: "#ebcf9b",
    h: 30.0,
    t: 2.9,
    spine: "roman",
    cover: "center",
    weave: "linen",
    device: "blind",
  },
  "why-i-wrote-pgp": {
    cloth: "#c99b2f",
    foil: "#1c1810",
    bg: "#e3b94f",
    fg: "#1e190e",
    h: 30.8,
    t: 3.2,
    spine: "roman",
    cover: "tl",
    weave: "linen",
    device: "envelope",
  },
  "definition-of-democratic-civilization": {
    cloth: "#40264f",
    foil: "#eaa9bc",
    bg: "#281634",
    fg: "#efb3c5",
    h: 30.4,
    t: 3.3,
    spine: "italic",
    cover: "center",
    weave: "linen",
    device: "comb",
  },
  "the-conscience-of-a-hacker": {
    cloth: "#101b33",
    foil: "#f0a63c",
    bg: "#0a1224",
    fg: "#f3b04e",
    h: 29.8,
    t: 3.0,
    spine: "mono",
    cover: "foot",
    weave: "buckram",
    device: "baud",
  },
  "the-cyphernomicon": {
    cloth: "#1f3a2c",
    foil: "#dcc27a",
    bg: "#12241b",
    fg: "#dfc680",
    h: 31.25,
    t: 5.0,
    spine: "caps",
    cover: "center",
    weave: "buckram",
    device: "star",
  },
  "meditations-on-cypherpunk-nightmares": {
    cloth: "#b8b3a6",
    foil: "#23211d",
    bg: "#c6c1b3",
    fg: "#22201c",
    h: 30.3,
    t: 3.2,
    spine: "caps",
    cover: "center",
    weave: "paper",
    device: "column",
  },
  "the-beauty-of-ecash": {
    cloth: "#1f2f8a",
    foil: "#f0c868",
    bg: "#172268",
    fg: "#f2cd74",
    h: 29.6,
    t: 2.9,
    spine: "italic",
    cover: "tl",
    weave: "linen",
    device: "fractal",
  },
  "21-lessons": {
    cloth: "#ef8a1d",
    foil: "#17110a",
    bg: "#f8b05c",
    fg: "#1d1408",
    h: 30.6,
    t: 3.9,
    spine: "mono",
    cover: "foot",
    weave: "paper",
    device: "blocks",
  },
  "a-lodging-of-wayfaring-men": {
    cloth: "#2a2560",
    foil: "#d0d4e8",
    bg: "#1b1840",
    fg: "#d6d9ee",
    h: 31.0,
    t: 4.9,
    spine: "roman",
    cover: "tl",
    weave: "linen",
    device: "wayfare",
  },
  "fog-of-cryptowar": {
    cloth: "#56636b",
    foil: "#eef2f1",
    bg: "#37424a",
    fg: "#e6edec",
    h: 30.0,
    t: 3.3,
    spine: "monoLower",
    cover: "center",
    weave: "linen",
    device: "fog",
    fit: "bleed",
  },
  "libertaria-in-cyberspace": {
    cloth: "#0f4d38",
    foil: "#c9eedb",
    bg: "#093324",
    fg: "#bfe8d2",
    h: 29.8,
    t: 3.0,
    spine: "italic",
    cover: "foot",
    weave: "linen",
    device: "islands",
  },
  "measuring-freenet-in-the-wild": {
    cloth: "#ccd6e6",
    foil: "#1b2f80",
    bg: "#d3dcec",
    fg: "#19296f",
    h: 30.5,
    t: 3.0,
    spine: "mono",
    cover: "tl",
    weave: "paper",
    device: "smallworld",
  },
  "ideal-money-and-asymptotically-ideal-money": {
    cloth: "#b29a6b",
    foil: "#2b2010",
    bg: "#4b4233",
    fg: "#eedcae",
    h: 30.2,
    t: 3.1,
    spine: "roman",
    cover: "tl",
    weave: "linen",
    device: "asymptote",
  },
  "farewell-to-westphalia": {
    cloth: "#27506e",
    foil: "#f1e3c0",
    bg: "#17344a",
    fg: "#f0dfb8",
    h: 31.25,
    t: 4.6,
    spine: "caps",
    cover: "foot",
    weave: "buckram",
    device: "borders",
    fit: "bleed",
  },
  "against-intellectual-property": {
    cloth: "#f0ece2",
    foil: "#c2341d",
    bg: "#ece7da",
    fg: "#8a1f0f",
    h: 30.4,
    t: 3.4,
    spine: "roman",
    cover: "center",
    weave: "linen",
    device: "copy",
  },
};

/** The house pair: what the page wears before any book is in hand. It is the
 *  Manifesto's oxblood and gold, so the library's own colour is its first book's. */
export const HOUSE = {
  bg: DESIGNS["a-cypherpunks-manifesto"].bg,
  fg: DESIGNS["a-cypherpunks-manifesto"].fg,
};

// Mix a #rrggbb toward black by `k` (0..1). Used only by the fallback binding.
function shade(hex: string, k: number): string {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    Math.round(v * (1 - k))
      .toString(16)
      .padStart(2, "0"),
  );
  return `#${c.join("")}`;
}

/** The binding for a book: its own, or a sober default cut from its `color`. */
export function designFor(book: Pick<Book, "slug" | "color" | "h">): Design {
  const own = DESIGNS[book.slug];
  if (own) return own;
  return {
    cloth: book.color,
    foil: "#eadfc4",
    bg: shade(book.color, 0.4),
    fg: "#eadfc4",
    h: 30.2,
    t: 3.2,
    spine: "roman",
    cover: "tl",
    weave: "linen",
    device: "rule",
  };
}

/** slug → [bg, fg], for the before-paint script that dresses the page. */
export function surfacePairs(slugs: string[]): Record<string, [string, string]> {
  const out: Record<string, [string, string]> = {};
  for (const slug of slugs) {
    const d = DESIGNS[slug];
    if (d) out[slug] = [d.bg, d.fg];
  }
  return out;
}
