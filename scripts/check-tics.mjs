// The owner's non-negotiables, checked. Run by `npm run check` and at the start
// of `npm run build`, so a violation fails the build (and the deploy).
//
//   1. No square brackets around a label, no middle dots, no arrows, in
//      anything that ships: interface text, CSS `content`, French included.
//   2. Fragment Mono (--font-mono) only where it is allowed: the label voice,
//      lettering on a book, the index's search field, code inside a text.
//
// Why, in the owner's words: "that is ai slop". See DESIGN.md.
// Comments are not checked; French guillemets (« ») are quotation marks and
// are allowed.

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "lib/i18n.ts", "lib/books.ts"];
// the local share-card bench is not part of the site
const SKIP = /(^|\/)og-lab\//;

const MONO_ALLOWED = new Set([
  "app/globals.css", // .label, the chrome voice
  "components/book.module.css", // lettering stamped on a book
  "components/Collection/collection.module.css", // the search field
  "app/book/[slug]/page.module.css", // code inside a text
]);

const files = [];
const walk = (p) => {
  if (!fs.existsSync(p)) return;
  if (fs.statSync(p).isDirectory()) {
    for (const f of fs.readdirSync(p)) walk(path.join(p, f));
  } else if (/\.(tsx?|css)$/.test(p) && !SKIP.test(p)) {
    files.push(p.split(path.sep).join("/"));
  }
};
ROOTS.forEach(walk);

// blank out comments, keeping line numbers
const strip = (s) =>
  s
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`\\])\/\/[^\n]*/g, (m, keep) => keep + " ".repeat(m.length - keep.length));

const TICS = [
  ["middle dot", /[·•∙⋅]|&(middot|bull);/],
  [
    "arrow",
    /[←-⇿⟵-⟿➔➜▶▸‹›]|&[lrud]arr;|(["'`>]\s*)(->|<-)/,
  ],
  [
    "bracketed label",
    // "[ words ]" with the inner spaces a label has and code does not, "[+]",
    // or a bracket set from CSS
    /\[ +[^\[\]\n]{1,60} +\]|\[[+\-−]\]|content:\s*["']\s*[\[\]]/,
  ],
];

let found = 0;
const report = (file, line, what, text) => {
  found++;
  console.error(`${file}:${line}  ${what}: ${text.trim().slice(0, 90)}`);
};

for (const file of files) {
  const lines = strip(fs.readFileSync(file, "utf8")).split("\n");
  lines.forEach((text, i) => {
    for (const [what, re] of TICS) if (re.test(text)) report(file, i + 1, what, text);
    if (file.endsWith(".css") && /--font-mono/.test(text) && !MONO_ALLOWED.has(file)) {
      report(file, i + 1, "Fragment Mono outside the label voice", text);
    }
  });
}

if (found) {
  console.error(`\n${found} found. No brackets, middle dots or arrows, and one face for running text: see DESIGN.md.`);
  process.exit(1);
}
console.log(`check-tics: ${files.length} files, nothing found`);
