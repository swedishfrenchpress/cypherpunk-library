# The Cypherpunk Library

> A cypherpunk's library — a personal collection of good public-domain reads.

A shelf of bound books. The landing is a row of upright spines with one book
turned cover-forward; turn to another (arrow keys, a click, a sideways scroll or
a drag) and the old one closes, the new one swings open, its title sets large
above it, and the whole page changes into that book's cloth and foil. Every text
has its own binding: a cloth, a foil, a spine set in its own manner, and a
stamped device drawn from its subject.

Everything in the collection is public domain — nothing to take down. For
everything else, there's [Anna's Archive](https://annas-archive.gl/),
[LibGen](https://shadowlibraries.github.io/DirectDownloads/libgen/), and the torrents.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Plain CSS Modules (no UI framework)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding books

The collection is a data array in [`lib/books.ts`](lib/books.ts). A new entry
looks like:

```ts
{
  slug, title, author,   // identity; slug → /book/[slug]
  color, h,              // used only by the default binding (see below)
  description, year,     // shown on the book page
  // …plus ONE reading mode, in priority order:
  pdf,                   // a PDF under /public/books (reads inline / opens in a tab), or
  external,              // a URL to the full work elsewhere (a link-out), or
  source,                // the URL a reproduced text came from (its prose lives in content/texts, keyed by slug)
}
```

That is enough: a book with no binding of its own gets a sober default one cut
from its `color`. To give it its own, add an entry under its slug in
[`lib/designs.ts`](lib/designs.ts):

```ts
"my-slug": {
  cloth, foil,           // the cover material and the stamp colour
  bg, fg,                // what the whole page wears when this book is in hand
  h, t,                  // height and spine thickness, in book-ems (a full-height book is 31.25)
  spine,                 // how the spine is lettered: roman | italic | caps | mono | monoLower
  cover,                 // where the title sits on the front: tl | center | foot
  weave,                 // linen | buckram | paper
  device,                // the stamped drawing: an id from components/Device.tsx
  deviceNote, materials, // one line each, shown in the book page's Binding ledger
}
```

Keep `fg` on `bg` at 7:1 or better, and `foil` on `cloth` at 4.5:1 or better:
`fg` is body text on that page. A new device is one function in
[`components/Device.tsx`](components/Device.tsx): a line drawing in a 200 × 240
box, one stroke weight, computed from fixed seeds.

## The look

Two colours per screen, never more: a ground and an ink, taken from the book in
hand. Rules, secondary text and washes are that ink at a lower strength. The
tokens and the three lights (the book's own colours, day, night) are at the top
of [`app/globals.css`](app/globals.css); what the page is wearing is managed by
[`lib/surface.ts`](lib/surface.ts).

Three typefaces: [Junicode](https://github.com/psb1558/Junicode-font) for titles
(condensed) and reading (regular width), Fragment Mono for all chrome, and
Alpha-Lyrae for the wordmark only. Junicode and Alpha-Lyrae are self-hosted from
`app/fonts` under the SIL Open Font License.

## Tuning the shelf

The shelf's proportions are CSS variables on `.stage` in
[`components/shelf.module.css`](components/shelf.module.css):

| Variable       | Controls                                                    |
| -------------- | ----------------------------------------------------------- |
| `--bh`         | height of a full-height book (everything scales from it)    |
| `--persp`      | the lens: longer shows less of each board edge-on           |
| `--pull`       | how far the open book stands off the row                    |
| `--gap`, `--m` | space between spines, and either side of the open cover     |
| `--edge`       | how close the row's ends may come to the page edge          |
| `--turn-time`  | how long a book takes to turn                               |
| `--shade`      | strength of the shadows on the wall                         |

How a book is built (spine, boards, page block, cloth weave, lettering styles)
is in [`components/book.module.css`](components/book.module.css).
