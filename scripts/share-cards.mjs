// Draws one share card per book into public/og/book/<slug>.jpg, and writes the
// list of books that have one to lib/share-cards.json (read by lib/og.ts).
//
// Each card is the og-lab "pose" card (app/og-lab): the book turned half to
// you, its title and author beside it, on the colours of its own page. The
// bench only runs in dev, so start `npm run dev` first, then run
// `npm run cards`, or pass a base URL and slugs:
//   node scripts/share-cards.mjs http://localhost:3000 why-i-wrote-pgp
// Uses the Google Chrome already on the machine; no browser download.
//
// Run it again whenever a book is added or its cover changes, and commit the
// images and the list. A book without a card falls back to the site card.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { chromium } from "playwright-core";

const [base = "http://localhost:3000", ...only] = process.argv.slice(2);
const source = await readFile(new URL("../lib/books.ts", import.meta.url), "utf8");
const all = [...source.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const slugs = only.length ? only : all;
const out = new URL("../public/og/book/", import.meta.url);
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const slug of slugs) {
  // dev keeps a socket open, so "load" never settles: wait for the fonts instead
  const res = await page.goto(`${base}/og-lab?card=one&look=pose&book=${slug}`, { waitUntil: "domcontentloaded" });
  if (!res?.ok()) throw new Error(`${slug}: ${res?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);
  await page.screenshot({ path: new URL(`${slug}.jpg`, out).pathname, type: "jpeg", quality: 88 });
  console.log(slug);
}
await browser.close();

const drawn = new Set((await readdir(out)).filter((f) => f.endsWith(".jpg")).map((f) => f.slice(0, -4)));
const list = all.filter((s) => drawn.has(s));
await writeFile(new URL("../lib/share-cards.json", import.meta.url), JSON.stringify(list, null, 2) + "\n");
