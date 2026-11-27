---
name: The Cypherpunk Library
description: A shelf of 21 individually bound public-domain texts; the page wears the cloth and foil of the book in hand.
colors:
  house-oxblood: "#4a141c"
  house-gold: "#f1d6a4"
  rule: "color-mix(in srgb, var(--fg) 45%, transparent)"
  muted: "color-mix(in srgb, var(--fg) 78%, transparent)"
typography:
  headline:
    fontFamily: "'Swarsh Daisy', Junicode, Georgia, serif"
    fontSize: "clamp(40px, 4.6vw, 64px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "0em"
  title:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(30px, 3.5vw, 50px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.022em"
    fontVariation: "'wdth' 84"
  subhead:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(21px, 1.9vw, 26px)"
    fontWeight: 400
    lineHeight: 1.2
  reading:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(19px, 1.5vw, 21.5px)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'onum' 1"
  body:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'onum' 1"
  note:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'onum' 1"
  label:
    fontFamily: "'Fragment Mono', ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: "15px"
    letterSpacing: "0.02em"
    fontFeature: "'lnum' 1, 'tnum' 1"
  wordmark:
    fontFamily: "'Alpha Lyrae', system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "'calt' 0"
  index-title:
    fontFamily: "'Swarsh Daisy', Junicode, Georgia, serif"
    fontSize: "clamp(21px, 1.9vw, 26px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0em"
  marquee:
    fontFamily: "'Swarsh Daisy', Junicode, Georgia, serif"
    fontSize: "clamp(38px, 3.96cqw, 64px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "0em"
rounded:
  none: "0"
  book-spine: "0.1em"
  book-board: "0.16em"
spacing:
  pad: "max(16px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))"
  target-pad: "12px"
  column-gutter: "clamp(24px, 4vw, 72px)"
  section-gap: "clamp(40px, 6vw, 88px)"
  colophon-gap: "clamp(72px, 10vw, 152px)"
components:
  label:
    textColor: "{colors.house-gold}"
    typography: "{typography.label}"
  label-link:
    textColor: "{colors.house-gold}"
    typography: "{typography.label}"
    padding: "12px 0"
  option:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "9px 0 5px"
  option-selected:
    textColor: "{colors.house-gold}"
    typography: "{typography.label}"
    padding: "9px 0 5px"
  search-input:
    backgroundColor: "transparent"
    textColor: "{colors.house-gold}"
    typography: "{typography.reading}"
    rounded: "{rounded.none}"
    padding: "2px 0 9px"
  list-line:
    textColor: "{colors.house-gold}"
    padding: "11px 8px 12px"
  list-line-hover:
    backgroundColor: "{colors.house-gold}"
    textColor: "{colors.house-oxblood}"
  text-link:
    textColor: "{colors.house-gold}"
    typography: "{typography.reading}"
  footer-line:
    textColor: "{colors.muted}"
    typography: "{typography.note}"
    padding: "clamp(40px, 6vw, 88px) {spacing.pad} calc(28px + env(safe-area-inset-bottom, 0px))"
---

# Design System: The Cypherpunk Library

## Overview

**Creative North Star: "The Book in Hand"**

The library is a shelf of 21 individually bound objects, and the page wears whichever one you are holding. Each text has its own cloth, its own foil, its own spine lettering and a device stamped on its front board; turning to a book repaints the whole surface in that book's ground and ink in 300ms. Nothing is a template recoloured 21 times, and nothing on the interface competes with the books.

The interface itself is flat, square, two-coloured and quiet. Running text is one book face with space around it and nothing else: no rules, no labels, no marks. The few controls are plain mono capitals. Depth, texture, shadow and rounded corners exist only on the books, which are real 3D objects built in CSS with real text lettering and SVG line devices (no image files, no WebGL). A film of grain lies over everything so cloth and page share one material.

There is one light, the book in hand: the page always wears that book's pair, and there is no light or dark mode beside it. The system rejects the neon-terminal cypherpunk reflex, storefront clutter, SaaS feature cards and database chrome.

**Key Characteristics:**
- Two interface colours per screen: one ground, one ink. Everything else on the interface is that ink at a lower strength.
- Every book is its own binding (cloth, foil, page pair, spine style, cover layout, weave, device, fit).
- Four faces, one job each: Swarsh Daisy for titles, Junicode for everything that is read and for the lettering on books, Fragment Mono for the banner and controls, Alpha Lyrae for the wordmark.
- Running text is Junicode alone, its parts separated by space and position, never by rules or labels.
- Controls are words and links are underlined. No square brackets, no middle dots, no arrows, no icons.
- Shadows, texture and radius belong to books, never to interface.
- Motion answers the hand: transform and opacity only, short from the keyboard, and under reduced motion movement goes while colour stays.

## Colors

One ground and one ink, supplied by the book in hand; the palette is the bindings.

### Primary
- **House Oxblood** (`house-oxblood`): the ground worn before any book is picked up, and the registered initial value of `--bg`. It is the first book's page ground (A Cypherpunk’s Manifesto).
- **House Gold** (`house-gold`): the ink of that same pair and the initial value of `--fg`.

The house pair is only the default. `--bg` and `--fg` always resolve to `--book-bg` and `--book-fg`, written on `<html>` by the shelf or the route (`lib/surface.ts`) and set before first paint together with the browser's theme colour, so a reload never flashes the wrong cloth. The book in hand is remembered per tab.

### Neutral
- **Rule** (`rule`, ink at 45%): the line under the index's search field at rest, the ledge a cover stands on in the index, a section break inside a text, the scrollbar thumb.
- **Muted** (`muted`, ink at 78%): secondary text only (the footer line, source and fallback notes, authors and years in index metadata, unselected options, the other language, placeholders, list markers).

### The bindings

Each book carries four colours, authored in `lib/designs.ts` (normative; this table mirrors it). `cloth` and `foil` dress the object; `bg` and `fg` dress the page when that book is in hand. The page ground is usually the cloth taken darker (or, for pale papers, close to it), so the book still stands off the page it tints. A binding is data for drawing the object; it carries no prose about itself.

| Book | weave | cloth | foil | page bg | page fg |
|---|---|---|---|---|---|
| A Cypherpunk’s Manifesto | linen | `#7b2530` | `#e9cf96` | `#4a141c` | `#f1d6a4` |
| The Crypto Anarchist Manifesto | buckram | `#19191c` | `#ea5a40` | `#101012` | `#ff8566` |
| A Declaration of the Independence of Cyberspace | paper | `#e6dcc0` | `#2a2118` | `#e2d7b8` | `#241c13` |
| Your Secret Right to Cash | linen | `#3d5b4a` | `#dfe9dc` | `#22382c` | `#d6e8d2` |
| The Praxeology of Privacy | buckram | `#2c323c` | `#dd8f5c` | `#191e26` | `#e69c69` |
| Of Cypherpunks and Sousveillance | paper | `#38a3bb` | `#0b1a1f` | `#a3d9e6` | `#10242b` |
| Protecting Privacy with Electronic Cash | linen | `#5b3b29` | `#e6c78e` | `#38231a` | `#ebcf9b` |
| Why I Wrote PGP | linen | `#c99b2f` | `#1c1810` | `#e3b94f` | `#1e190e` |
| Definition of Democratic Civilization | linen | `#40264f` | `#eaa9bc` | `#281634` | `#efb3c5` |
| The Conscience of a Hacker | buckram | `#101b33` | `#f0a63c` | `#0a1224` | `#f3b04e` |
| The Cyphernomicon | buckram | `#1f3a2c` | `#dcc27a` | `#12241b` | `#dfc680` |
| Meditations on Cypherpunk Nightmares | paper | `#b8b3a6` | `#23211d` | `#c6c1b3` | `#22201c` |
| The Beauty of eCash | linen | `#1f2f8a` | `#f0c868` | `#172268` | `#f2cd74` |
| 21 Lessons | paper | `#ef8a1d` | `#17110a` | `#f8b05c` | `#1d1408` |
| A Lodging of Wayfaring Men | linen | `#2a2560` | `#d0d4e8` | `#1b1840` | `#d6d9ee` |
| Fog of CryptoWar | linen | `#56636b` | `#eef2f1` | `#37424a` | `#e6edec` |
| Libertaria in Cyberspace | linen | `#0f4d38` | `#c9eedb` | `#093324` | `#bfe8d2` |
| Measuring Freenet in the Wild | paper | `#ccd6e6` | `#1b2f80` | `#d3dcec` | `#19296f` |
| Ideal Money and Asymptotically Ideal Money | linen | `#b29a6b` | `#2b2010` | `#4b4233` | `#eedcae` |
| Farewell to Westphalia | buckram | `#27506e` | `#f1e3c0` | `#17344a` | `#f0dfb8` |
| Against Intellectual Property | linen | `#f0ece2` | `#c2341d` | `#ece7da` | `#8a1f0f` |

A book with no entry gets a sober fallback: its catalogue colour as cloth, cream foil (`#eadfc4`), the cloth taken 40% toward black as page ground, a plain double rule as device.

### Material and exception colours

These are deliberate and sit outside the two-colour pair. They belong to an object or a foreign document, never to chrome, and none of them is a palette colour to reach for.

- **The page block** (`#ece5d2` and `#cfc6ae`, alternating 1px): the edges of the leaves, seen only when a book is turned. Paper is paper whatever the cloth.
- **White backing** (`#fff`): behind the Lightning QR code so it scans on any cloth.
- **Light on cloth** (white at 5 to 8%: `rgba(255, 255, 255, 0.05)`, `0.06`, `0.07`, `0.08`): the warp of the weave, the highlight down the round of the spine, the raking light across a board.
- **Shade on cloth** (black at 7 to 30%: `rgba(0, 0, 0, 0.07)`, `0.12`, `0.13`, `0.2`, `0.26`, `0.3`, and a `#000` veil at up to 36%, 46% on the back board): the weft, the joints, the groove, boards seen edge-on.
- **Cast shadow** (black at 26 to 36%): see Elevation & Depth.
- **Grain** (black flecks at 24% alpha, white flecks at 13%, the layer at 50% opacity): the film over everything.
- **The fallback foil** (`#eadfc4`): the cream ink of a book that has no binding of its own yet.

### Named Rules

**There is one light: the book in hand.** The page always wears the book's cloth and foil; there is no day, night, light or dark mode and no switch for one.
Why: "let's just keep book so it changes color depending on the book".
<!-- 2026-11-26: "let's get rid of light/dark mode. let's just keep "book" so it changes color depending on the book" -->

**The Two Colours Rule.** An interface surface is one ground and one ink. Rules and secondary text are that same ink at 45% and 78%. There are no greys, no accent, no third hue anywhere on the interface, the wordmark included. Books are objects standing on the surface and bring their own cloth and foil; they are the only other colour a screen carries.

**The Contrast Floor Rule.** Every book's pair: ink on ground at least 7:1, the muted strength at least 4.5:1, foil on cloth at least 4.5:1. Measured across the 21 bindings, the shipped minimums are 7.28:1, 4.78:1 and 4.68:1. A new binding is not finished until it clears all three.

**The Swap Rule.** Emphasis is made by swapping the two colours, never by adding one: the index line under the pointer and text selection take ink as ground and ground as ink. A swap is a response to the reader, never a standing band of the page.

**The Muted Is For Secondary Rule.** The 78% strength is for secondary text: a line the page would still make sense without. Nothing a reader must not miss is set in it, and it is never lowered further.

## Typography

**Display Font:** Swarsh Daisy (MarvaDesign; self-hosted, regular and italic, one weight, 400, no width axis; set through `--display`, which falls back to Junicode, then Georgia)
**Body Font:** Junicode (self-hosted variable, weight 400 to 600, width 75 to 100, roman and italic; fallback Georgia, Times New Roman, serif)
**Label/Mono Font:** Fragment Mono 400 (fallback ui-monospace, SF Mono, Menlo)
**Wordmark Font:** Alpha Lyrae Medium, self-hosted, with its contextual alternates switched off

**Character:** A title face with one weight and an italic names things: the books on the shelf, the page you are on, the entries of the index. A seventeenth-century book face cut from the Fell types sets everything that is read and everything lettered on a book. Small mono capitals, set plain, are kept to the banner and the controls, so the voices never blur.

Swarsh Daisy draws the curly apostrophe and quotation marks as slanted ticks that read as accents, so its `unicode-range` leaves out U+2018, U+2019, U+201C and U+201D; those four characters fall through to Junicode behind it. Keep the fallback order in `--display` for that reason.

### Hierarchy

Every font size on the interface is one of six steps, declared once as custom properties (`--t-*`) and used by name. Width, weight and italic vary within a step; the size does not.

- **Headline** (`--t-headline`, `clamp(40px, 4.6vw, 64px)`; Swarsh Daisy 400, 1.04, no tracking): a page's name, one role with one setting. The title of a book on its own page (max 11em), the index's heading, The collection, and the missing page's heading all take it. One per page.
- **Title** (`--t-title`, `clamp(30px, 3.5vw, 50px)`): the landing's statement, one sentence to a line (Junicode 400 at 84% width, 1.08, -0.022em), and the index's empty state (Swarsh Daisy italic, 1.1, no tracking).
- **Subhead** (`--t-subhead`, `clamp(21px, 1.9vw, 26px)`): the byline under a book's title (Junicode italic, 1.2), and titles in the index list (Swarsh Daisy 400, 1.08, no tracking).
- **Reading** (`--t-reading`, `clamp(19px, 1.5vw, 21.5px)`; Junicode 400): everything that is read at length or beside it. The text of a book (1.6, max-width 29em, about 72 characters a line, hanging punctuation, paragraphs wrapped so none ends on one word alone); a book's blurb and the ways to read it (1.5), so a blurb is never smaller than the text under it; what is written in the index's search field (1.3, placeholder italic and muted); the landing's footnote and its link into the collection (1.45, max 30em, lines balanced); the missing page's body. Headings inside a text are relative to it: h2 1.5em at 500 and width 84%; h3 1.16em italic 400; h4 0.82em in small caps tracked 0.08em. Code inside a text is Fragment Mono at 0.74em.
- **Body** (`--t-body`, 18px; 400, 1.5, oldstyle numerals): default text, and the author in the index list (italic).
- **Note** (`--t-note`, 16px; 1.5): the footer line, the source credit and the Lightning address (roman, the first two muted).

Outside the ramp, and fixed:

- **Label** (Fragment Mono 400, 11px on a 15px line, tracking 0.02em, uppercase, lining tabular numerals): the banner's links and, where a page passes one, its line under the wordmark; the language switch, the shelf's three controls, the index's options, count, numbers and metadata, the missing page's way back.
- **Wordmark** (Alpha Lyrae 500, 22px, line-height 1, `"calt" 0`, never wrapped): the wordmark and nothing else. One line, Cypherpunk Library, everywhere: in the banner and on a share image.
- **Card title** (21px, the subhead's small end held fixed; Swarsh Daisy 400, 1.1, no tracking): a book's name under its cover in the index, where the column is too narrow to scale. Its metadata line (author, year) is balanced across its lines.
- **Marquee** (`clamp(38px, 3.96cqw, 64px)`, sized from the shelf's own width; `min(30px, 8.2cqw)` on a phone; Swarsh Daisy 400, 1.12, no tracking): the shelf's titles and nothing beside them, the one in hand roman, its neighbours italic at 74% opacity. A book's year is not printed here; it is spoken in each book link's name and in the live region.
- **On a book** every size is in book-ems and scales with the object, and all lettering (spines and covers) is Junicode or, in the two mono manners, Fragment Mono. Swarsh Daisy is never stamped on a book.

### Named Rules

**Start with the thing and its name, and add nothing else.** On any surface (a page's banner, a section, a share image, anything new): no rule under or over a name, no tagline, no count and no side label, unless the reader needs it to act. A way back (`BACK TO THE SHELF`), a control (`LIGHT: BOOK`) and a link earn their place; a line that only decorates, or a phrase that describes the site, does not. This holds for the site's own banner, which has no rule and no tagline.
Why: "less is more. let's keep it minimal".
<!-- 2026-11-26: the same correction on two surfaces. The footer: "no need to the lines. no need for the different fonts". The share image: "no underline, and none of that text on the right". Asked whether the banner's rule and tagline should go too: "let's remove that too. less is more. let's keep it minimal". Then, of the year set in parentheses beside each title on the shelf: "can we also remove the year in the parenthesis next to the titles?". Then, asked about the dotted divider before Read it and the dotted lines between rows of the index list: "yeah let's remove them" -->

**Running text is set in Junicode only, with no rules and no mono labels.** A section of running text (the landing's colophon, the footer, a book's title page, the reading) uses one family, Junicode, with italic only where convention expects it, such as a byline. Never a rule or dotted line between its parts; never a Fragment Mono label beside or above it. Parts are separated by space and position. Fragment Mono stays in the banner, the shelf's controls, and the index's controls and metadata.
Why: lines and mixed fonts in the closing section read as "AI slop"; it should be "elegant and minimal".
<!-- 2026-11-26: "this footer look like AI slop. we need to make this look more elegant and minimal. no need to the lines. no need for the different fonts" -->

**The wordmark is static.** The one-line Alpha Lyrae "Cypherpunk Library" mark never animates: no glitch burst, no hover effect, no alternate glyph sets.
Why: none given.
<!-- 2026-11-26: "let's remove the glitch then", reversing the same day's earlier choice to keep it -->

**The One Ramp Rule.** A new piece of interface text takes one of the six steps by name. Two steps that sit within a pixel or two of each other are one step: a blurb set a shade smaller than the text beneath it reads as a mistake. Every page's name is the headline step. No literal font size is written outside the ramp's declaration; the only fixed sizes are the 11px label, the 22px wordmark and the 21px card title.

**The Four Faces Rule.** Four faces, one job each. Swarsh Daisy names things: the shelf's titles, each page's heading, the titles in the index. Junicode sets everything that is read (texts, blurbs, the colophon and its statement, bylines, headings inside a text) and all lettering on the books. Fragment Mono says how to operate the place. Alpha Lyrae signs it and never leaves the wordmark. Never add another family, and never give a face a second job.

**The Width Is The Weight Rule.** Within Junicode, hierarchy comes from the width axis and size, not from boldness: 75 to 88% on a book's spine and cover, 84% for the colophon's statement and for headings inside a text, 100% for reading. Weight stays between 400 and 500. Titles are outside this rule: Swarsh Daisy has no width axis and one weight, 400, and its hierarchy is size alone.

**The No Tracking Rule.** Swarsh Daisy is never tracked. Any letter-spacing other than zero makes a browser turn off optional ligatures, and the face's ff, fi and fl ligatures are lost, so a title sets its letters loose. Junicode's tracking is unaffected.

**The One Line Rule.** A field has exactly one line, and its states are that line changing, never a second line or a box added beside it. A page's name is the headline step on the left edge, and a row of controls sits on one baseline.

**The Never Dim Rule.** A label is never dimmed. Under the pointer a label that is a link or a button takes a 1px underline in its own ink, 4px below the letters; a disabled button takes none. Type at 11px has no contrast to spare, so no hover or emphasis lowers the opacity of a live label. Only a disabled control is faded (the shelf's Previous and Next at either end of the row).

**The Ink And Underline Rule.** State and action show with two means only, strength of ink and a 1px underline. An option that is off is muted; one that is on is full ink and underlined. A label that is the one way forward on its screen (the shelf's primary action, Clear, the missing page's way back) is underlined at rest. Every other label that is a link or button gains its underline only under the pointer. In running text a link to read or browse is roman and underlined at rest, and the underline thickens to 2px under the pointer.

## Layout

One page margin everywhere, `--pad`: 16px, growing to the left or right safe-area inset when that is larger, so it clears the notch of a phone held sideways. The page paints edge to edge (`viewport-fit=cover`), full-bleed inside the margin, with no max-width container. The footer adds the bottom safe-area inset to its bottom padding, and the shelf's strip, where it sits at the foot of the first screen (721px and wider), keeps at least that inset beneath it. Zoom is never disabled. Sections follow one another on the same ground and are separated by space, never by a line or a change of colour.

- **The banner.** The wordmark at left and the label links at right (`COLLECTION`, `EN FR`), on one baseline, and nothing else. The wordmark is one line and never wraps; on the narrowest phones the links drop under it. No rule under it and no tagline. A line under the wordmark appears only when a page passes one: the way back on a book page and on the index (`BACK TO THE SHELF`), the missing page's `ERROR 404`. The landing shows nothing there.
- **The landing** is one screen of shelf (banner, marquee, stage, strip, filling `100svh`), then the colophon on the same ground, centred on the page's middle axis with `clamp(72px, 10vw, 152px)` of space above: the statement, the footnote with its links in a 30em measure, the way into the collection. The footer's line is centred under it. On a phone the first screen takes only the room it needs and the colophon follows directly.
- **The book page** is two columns, 52fr and 48fr with a `clamp(24px, 4vw, 72px)` gutter. The object stands sticky in the first; beside it the second is set as a title page stacked from the top: title and byline, then one section gap (`clamp(40px, 6vw, 88px)`), then the blurb and the ways to read. It is not stretched to the book's height; pinning the blurb to the book's foot left a hole under a short title. Where the text is read here, it starts in the same second column, on the same left edge as the title. A PDF book's page ends with its title page: it offers Open the PDF, Download the PDF and, where there is one, Download the EPUB, and nothing below. One column at 900px, book first.
- **The index** is its name alone at the headline step on the page's left edge, with no paragraph under it; then one row of controls on a single baseline with no rule under it (the search field, the format options All, Text and PDF, the view options Covers and List); then either covers on ledges (`repeat(auto-fill, minmax(min(168px, 42%), 1fr))`) or the list (number, title, author, format, year). No count is printed; it is spoken through a visually hidden live region. At 720px and below the search takes its own row and the two sets of options share the next, the format set at the left and the view set pushed to the right.
- **The footer** is one line at the foot of every page with `clamp(40px, 6vw, 88px)` above it and no rule. It stands on the page's left edge, except under a centred closing section (the landing), where it is centred too.
- **Rhythm.** Space between sections is fluid, `clamp(40px, 6vw, 88px)` to `clamp(72px, 10vw, 152px)`. Inside the banner and controls it is tight and fixed (8 to 14px).
- **Targets.** Labels keep 11px letters but answer across a full-size band: about 39px in the banner (12px block padding cancelled by a -12px margin) and 45px on the shelf's Previous, Next and Read it (15px block padding). Links and buttons take `touch-action: manipulation`, so a tap fires at once. Buttons are not selectable and raise no long-press sheet; nor do the shelf's book links, because a book is a thing to drag. Read it stays an ordinary link.
- **Breakpoints.** One phone breakpoint, 720px, shared by the shelf, the landing and the index; 900px for the book page.

### The book-em

All book geometry is in em. A full-height book is 31.25em tall, a cover is 0.66 of its height wide, and whatever holds a book sets the em through `font-size`: the shelf uses `--bh / 31.25` where `--bh` is `max(280px, min(60svh, 106cqw, 760px))`; the book page uses `min(2.02svh, 1.5vw)`; an index card uses `100cqw / 23`. One object therefore scales from the shelf to the index without a second drawing.

### Named Rules

**Never print a caption that repeats what the screen already shows.** The shelf's strip carries controls only; the book in hand is named by the title above it and by its cover.
Why: none given.
<!-- 2026-11-26: "i don't think we need this too" (the number, title and author line at the shelf's bottom left) -->

**A PDF is opened in its own tab or downloaded, never embedded in a page.** A PDF book's page offers Open the PDF, Download the PDF and, where there is one, Download the EPUB, and ends there. No frame, no inline reader, no disclosure.
Why: "it makes our site look janky".
<!-- 2026-11-26: "we should have open the pdf or download the pdf. we don't need to embed the PDF live into our site. it makes our site look janky." -->

**The Same Edge Rule.** On a page of running text everything starts on one left edge. On a book's page the title, the blurb, the ways to read and the first line of the text share the second column's edge; on the index the page's name, the controls and the books share the page margin. The landing's closing section is the one centred exception: the open cover above it is centred with its title over it, and the colophon carries that axis to the foot of the page, the way a book's title page or closing colophon is set. The footer's line follows it there and nowhere else.

## Elevation & Depth

The interface is flat: no shadows, no layered surfaces, no tonal elevation. Depth belongs to books alone, and is real geometry (CSS 3D with a long lens, `perspective: max(4400px, 430cqw)`) plus the shadow a book throws.

### Shadow Vocabulary
- **Wall shadow** (a slot-sized block of `rgb(0 0 0 / 0.3)` blurred 0.75em, offset 2em right and 3.5em down behind the row; 4.2em and 5.4em for the open book, which stands nearer the light): every book on the shelf.
- **Standing shadow** (`drop-shadow(1.7em 2.3em 1.5em rgba(0,0,0,0.36))`): the book on its own page.
- **Ledge shadow** (`drop-shadow(0.5em 0.2em 0.5em rgba(0,0,0,0.26))`, fixed; it does not change when the cover lifts): covers in the index.
- **Self-shading on the object**: the round of the spine (dark toward both joints, a soft light down the middle), the joint groove and a low raking light on the front board, and a black veil on boards seen edge-on that clears as the book turns (`opacity: (1 - k) * 0.36`).

The shadows are the same on every book's ground: black, at the strengths above.

### Named Rules

**The Shadows Belong To Books Rule.** A shadow means a physical book is casting it. No interface element (control, list line, field) has one. Focus on the search field is its own one line drawn over in ink, not a glow and not a box.

## Shapes

Interface is square: radius 0 on every control and field, and no filled containers other than the swap of the two colours on an index line under the pointer.

Lines are few, solid, 1px, and each has a job. They remain in three places only: the line under the index's search field (45% at rest, full ink in use); the ledge under a cover in the index, and a short section break inside a text (45%). Nothing on the site is dotted, and nothing is framed. Everything else is separated by space alone: the banner, the shelf's strip, the index's row of controls, the rows of the index list, the landing's colophon, the footer, a book's title page and the reading.

Books carry the only curves: 0.1em on the spine, 0.16em on the fore-edge corners of a board. Their surfaces carry the only texture: a weave of 1px hairlines in real pixels (linen at a 3px pitch, buckram coarser at 4px, paper-over-boards none; flat index covers carry none, since a weave that small would alias).

The interface carries no icons or drawn marks of any kind. The only drawing is on books. Stamped devices are `currentColor` line drawings in a 200 by 240 box at a 1.3 round-capped stroke with no fills beyond a dot, computed from fixed seeds so the same drawing comes out on every render; the library's imprint is stamped at the foot of each spine.

A film of grain covers the whole viewport, books included (two fractal-noise layers, dark flecks and light flecks at different scales, 50% opacity, non-interactive), so it reads on any cloth.

## Components

### The label (control voice)
Small mono capitals, set plain, with no surface. As a link or button it carries a transparent 1px underline, 4px below the letters, that takes the ink's colour under the pointer (180ms); it is never dimmed, and a disabled button does not respond. It has no background, border or radius. Keyboard focus is a 1px full-ink outline offset 3px, the same on every focusable thing. Items in one label line are joined by a comma (`ERIC HUGHES, 1993`) or space; in the index a book with a French edition carries the word `FR`, and one that reads on another site the word `EXTERNAL`, set off by space after its metadata.

### Options (ink and underline as state)
- **Style:** a row of labels with 20px between them. Counts ride inside the label (`PDF 9`).
- **State:** off is muted text; on (`aria-pressed="true"`) is full ink with a 1px underline. Nothing shifts between the two.
- Used for the format filter and the Covers and List view switch. The language switch is the two-slot variant: `EN FR` with a 12px gap and no separator, the current locale inked, the other a muted link. The format filter is All, Text and PDF; a book read on another site is not a filter option, only a word after its metadata. Clear search and filter, the one action of the index's empty state, is inked and underlined at rest.

### Search field
- **Style:** a line to write on. What is written is text, so it is Junicode at the reading step; the placeholder is italic and muted. No box, no background, radius 0.
- **One line, never two:** a 1px hairline at the rule strength at rest. When the field is in use (the caret is in it, or it holds a query) the same line is drawn over in full ink from the left, where the writing starts: a `clip-path` wipe over 240ms on `--ease-out`, leaving in 160ms. Under reduced motion the ink fades in over 160ms without travelling.
- **Focus:** the line is the focus mark. Focus never adds a second line, and there is no outline box; the caret is the ink.
- **On a phone:** it asks for a Search return key and leaves names alone (no capitalising, no correcting); at 19px and up the page does not zoom into it.

### Text links
Every link in running text is the ink, roman, with a 1px underline set 0.2em below at rest; under the pointer the underline thickens to 2px and nothing else changes. This covers the ways to read a book (Open the PDF, Download the PDF, Download the EPUB, Read it below, Read at another site), set side by side at the reading step with 1.6em between them; Browse the collection on the landing; and links inside the footnote, notes and the text. Nothing follows the words. The footer's address is the quiet exception: its underline appears only under the pointer.

### The colophon
The landing's close, on the page's own ground and on its middle axis: the statement at the title step with each sentence on its own line, then the footnote in a 30em measure with its lines evened out, then the link into the collection, both at the reading step. One face, two sizes, centred. The section marks itself as a centred close, and the footer's line centres under it.

### The title page
A book's page beside its standing object: the title in Swarsh Daisy at the headline step with an italic Junicode byline (by Author, year) at the head of the column; one section gap, then the blurb and the ways to read; for a living author, a white-backed Lightning QR code with the address beside it at the note step. Nothing else.

### Index line
One book a line: number (label, muted), title (Swarsh Daisy), author (Junicode italic), format and year (labels, muted). Rows are separated by their own padding, with no line between them. Under a real pointer (`(hover: hover) and (pointer: fine)`) the whole line takes the two colours swapped and its muted cells go to full strength (160ms `ease`). On a phone it folds to two rows.

### Cover on a ledge
A flat front board standing on a 1px rule at 45%, its title beneath in Swarsh Daisy at 21px and a muted label for author and year. No card surface. Under a real pointer the cover lifts 0.5em and grows 2.2% in 160ms, by transform alone; its shadow does not animate.

### Navigation
The banner (see Layout) is the wordmark and its links, with nothing under the name. The wordmark is a static one-line link home, on one baseline with the links; on the narrowest phones the links drop under the name and the name is never broken. A back link is words only (`BACK TO THE SHELF`), set under the wordmark by the pages that have somewhere to go back to; on the missing page a second one is underlined at rest as the one way on. The footer is one line, the librarian's address, in Junicode at the note step and the muted strength, the same words on every page and in both languages; on the left edge everywhere except the landing, where it is centred under the colophon. Page titles join with a vertical bar (`Title | The Cypherpunk Library`).

### The book (signature)
A bound hardback in CSS 3D: spine toward the viewer, front board hinged off its right edge, back board, and a page block seen only when turned. One number, `--k`, turns it: 0 is spine-on, 1 is cover-forward, hinged on the spine's near-left edge so an open book sits in its own slot. All lettering is real text, typeset at the data source with real apostrophes and single quotes (titles, authors and blurbs alike), so every surface sets the same characters. Spine lettering runs top to bottom with every letter lying on its side, punctuation included (`text-orientation: sideways`), so an apostrophe stays with its word.
- **Spine lettering, five manners:** roman (condensed 500), italic (width 84%, author in tracked small caps), caps (tracked 0.15em), mono (uppercase Fragment Mono), monoLower. The cover takes the same manner as its spine.
- **Cover layouts, three:** title top-left with author at the foot; centred; title at the foot with author at right and the device raised.
- **Device fits, three:** boxed in the middle (11.8em wide), bleed (board edge to board edge), edge (oversized, running off the fore-edge).
- The library's imprint, the open C of the wordmark, is stamped at the foot of every spine.
- On its own page the book stands at three-quarters (`--k: 0.64`) and is static: it does not turn under the pointer.

### The shelf (signature)
A butted row of upright spines with one book turned cover-forward, a marquee of titles above it and a strip below that carries three controls and nothing else, right-aligned: `PREVIOUS`, `NEXT`, and standing a little apart by space alone the primary action, `READ IT`, the only label on the screen underlined at rest. The book in hand is named by the marquee and by its cover, by title alone; its title, author and year are spoken through a visually hidden live region and in each book link's name.
- **Turning** is the whole interaction: the left and right keys (Home and End for the ends), click on a spine, sideways wheel or swipe, drag, or the strip's two words (`PRÉCÉDENT`, `SUIVANT` in French), each a label with a full-size target, faded when there is nowhere further to go. The outgoing book closes, the incoming one swings open, the row re-centres under a clamp that never pulls its ends inside the page margin, the marquee re-centres the title over the cover, and the page tweens to the new pair.
- **Two clocks:** `--turn-time`, 300ms on `--ease-out`, for a book turning, its neighbours standing aside and its shadow; `--slide-time`, 500ms on `--ease-drawer`, for the row and the marquee together, so a title arrives with its book. The roman and italic faces of a title swap in 200ms, the outgoing face blurring by 2px as it fades. The page's ground and ink change in 300ms `ease` (both are registered colour properties, so everything mixed from them follows on every frame). The shelf enters once, in 500ms.
- **One number drives the row.** The row's whole geometry is a function of a place along it, counted in books: 10 is the eleventh book open, 10.5 is that one half closed and the next half open. One function, `pose(p)`, is the only writer: per slot `--k` (the turn, 0 to 1) and `--shift` (how far it stands aside), on the track `--c` and `--total`, and the title row's transform, which stands between the two books' stops. Everything a turn changes in CSS is written in terms of `--k` (the open margin, the wall shadow's offset and its `scaleX`); the marker for the book in hand sets no geometry.
- **Pace by input** (`[data-pace]`, set before each change): a click, a key or a title sets a whole-number place and CSS transitions carry the row there on the two clocks. From the pointer 300ms and 500ms; from the keyboard or a notched wheel 180ms and 200ms; while a key is held down 0ms and 0ms, so the row never falls behind the hand.
- **Transform only:** a slot never changes width. The books after the open one are shifted with `translate3d(var(--shift), 0, 0)`, and a book's wall shadow is one fixed blur squeezed with `scaleX` as `--k` falls, so the blur is not redrawn during a turn. `--c`, `--total` and `--shift` are registered with `@property` as non-inheriting lengths, so a per-frame write restyles one element.
- **A hand, phase one, track:** a finger, a mouse drag, or two fingers on a trackpad move the place directly, frame by frame, with no easing (`[data-direct]` zeroes both clocks). A drag begins only on a sideways stroke, 8px across and more across than down; a stroke that sets off up or down is left to the page. The distance from one book to the next is the width the next book's edge has to cross, so that edge moves 1:1 with the hand while the cover in front folds shut and the next unfolds; the title row travels in step. The book in hand (title face, page colours, links) changes just after the next book passes half-way (0.55). Past the first or last book the row gives less the further it is pulled, starting at a slope of 0.55 and never reaching 140px (100px past gives about 39px, 300px about 76px), carried by the drag layer. Only the books part-way through a turn are marked `[data-turning]`, and only their cover shade is promoted with `will-change`.
- **A hand, phase two, release:** one spring carries the row to a whole book: stiffness 280, critically damped, seeded with the hand's speed but capped so the row cannot pass its book, integrated in real time so a slow frame makes it coarser and never slower. It does not overshoot.
- **Where it lands:** the nearest whole book to where the row would coast (160ms of coast, worth at most six tenths of a book), so half-way is enough. A flick the way the hand has been going counts above 0.11px per ms and goes on to the next book whatever the distance, never skipping one. A flick against it, which would undo a turn the hand began, needs 0.35px per ms and returns to where the gesture started. A gesture the browser cancels, having taken the stroke to scroll the page, is let go with no flick at all, and a trackpad release never counts as a flick. For a trackpad swipe that ends slowly, a little over a fifth of a book (0.22) is enough.
- **Trackpad:** sideways two-finger scrolling is followed 1:1, system momentum included. When the momentum has faded below 0.35px per ms after having been above 0.8, the row is let go to settle instead of creeping between two books, and the rest of that swipe's tail is ignored; a pause, a turn back or a faster push counts as a new swipe. A swipe that stops with no momentum is let go after 80ms of silence. Running into the end of the shelf lets go the same way. Vertical scrolling stays the page's.
- **Interruptible everywhere:** a finger landing on a settling row catches it at once (a mouse press on it stays a click). A drag that begins during a CSS turn starts from how far that turn has come, with what is left of the slide handed to the two drag layers (one for the row, one for the titles) and spent by the spring. A key or click during a spring takes over with a CSS transition from where the spring was. A hand that has lost the row cannot move it afterwards: a mouse moving with no button down ends any drag the shelf thought it had, and so does the same pointer pressing again.
- **The whole cover is the link:** a browser does not hit-test the boards of a turned book, and the link's own box is only a spine wide, so the link carries an invisible sheet the size of the cover, standing at the cover's depth and widening with the turn by the same `scaleX` as the wall shadow. The sheet itself has no transition. Click, context menu and modified clicks all work anywhere on the open cover.
- **Hover:** a closed spine comes a little off the shelf under a real pointer, as its own `translate` on a 160ms clock, and not while the row is moving or in a hand (`[data-moving]`, `[data-direct]`). Nothing follows the mouse: the perspective is fixed.
- **Phone (720px and below):** the open cover is always centred and the marquee becomes the one title in hand, set alone and centred on up to two lines; it swaps by the roman face's own change, the same 200ms with 2px of blur used on a wide screen. One fade, not two multiplied.
- With JavaScript off the shelf is a row of plain links.

### Motion
Motion exists to answer the hand, and it is small. Three curves, declared once: `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`) for anything answering the hand; `--ease-drawer` (`cubic-bezier(0.32, 0.72, 0, 1)`) for a large thing travelling across the screen, which on this site is the shelf's row and its marquee; plain `ease` for colour and opacity. Nothing bounces.

- **Durations.** 160ms for hover lifts and press feedback; 160 to 200ms for colour and underline changes; 200ms for the title's face swap, on a phone as on a wide screen; 240ms for the search line's ink arriving and 160ms for it leaving; 300ms for a turn and for the page's colour change; 500ms for the row's slide and for the shelf's one entrance. From the keyboard a turn is 180ms and a slide 200ms; a held key is instant.
- **Press.** Every control answers a press itself, on any input, through `:active`. A label gains its underline at once (no transition in, its own 180ms out). An underlined text link thickens to 2px. Previous, Next, Read it and the index options scale to 0.97 over 160ms on `--ease-out`. An index cover on touch sets back to `scale(0.98)`; under a real pointer it keeps its hover lift and only gives back the growth (`translateY(-0.5em) scale(1)`), one change and not two. An index line on touch takes a wash of the ink at 12%. The wordmark has no pressed state: it is still. The browser's grey tap flash is switched off once, on the root, which is why each control carries its own answer.
- **Hover.** Every hover style on the site sits inside `(hover: hover) and (pointer: fine)`: the label's underline, the thicker underline on a text link, the footer link, a closed spine's lift, an index cover's lift, an index line's colour swap. On touch a tap would leave hover stuck on.
- **Still things.** The wordmark, the standing book on a book page and the perspective do not move.
- **Reduced motion.** Not a blanket switch. Tracking stays, because the hand produces it; on release the row changes at once, with no spring. Things that travel or turn on their own do so at once (both shelf clocks 0ms, no hover lift, no press scale) and the shelf's entrance becomes a 200ms fade; colour and opacity changes are kept.

**The Transform And Opacity Rule.** Never animate a layout property. Width, height, margin, padding, top and left do not transition anywhere; a thing that must appear to change size or place is moved with `transform`, and a shadow that must appear to change width is scaled, not redrawn.

**The Direct Hand Rule.** While a hand holds the row, the row is the hand: no easing, no clock, 1:1. Never drive a child's transform from a CSS variable written on a shared parent during a gesture. One function writes each frame, onto the element that moves or the slot that holds it, through registered non-inheriting properties or a transform set directly, so a write restyles one element.

**The Catch Rule.** Every movement of the row can be caught and taken over mid-flight without a jump: a hand catches a spring or a CSS turn from where it has come, and a key or click takes over from a spring the same way. Never lock input until an animation ends.

**The Settle Rule.** A released row always comes to rest on a whole book, on one critically damped spring seeded with the hand's speed and capped so it cannot pass its book. Half-way is enough to go on; a flick goes one book and never skips one, and it takes a harder flick to undo a turn than to finish it. Nothing overshoots.

**The Whole Cover Rule.** What looks like the book must be the link. Check it with a real click or `document.elementFromPoint` across the cover, never with `element.click()`, which skips hit-testing.

**The Short Keys Rule.** A change made from the keyboard is short (180ms to turn, 200ms to slide) and a held key is instant. The eye is already on the target; a long animation only makes the row lag the hand.

**The Real Pointer Rule.** Hover is for a real pointer only: every hover style, moving or not. Gate each one behind `(hover: hover) and (pointer: fine)`, because on touch a tap leaves hover stuck on after the finger has gone. Hover motion is also suppressed while the row is moving or in a hand.

**The Press Rule.** Every control answers a press itself, at once, on any input; the browser's tap flash is off. A new control is not finished until it has its own pressed state.

**The Movement Goes, Colour Stays Rule.** Under `prefers-reduced-motion: reduce` remove movement and keep colour: travel and turns happen at once, lifts and press scales are dropped, entrances become a short fade, and changes of colour, opacity and underline still ease.

## Share image

The picture a link to the site unfurls with: `app/opengraph-image.png` and `app/twitter-image.png` (one image, 1200 by 630), each with a line of alt text beside it. It is drawn on a local bench, `/og-lab?card=shelf` (untracked, development only), and captured from there.

**The site's share image is the shelf itself.** The landing's row of books with A Cypherpunk's Manifesto turned cover-forward, on the Manifesto's oxblood. Not a statement, not a single cover, not a list of titles.
Why (inferred, and accepted by the owner): it shows the library instead of describing it.
<!-- 2026-11-26: "i think the first one is the best" (of five drafts: the shelf, a cover, a stack of spines, a statement, a single book). On the reason: "idk whatever you think is probably right" -->

**On a share image the wordmark is one line, `Cypherpunk Library`.** One line there as everywhere; the name is never stacked or broken.
Why (inferred, and accepted by the owner): a share image is wide and short, so a second line costs height the books need.
<!-- 2026-11-26: "do you think we can put Cypherpunk Library in one line? no in two lines?" -->

**A share image carries the picture and the name, and nothing else.** No rule under the name, no tagline, no count, no web address, no label in a corner.
Why: "less is more. let's keep it minimal".
<!-- 2026-11-26: "just have the words Cypherpunk Library above it. no underline, and none of that text on the right" -->

## Copy

**Never use square brackets, middle dots or arrows.** On any surface, in any language: no square brackets around a label, no middle dot between items, no arrow character and no drawn arrow. This is non-negotiable. Controls are words, links are underlined, items are separated by space, a comma or a colon. Enforced by `npm run check` (scripts/check-tics.mjs), which also runs at the start of every build.
Why: "that is ai slop".
<!-- 2026-11-26: "we should not be using brackets or that little middle dot. that is ai slop"; "we should get rid of the arrow -> <- those are AI slop"; "the brackets and middle dots are non negotiable we must never do those"; "drop brackets dots and arrow everywhere!" -->

**Never write text about a book as a physical object or about how the site was made.** No cloth, foil, device or binding notes, and no "Set in…" line. Text on a page is about the work.
Why: "corny and fake".
<!-- 2026-11-26: "we don't need binding. that is corny and fake" -->

**A book page shows the title, "by Author, year", the blurb and the ways to read, then the text.** Never add a block of facts (edition, licence, format, counts) to fill a page.
Why: "too much content".
<!-- 2026-11-26: "this is also too much content" -->

**Text on a French page is in French.** Every string rendered under `/fr` has a French form, in `lib/i18n.ts` or a `locale === "fr"` branch.
Why: none given.
<!-- 2026-11-26: "I guess we should update them so they are in french"; asked how strictly: "just listen to me" -->

The same check holds Fragment Mono to an allow-list of the places named in the Typography rules, so a mono label cannot drift back into running text.

## Do's and Don'ts

### Do:
- **Do** keep every interface surface to one ground and one ink, with rules at 45% and secondary text at 78% of that ink.
- **Do** author a new binding as a full object: cloth, foil, page ground, page ink, spine manner, cover layout, weave, device, and check it against the floor (7:1 ink on ground, 4.5:1 muted, 4.5:1 foil on cloth).
- **Do** set running text in Junicode alone and separate its parts with space and position.
- **Do** set a title (a shelf title, a page's name, an index entry) in `--display`, at 400, with no letter-spacing, and give every page's name the headline step.
- **Do** start everything on a page of running text (a book's page, the index) from one left edge; only the landing's closing section and the footer line under it are centred.
- **Do** start a new surface with the thing and its name, and add only what the reader needs to act.
- **Do** set controls plain in the mono label voice: words, a comma between an author and a year (`ERIC HUGHES, 1993`), space between separate items.
- **Do** show a selected option as full ink with a 1px underline and an unselected one as muted, and underline at rest only the label that is the one way forward on its screen.
- **Do** make a link to read or browse roman, underlined at rest with a 1px line, thickening to 2px under the pointer.
- **Do** answer the pointer on text with an underline: a 1px underline appearing under a label, a 1px underline thickening to 2px under a text link.
- **Do** make emphasis by swapping the two colours in response to the reader (an index line under the pointer, a selection).
- **Do** size books in em and let the holder set the em, so the same object serves the shelf, the book page and the index.
- **Do** draw a new stamped device as a `currentColor` line drawing in the 200 by 240 box at a 1.3 stroke, with fixed seeds for anything random. Drawing belongs to books; the interface has no icons.
- **Do** move things with `transform` on `--ease-out`, slide the row on `--ease-drawer`, and change colour and opacity on plain `ease`.
- **Do** give 11px labels a full-size target with block padding.
- **Do** make keyboard-driven changes short and a held key instant.
- **Do** let a hand move the row 1:1 with no easing, and settle it on one critically damped spring that lands on a whole book.
- **Do** make every movement of the row catchable mid-flight.
- **Do** leave a stroke that sets off up or down to the page; the shelf takes only sideways ones.
- **Do** change one property for one state change; never stack two fades on the same element.
- **Do** give every control its own pressed state that answers at once on any input.
- **Do** take the page margin from `--pad` and add the bottom safe-area inset to whatever sits at the foot of the screen.
- **Do** keep colour and opacity changes under reduced motion, and make everything that travels or turns happen at once.
- **Do** run `npm run check` before shipping copy or chrome.

### Don't:
- **Don't** introduce a grey, an accent or a third hue on interface. Colour arrives with the book in hand.
- **Don't** put a shadow, a radius, a gradient or a texture on an interface element. Those belong to books.
- **Don't** build cards, pills, chips, filled buttons or boxed inputs. Controls are text; a field is text on its own one line.
- **Don't** add a second line or an outline box to a focused field, and don't run a rule under a row of controls.
- **Don't** print a count, an introductory paragraph or a filter option the reader does not need under a page's name.
- **Don't** put a rule or a band of swapped colour between parts of running text, and don't use a dotted line anywhere.
- **Don't** set a Fragment Mono label beside or above running text, as a kicker, a caption or a row heading.
- **Don't** print a caption that repeats what the screen already shows.
- **Don't** centre running text anywhere but the landing's closing section.
- **Don't** put a rule under a name, or a tagline, count or side label beside one, on the banner, a section or a share image.
- **Don't** embed a PDF, or any other site's page, in a frame.
- **Don't** add a block of facts to a book page, or any text about cloth, foil, devices, bindings or how the site was made.
- **Don't** animate the wordmark, give it a hover effect, or break it onto two lines.
- **Don't** dim text on hover. Opacity is not a hover state in this system.
- **Don't** recolour one cover template for a new text. Every book is its own binding.
- **Don't** use Alpha Lyrae for anything but the wordmark, or add a fifth typeface.
- **Don't** set running text, a byline or anything on a book in Swarsh Daisy, and don't set a title in condensed Junicode.
- **Don't** apply `font-stretch`, letter-spacing or a weight other than 400 to Swarsh Daisy.
- **Don't** add a type step within a pixel or two of an existing one.
- **Don't** reach for bold. Junicode stays between 400 and 500 and Swarsh Daisy at 400; change the size, or Junicode's width, instead.
- **Don't** use the muted strength for anything a reader must not miss.
- **Don't** add a light, dark, day or night mode, or a switch for one. The book in hand is the only light.
- **Don't** use image files or WebGL for covers; they are SVG and CSS 3D with real text.
- **Don't** use bounce, spring overshoot or elastic easing.
- **Don't** animate a layout property (width, height, margin, padding, top, left).
- **Don't** drive a child's transform from a CSS variable written on a shared parent during a gesture.
- **Don't** let a flick skip a book, a spring overshoot, or a released row rest between two books.
- **Don't** write a hover style outside `(hover: hover) and (pointer: fine)`; on touch it sticks.
- **Don't** rely on the browser's tap flash, disable zoom, or let content sit under a notch or the home indicator.
- **Don't** make anything follow the mouse, and don't animate a shadow.
- **Don't** leave an English string on a French page.
- **Don't** dress the library as a neon terminal, a storefront or a database.
