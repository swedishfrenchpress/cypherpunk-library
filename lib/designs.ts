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
  /** One line for the colophon: what the stamped device is. */
  deviceNote: string;
  /** The cloth and foil, named, for the colophon. */
  materials: [string, string];
  /** The same two notes in French, for the French book page. */
  fr: { materials: [string, string]; deviceNote: string };
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
    deviceNote:
      "The 256 bits of the SHA-256 digest of the title (in ASCII), one dot per bit",
    materials: ["Oxblood linen", "Pale gold foil"],
    fr: {
      materials: ["Toile de lin sang-de-bœuf", "Dorure à chaud or pâle"],
      deviceNote:
        "Les 256 bits de l’empreinte SHA-256 du titre original (en ASCII), un point par bit",
    },
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
    deviceNote: "Five strands of barbed wire, the middle one cut",
    materials: ["Black buckram", "Red pigment foil"],
    fr: {
      materials: ["Bougran noir", "Marquage à chaud rouge"],
      deviceNote:
        "Cinq rangs de fil barbelé, celui du milieu coupé",
    },
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
    deviceNote: "A graticule with no borders drawn on it",
    materials: ["Parchment paper over boards", "Iron-gall black ink"],
    fr: {
      materials: ["Papier parchemin sur carton", "Encre noire ferro-gallique"],
      deviceNote:
        "Un canevas de méridiens et de parallèles, sans aucune frontière",
    },
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
    deviceNote: "A banknote guilloche, six interleaved rosettes",
    materials: ["Banknote green linen", "Silver foil"],
    fr: {
      materials: ["Toile de lin vert billet", "Marquage à chaud argent"],
      deviceNote:
        "Un guillochis de billet de banque : six rosaces entrelacées",
    },
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
    deviceNote: "A deduction tree: one axiom at the top, thirty-one nodes",
    materials: ["Slate buckram", "Copper foil"],
    fr: {
      materials: ["Bougran ardoise", "Marquage à chaud cuivre"],
      deviceNote:
        "Un arbre de déduction : un axiome au sommet, trente et un nœuds",
    },
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
    deviceNote: "Two sets of ripples, one watching from above, one from below",
    materials: ["Cyan paper over boards", "Black ink"],
    fr: {
      materials: ["Papier cyan sur carton", "Encre noire"],
      deviceNote:
        "Deux séries d’ondes : l’une observe d’en haut, l’autre d’en bas",
    },
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
    deviceNote: "A coin, half of it hatched over: the blinding factor",
    materials: ["Walnut linen", "Gold foil"],
    fr: {
      materials: ["Toile de lin noyer", "Dorure à chaud"],
      deviceNote:
        "Une pièce à demi couverte de hachures : le facteur d’aveuglement",
    },
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
    deviceNote: "A sealed envelope, after the essay's own argument",
    materials: ["Mustard linen", "Black ink"],
    fr: {
      materials: ["Toile de lin moutarde", "Encre noire"],
      deviceNote:
        "Une enveloppe cachetée, d’après l’argument même de l’essai",
    },
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
    deviceNote: "Nineteen cells of a comb, each the same as its neighbours",
    materials: ["Aubergine linen", "Rose foil"],
    fr: {
      materials: ["Toile de lin aubergine", "Marquage à chaud rose"],
      deviceNote:
        "Dix-neuf alvéoles d’un rayon de miel, toutes semblables à leurs voisines",
    },
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
    deviceNote:
      "The word “curiosity” as it travels a serial line: nine bytes, 8-N-1",
    materials: ["Midnight buckram", "Amber foil"],
    fr: {
      materials: ["Bougran bleu nuit", "Marquage à chaud ambre"],
      deviceNote:
        "Le mot « curiosity » tel qu’il circule sur une liaison série : neuf octets, 8-N-1",
    },
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
    deviceNote: "An eleven-pointed star drawn in one unbroken line",
    materials: ["Forest buckram", "Gold foil"],
    fr: {
      materials: ["Bougran vert forêt", "Dorure à chaud"],
      deviceNote:
        "Une étoile à onze branches tracée d’un seul trait",
    },
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
    deviceNote: "A Doric column, for the Stoics",
    materials: ["Stone paper over boards", "Black ink"],
    fr: {
      materials: ["Papier gris pierre sur carton", "Encre noire"],
      deviceNote:
        "Une colonne dorique, pour les stoïciens",
    },
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
    deviceNote: "A Koch snowflake, the fractal Finney imagined on a banknote",
    materials: ["Ultramarine linen", "Gold foil"],
    fr: {
      materials: ["Toile de lin outremer", "Dorure à chaud"],
      deviceNote:
        "Un flocon de Koch, la fractale que Finney imaginait sur un billet",
    },
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
    deviceNote: "Twenty-one blocks, chained",
    materials: ["Orange paper over boards", "Black ink"],
    fr: {
      materials: ["Papier orange sur carton", "Encre noire"],
      deviceNote:
        "Vingt et un blocs, enchaînés",
    },
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
    deviceNote: "A route picked out between stars",
    materials: ["Indigo linen", "Silver foil"],
    fr: {
      materials: ["Toile de lin indigo", "Marquage à chaud argent"],
      deviceNote:
        "Un itinéraire tracé d’étoile en étoile",
    },
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
    deviceNote: "Nineteen lines of signal, most of it lost in the fog",
    materials: ["Gunmetal linen", "White foil"],
    fr: {
      materials: ["Toile de lin gris acier", "Marquage à chaud blanc"],
      deviceNote:
        "Dix-neuf lignes de signal, presque tout perdu dans le brouillard",
    },
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
    deviceNote: "An archipelago with no capital",
    materials: ["Emerald linen", "Mint foil"],
    fr: {
      materials: ["Toile de lin émeraude", "Marquage à chaud menthe"],
      deviceNote:
        "Un archipel sans capitale",
    },
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
    deviceNote:
      "A small-world ring: every node knows its neighbours, a few know someone far away",
    materials: ["Pale blue paper over boards", "Navy ink"],
    fr: {
      materials: ["Papier bleu pâle sur carton", "Encre bleu marine"],
      deviceNote:
        "Un anneau « petit monde » : chaque nœud connaît ses voisins, quelques-uns connaissent quelqu’un au loin",
    },
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
    deviceNote: "Three currencies approaching a line they never reach",
    materials: ["Tan linen", "Sepia ink"],
    fr: {
      materials: ["Toile de lin havane", "Encre sépia"],
      deviceNote:
        "Trois monnaies qui tendent vers une droite sans jamais l’atteindre",
    },
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
    deviceNote: "A map whose borders give out toward the east",
    materials: ["Steel blue buckram", "Cream foil"],
    fr: {
      materials: ["Bougran bleu acier", "Marquage à chaud crème"],
      deviceNote:
        "Une carte dont les frontières s’effacent vers l’est",
    },
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
    deviceNote: "The copyright mark, struck through",
    materials: ["Chalk linen", "Vermilion ink"],
    fr: {
      materials: ["Toile de lin craie", "Encre vermillon"],
      deviceNote:
        "Le signe du copyright, barré",
    },
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
    deviceNote: "A plain double rule",
    materials: ["Linen", "Cream foil"],
    fr: {
      materials: ["Toile de lin", "Marquage à chaud crème"],
      deviceNote: "Un simple double filet",
    },
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
