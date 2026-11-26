---
name: The Cypherpunk Library
description: A shelf of 21 individually bound public-domain texts; the page wears the cloth and foil of the book in hand.
colors:
  house-oxblood: "#4a141c"
  house-gold: "#f1d6a4"
  day-paper: "#ffffe1"
  day-ink: "#1c1b12"
  night-black: "#060504"
  night-ivory: "#f1ecd9"
  rule: "color-mix(in srgb, var(--fg) 45%, transparent)"
  dots: "color-mix(in srgb, var(--fg) 55%, transparent)"
  muted: "color-mix(in srgb, var(--fg) 78%, transparent)"
typography:
  display:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(56px, 9.6vw, 96px)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(40px, 4.6vw, 64px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 75"
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
    fontVariation: "'wdth' 84"
  reading:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(19px, 1.5vw, 21.5px)"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'onum' 1"
  lead:
    fontFamily: "Junicode, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(18px, 1.42vw, 20px)"
    fontWeight: 400
    lineHeight: 1.48
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
    lineHeight: 0.92
    letterSpacing: "-0.01em"
    fontFeature: "'calt' 1"
rounded:
  none: "0"
  book-spine: "0.1em"
  book-board: "0.16em"
spacing:
  pad: "16px"
  ledger-gutter: "24px"
  row-top: "13px"
  row-bottom: "26px"
  target-pad: "12px"
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
    rounded: "{rounded.none}"
    padding: "6px 0 4px"
  ledger-row:
    padding: "13px 0 26px"
  list-line:
    textColor: "{colors.house-gold}"
    padding: "11px 8px 12px"
  list-line-hover:
    backgroundColor: "{colors.house-gold}"
    textColor: "{colors.house-oxblood}"
  inverted-band:
    backgroundColor: "{colors.house-gold}"
    textColor: "{colors.house-oxblood}"
    padding: "clamp(56px, 9vw, 132px) 16px clamp(48px, 7vw, 104px)"
  text-action:
    textColor: "{colors.house-gold}"
    typography: "{typography.subhead}"
---

# Design System: The Cypherpunk Library

## Overview

**Creative North Star: "The Book in Hand"**

The library is a shelf of 21 individually bound objects, and the page wears whichever one you are holding. Each text has its own cloth, its own foil, its own spine lettering and a device stamped on its front board; turning to a book repaints the whole surface in that book's ground and ink over half a second. Nothing is a template recoloured 21 times, and nothing on the interface competes with the books: the chrome is hairlines, plain mono capitals and a book face.

The interface itself is flat, square and two-coloured. Depth, texture, shadow and rounded corners exist only on the books, which are real 3D objects built in CSS with real text lettering and SVG line devices (no image files, no WebGL). A film of grain lies over everything so cloth and page share one material.

Three lights are one click apart: **Book** (the page takes the book's own pair), **Day** (paper and ink) and **Night** (black, with the books lit and no wall to cast on). The system rejects the neon-terminal cypherpunk reflex, storefront clutter, SaaS feature cards and database chrome.

**Key Characteristics:**
- Two interface colours per screen: one ground, one ink. Everything else on the interface is that ink at a lower strength.
- Every book is its own binding (cloth, foil, page pair, spine style, cover layout, weave, device, fit).
- Three voices and only three: Junicode for titles and reading, Fragment Mono for chrome, Alpha Lyrae for the wordmark.
- Chrome is set plain in mono capitals; state and action show by ink and a 1px underline, never by brackets or boxes.
- Facts are set as a ledger: label in the left column, what it names on the right, dotted line between rows.
- Shadows, texture and radius belong to books, never to interface.
- Movement eases out exponentially; all of it is off under reduced motion.

## Colors

One ground and one ink, supplied by the book in hand; the palette is the bindings.

### Primary
- **House Oxblood** (`house-oxblood`): the ground worn before any book is picked up, and the registered initial value of `--bg`. It is the first book's page ground (A Cypherpunk’s Manifesto).
- **House Gold** (`house-gold`): the ink of that same pair and the initial value of `--fg`.

The house pair is only the default. In the Book light, `--bg` and `--fg` resolve to `--book-bg` and `--book-fg`, written on `<html>` by the shelf or the route (`lib/surface.ts`) and set before first paint, so a reload never flashes the wrong cloth. The book in hand is remembered per tab; the light is remembered across visits.

### Neutral
- **Day Paper** (`day-paper`) and **Day Ink** (`day-ink`): the Day light. A yellow-white paper and a warm near-black, not white and black.
- **Night Black** (`night-black`) and **Night Ivory** (`night-ivory`): the Night light. Warm black, ivory ink.
- **Rule** (`rule`, ink at 45%): solid hairlines that open a ledger, the footer rule, the ledge a cover stands on, underline on hover, scrollbar thumb.
- **Dots** (`dots`, ink at 55%): dotted lines between ledger rows, between catalogue lines, around code blocks, and the divider before the primary action in the shelf strip.
- **Muted** (`muted`, ink at 78%): secondary text only (authors and years in metadata, unselected options, placeholders, list markers, source notes).

The strengths are derived wherever a surface sets its own `--bg`/`--fg` (the body, and any `.surface`), so an inverted band re-derives them from its own pair.

### The bindings

Each book carries four colours, authored in `lib/designs.ts` (normative; this table mirrors it). `cloth` and `foil` dress the object; `bg` and `fg` dress the page when that book is in hand. The page ground is usually the cloth taken darker (or, for pale papers, close to it), so the book still stands off the page it tints.

| Book | Materials | cloth | foil | page bg | page fg |
|---|---|---|---|---|---|
| A Cypherpunk’s Manifesto | Oxblood linen, pale gold foil | `#7b2530` | `#e9cf96` | `#4a141c` | `#f1d6a4` |
| The Crypto Anarchist Manifesto | Black buckram, red pigment foil | `#19191c` | `#ea5a40` | `#101012` | `#ff8566` |
| A Declaration of the Independence of Cyberspace | Parchment paper, iron-gall ink | `#e6dcc0` | `#2a2118` | `#e2d7b8` | `#241c13` |
| Your Secret Right to Cash | Banknote green linen, silver foil | `#3d5b4a` | `#dfe9dc` | `#22382c` | `#d6e8d2` |
| The Praxeology of Privacy | Slate buckram, copper foil | `#2c323c` | `#dd8f5c` | `#191e26` | `#e69c69` |
| Of Cypherpunks and Sousveillance | Cyan paper, black ink | `#38a3bb` | `#0b1a1f` | `#a3d9e6` | `#10242b` |
| Protecting Privacy with Electronic Cash | Walnut linen, gold foil | `#5b3b29` | `#e6c78e` | `#38231a` | `#ebcf9b` |
| Why I Wrote PGP | Mustard linen, black ink | `#c99b2f` | `#1c1810` | `#e3b94f` | `#1e190e` |
| Definition of Democratic Civilization | Aubergine linen, rose foil | `#40264f` | `#eaa9bc` | `#281634` | `#efb3c5` |
| The Conscience of a Hacker | Midnight buckram, amber foil | `#101b33` | `#f0a63c` | `#0a1224` | `#f3b04e` |
| The Cyphernomicon | Forest buckram, gold foil | `#1f3a2c` | `#dcc27a` | `#12241b` | `#dfc680` |
| Meditations on Cypherpunk Nightmares | Stone paper, black ink | `#b8b3a6` | `#23211d` | `#c6c1b3` | `#22201c` |
| The Beauty of eCash | Ultramarine linen, gold foil | `#1f2f8a` | `#f0c868` | `#172268` | `#f2cd74` |
| 21 Lessons | Orange paper, black ink | `#ef8a1d` | `#17110a` | `#f8b05c` | `#1d1408` |
| A Lodging of Wayfaring Men | Indigo linen, silver foil | `#2a2560` | `#d0d4e8` | `#1b1840` | `#d6d9ee` |
| Fog of CryptoWar | Gunmetal linen, white foil | `#56636b` | `#eef2f1` | `#37424a` | `#e6edec` |
| Libertaria in Cyberspace | Emerald linen, mint foil | `#0f4d38` | `#c9eedb` | `#093324` | `#bfe8d2` |
| Measuring Freenet in the Wild | Pale blue paper, navy ink | `#ccd6e6` | `#1b2f80` | `#d3dcec` | `#19296f` |
| Ideal Money and Asymptotically Ideal Money | Tan linen, sepia ink | `#b29a6b` | `#2b2010` | `#4b4233` | `#eedcae` |
| Farewell to Westphalia | Steel blue buckram, cream foil | `#27506e` | `#f1e3c0` | `#17344a` | `#f0dfb8` |
| Against Intellectual Property | Chalk linen, vermilion ink | `#f0ece2` | `#c2341d` | `#ece7da` | `#8a1f0f` |

Each binding also carries its materials and device note in French (`fr` in `lib/designs.ts`), which the French book page sets in its Binding row.

A book with no entry gets a sober fallback: its catalogue colour as cloth, cream foil (`#eadfc4`), the cloth taken 40% toward black as page ground, a plain double rule as device.

### Material and exception colours

These are deliberate and sit outside the two-colour pair. They belong to an object or a foreign document, never to chrome, and none of them is a palette colour to reach for.

- **The page block** (`#ece5d2` and `#cfc6ae`, alternating 1px): the edges of the leaves, seen only when a book is turned. Paper is paper whatever the cloth.
- **White backing** (`#fff`): behind the Lightning QR code so it scans on any cloth, and behind the embedded PDF frame, which is someone else's page.
- **Light on cloth** (white at 5 to 8%: `rgba(255, 255, 255, 0.05)`, `0.06`, `0.07`, `0.08`): the warp of the weave, the highlight down the round of the spine, the raking light across a board.
- **Shade on cloth** (black at 7 to 30%: `rgba(0, 0, 0, 0.07)`, `0.12`, `0.13`, `0.2`, `0.26`, `0.3`, and a `#000` veil at up to 36%, 46% on the back board): the weft, the joints, the groove, boards seen edge-on.
- **Cast shadow** (black at 20 to 36%; in Day `rgb(92 78 18 / 0.22)`): see Elevation & Depth.
- **Grain** (black flecks at 24% alpha, white flecks at 13%, the layer at 50% opacity): the film over everything.
- **The wordmark's glitch ghost** (teal `rgba(20, 150, 160, 0.35)` to `0.55` and red `rgba(200, 40, 50, 0.3)` to `0.5`, as a 1 to 1.5px text-shadow): the wordmark and its burst are kept exactly as they were, by decision; this is the one place a third hue appears, and it never leaves the wordmark.
- **The fallback foil** (`#eadfc4`): the cream ink of a book that has no binding of its own yet.

### Named Rules

**The Two Colours Rule.** An interface surface is one ground and one ink. Rules, secondary text and dotted lines are that same ink at 45%, 78% and 55%. There are no greys, no accent, no third hue on chrome. Books are objects standing on the surface and bring their own cloth and foil; they are the only other colour a screen carries.

**The Contrast Floor Rule.** Every pair, in every light: ink on ground at least 7:1, the muted strength at least 4.5:1, foil on cloth at least 4.5:1. Measured across the 21 bindings plus Day and Night, the shipped minimums are 7.28:1, 4.78:1 and 4.68:1. A new binding is not finished until it clears all three.

**The Swap Rule.** Emphasis is made by swapping the two colours, never by adding one: the statement band, the catalogue line under the pointer, and text selection all take ink as ground and ground as ink.

**The Muted Is For Secondary Rule.** The 78% strength is for secondary text on the normal surface. It is not guaranteed on an inverted surface (it falls to 4.30:1 on one binding there), so inverted bands carry full-strength ink only, as the shipped one does.

## Typography

**Display and Body Font:** Junicode (self-hosted variable, weight 400 to 600, width 75 to 100, roman and italic; fallback Georgia, Times New Roman, serif)
**Label/Mono Font:** Fragment Mono 400 (fallback ui-monospace, SF Mono, Menlo)
**Wordmark Font:** Alpha Lyrae Medium, self-hosted

**Character:** A seventeenth-century book face cut from the Fell types does both jobs: narrowed to its condensed width it sets titles tight and tall, at its regular width it sets the reading. Small mono capitals, set plain, carry everything that is interface, so the two never blur.

### Hierarchy

Every font size on the interface is one of eight steps, declared once as custom properties (`--t-*`) and used by name. Width, weight and italic vary within a step; the size does not.

- **Display** (`--t-display`, `clamp(56px, 9.6vw, 96px)`; 400, width 75%, line-height 0.96, tracking -0.035em): the page heading of the index and of the missing page. One per page.
- **Headline** (`--t-headline`, `clamp(40px, 4.6vw, 64px)`; 500, width 75%, 1.03, -0.03em): the title of a book on its own page.
- **Title** (`--t-title`, `clamp(30px, 3.5vw, 50px)`; 400, width 84%, 1.08, -0.022em): the landing statement, and in italic the index's empty state.
- **Subhead** (`--t-subhead`, `clamp(21px, 1.9vw, 26px)`; line-height 1.08 to 1.22): the byline (italic), the read actions and the way into the index (italic, width 84%), and catalogue titles in the list (500, width 78%).
- **Reading** (`--t-reading`, `clamp(19px, 1.5vw, 21.5px)`; 400, 1.6, max-width 29em, about 72 characters a line, hanging punctuation): the text of a book; also the landing's footnote and the missing page's body. Headings inside the text are relative to it: h2 1.5em at 500 and width 84%; h3 1.16em italic 400; h4 0.82em in small caps tracked 0.08em. Code is Fragment Mono at 0.74em between dotted rules.
- **Lead** (`--t-lead`, `clamp(18px, 1.42vw, 20px)`; 400, 1.46 to 1.48, max 34em): blurbs, ledger lists, the index's lead.
- **Body** (`--t-body`, 18px; 400, 1.5, oldstyle numerals): default text, and the author in the catalogue list (italic).
- **Note** (`--t-note`, 16px; 1.5): the source credit and the PDF fallback note (italic, muted), and the search field (Fragment Mono, where 16px also keeps iOS from zooming on focus).

Outside the ramp, and fixed:

- **Label** (Fragment Mono 400, 11px on a 15px line, tracking 0.02em, uppercase, lining tabular numerals): all chrome. Links, counts, controls, ledger labels, catalogue numbers, metadata.
- **Wordmark** (Alpha Lyrae 500, 22px, 0.92, two stacked lines): the wordmark, with its glitch burst, and nothing else.
- **Card title** (21px, the subhead's small end held fixed; 500, width 80%, 1.1): a book's name under its cover in the index, where the column is too narrow to scale.
- **Marquee** (`clamp(38px, 3.96cqw, 64px)`, sized from the shelf's own width; width 75%, 1.12, -0.03em): the shelf's titles, the one in hand roman at 500, its neighbours italic at 400 and 74% opacity; each carries its year at 11px.
- **On a book** every size is in book-ems and scales with the object.

### Named Rules

**The One Ramp Rule.** A new piece of interface text takes one of the eight steps by name. No literal font size is written outside the ramp's declaration; the only fixed sizes are the 11px label, the 22px wordmark and the 21px card title.

**The Three Voices Rule.** Junicode says what the library holds, Fragment Mono says how to operate it, Alpha Lyrae signs it. No fourth family, and Alpha Lyrae never leaves the wordmark.

**The Width Is The Weight Rule.** Hierarchy comes from Junicode's width axis and size, not from boldness: 75% for the largest titles, 78 to 88% for mid titles and covers, 100% for reading. Weight stays between 400 and 500.

**The Ledger Label Rule.** A label sits in the left column of a ledger row, beside what it names. It is never stacked above a heading as a kicker. A heading that leads a band stands in the right-hand column with the label column left empty.

**The Never Dim Rule.** A label is never dimmed. Under the pointer a label that is a link or a button takes a 1px underline in its own ink, 4px below the letters; a disabled button takes none. Type at 11px has no contrast to spare, so no hover or emphasis lowers the opacity of a live label. Only a disabled control is faded (the shelf's previous and next at either end of the row).

**The Ink And Underline Rule.** State and action show with two means only, strength of ink and a 1px underline. An option that is off is muted; one that is on is full ink and underlined. A label that is the one way forward on its screen (the shelf's primary action, Clear, the missing page's way back) is underlined at rest. Every other label that is a link or button gains its underline only under the pointer. Plain label text that is neither underlined nor underlinable is data (a count, an author, a year, a catalogue number).

## Layout

One page margin everywhere (`--pad`, 16px), full-bleed inside it, no max-width container. Pages are single columns of bands separated by hairlines.

- **The banner.** Wordmark left and label links right (`COLLECTION`, `EN FR`), sitting on a full-width 1px rule in full-strength ink; beneath it a label line that says where you are (words leading back, `BACK TO THE SHELF`, or on the landing what the place is) and the light switch at right.
- **The ledger.** A 31fr / 69fr two-column grid with a 24px gutter, opened by a solid rule, rows padded 13px above and 26px below and separated by dotted lines. Used for the facts of a book, the text of a book (label sticky in the left column), the landing statement and the index header. It collapses to one column at 720px with a 12px row gap.
- **The landing** is one screen of shelf (banner, marquee, stage, strip, filling `100svh`), then the statement band on swapped colours. On a phone the first screen takes only the room it needs so the statement shows beneath.
- **The book page** opens as a 52fr / 48fr head: the object standing sticky at left, its title and ledger at right; the text follows as its own ledger. One column at 900px, book first.
- **The index** is a display heading, a control rule (search, format options, view options on one line over a full-strength rule), a count, then either covers on ledges (`repeat(auto-fill, minmax(min(168px, 42%), 1fr))`) or the catalogue list (number, title, author, format, year).
- **Rhythm.** Vertical space between bands is fluid: `clamp(56px, 8vw, 120px)` to `clamp(64px, 9vw, 128px)`. Inside chrome it is tight and fixed (8 to 14px).
- **Targets.** Labels keep 11px letters but answer across a band about 39px tall (12px block padding cancelled by a -12px margin, or 10px padding on the shelf's controls).
- **Breakpoints.** One phone breakpoint, 720px, shared by the shelf, the landing, the ledger and the index; 900px for the book page head.

### The book-em

All book geometry is in em. A full-height book is 31.25em tall, a cover is 0.66 of its height wide, and whatever holds a book sets the em through `font-size`: the shelf uses `--bh / 31.25` where `--bh` is `max(280px, min(60svh, 106cqw, 760px))`; the book page uses `min(2.02svh, 1.5vw)`; an index card uses `100cqw / 23`. One object therefore scales from the shelf to the index without a second drawing.

## Elevation & Depth

The interface is flat: no shadows, no layered surfaces, no tonal elevation. Depth belongs to books alone, and is real geometry (CSS 3D with a long lens, `perspective: max(4400px, 430cqw)`) plus the shadow a book throws.

### Shadow Vocabulary
- **Wall shadow** (a slot-sized block of `rgb(0 0 0 / 0.3)` blurred 0.75em, offset 2em right and 3.5em down behind the row; 4.2em and 5.4em for the open book, which stands nearer the light): every book on the shelf.
- **Standing shadow** (`drop-shadow(1.7em 2.3em 1.5em rgba(0,0,0,0.36))`): the book on its own page.
- **Ledge shadow** (`drop-shadow(0.5em 0.2em 0.5em rgba(0,0,0,0.26))`, growing to `0.9em 0.7em 0.9em / 0.3` as the cover lifts 0.5em under the pointer): covers in the index.
- **Self-shading on the object**: the round of the spine (dark toward both joints, a soft light down the middle), the joint groove and a low raking light on the front board, and a black veil on boards seen edge-on that clears as the book turns (`opacity: (1 - k) * 0.36`).

Lights change the shadow, not just the palette. In Day the wall shadow is the paper's own colour gone dark (`rgb(92 78 18 / 0.22)`) and the standing shadow drops to 0.2. In Night there is no wall: every book shadow is removed and the shelf is vignetted from the middle of the room instead.

### Named Rules

**The Shadows Belong To Books Rule.** A shadow means a physical book is casting it. No interface element (band, control, list line, field) has one. Focus on the search field is a 1px line on the rule it sits on, not a glow.

**The No Wall At Night Rule.** In the Night light books cast nothing. Do not reintroduce shadows there with a lighter colour.

## Shapes

Interface is square: radius 0 on every control, band and field, 1px lines only, no filled containers other than a full swap of the two colours. Lines come in two kinds, solid for structure (the banner rule and control rule at full ink, ledger and footer rules at 45%) and dotted for separation between like rows (55%).

Books carry the only curves: 0.1em on the spine, 0.16em on the fore-edge corners of a board. Their surfaces carry the only texture: a weave of 1px hairlines in real pixels (linen at a 3px pitch, buckram coarser at 4px, paper-over-boards none; flat index covers carry none, since a weave that small would alias).

The interface carries no icons, glyphs or drawn marks of any kind: controls are words and links are underlined. The only drawing is on books. Stamped devices are `currentColor` line drawings in a 200 by 240 box at a 1.3 round-capped stroke with no fills beyond a dot, computed from fixed seeds so the same drawing comes out on every render; the library's imprint is stamped at the foot of each spine.

A film of grain covers the whole viewport, books included (two fractal-noise layers, dark flecks and light flecks at different scales, 50% opacity, non-interactive), so it reads on any cloth.

## Components

### The label (chrome voice)
Small mono capitals, set plain: no brackets, no separators, no surface. As a link or button it carries a transparent 1px underline, 4px below the letters, that takes the ink's colour under the pointer (180ms); it is never dimmed, and a disabled button does not respond. It has no background, border or radius. Keyboard focus is a 1px full-ink outline offset 3px, the same on every focusable thing. Items in one label line are joined by a comma (`ERIC HUGHES, 1993`), a colon (`THE INDEX: 21 BOOKS`) or space; a book with a French edition carries the word `FR`, and one that reads on another site the word `EXTERNAL`, set off by space after its metadata.

### Options (ink and underline as state)
- **Style:** a row of labels with 20px between them. Counts ride inside the label (`PDF 9`).
- **State:** off is muted text; on (`aria-pressed="true"`) is full ink with a 1px underline. Nothing shifts between the two.
- Used for the format filter and the Covers / List view switch. The language switch is the two-slot variant: `EN FR` with a 12px gap and no separator, the current locale inked, the other a muted link. The light switch is the single-control variant: name, colon, value (`LIGHT: BOOK`; French sets a space before the colon), stepping to the next light. Clear, which resets the search and filter, is inked and underlined at rest because it is an action.

### Search field
- **Style:** bare mono text at the note step (16px) on the control rule, no box, no background, radius 0; placeholder in muted.
- **Focus:** the rule under the field thickens by a 1px line of full ink; the caret is the ink.

### The ledger
A label in the left column, what it names on the right, a dotted line between rows, a solid rule above the first. On the right: a paragraph, a list with en-dash markers, or plain-text actions.

### Text actions
The ways to read a book (Open the PDF, Download the PDF, Read it inline, Read it below, Read at another site) and the way into the index (Browse the collection) are sentences, not buttons: italic Junicode at the subhead step and 84% width, with a 1px underline at rest set 0.2em below that thickens to 2px under the pointer. Nothing follows the words; no mark says where a link goes. The landing's primary action is the exception in voice only: a label, `READ IT`, at the right of the shelf strip behind a dotted divider, and the only label on that screen underlined at rest.

### Text links
Links inside prose (the statement's note, ledger lists, source notes, the reading) are the ink with a 1px underline set 0.2em below. Under the pointer the underline thickens to 2px; the colour and opacity do not change.

### Inverted band
A full-bleed band on the two colours swapped, holding a ledger. It ends the shelf on a clear edge and carries the statement. Full-strength ink only.

### Catalogue line
One book a line: number (label, muted), title (condensed 500), author (italic), format and year (labels, muted), dotted line between. Under the pointer the whole line takes the two colours swapped and its muted cells go to full strength (160ms). On a phone it folds to two rows.

### Cover on a ledge
A flat front board standing on a 1px rule at 45%, its title beneath in condensed 500 at 21px and a muted label for author and year. No card surface. Under the pointer the cover lifts 0.5em and grows 2.2%.

### Navigation
The banner (see Layout). The footer is one line of labels over a 45% rule, in the page's language (`PUBLIC DOMAIN END TO END` and the librarian's address). Ledger labels are plain words (`ABOUT`, `READ`, `EDITION`, `BINDING`, `THE TEXT`); a back link is words only (`BACK TO THE SHELF`), underlined at rest on the missing page where it is the one way on; the long-PDF disclosure is a plus or a minus sign and words. Page titles join with a vertical bar (`Title | The Cypherpunk Library`).

### The book (signature)
A bound hardback in CSS 3D: spine toward the viewer, front board hinged off its right edge, back board, and a page block seen only when turned. One number, `--k`, turns it: 0 is spine-on, 1 is cover-forward, hinged on the spine's near-left edge so an open book sits in its own slot. All lettering is real text, typeset at the data source with real apostrophes and single quotes (titles, authors and blurbs alike), so every surface sets the same characters. Spine lettering runs top to bottom with every glyph lying on its side, punctuation included (`text-orientation: sideways`), so an apostrophe stays with its word.
- **Spine lettering, five manners:** roman (condensed 500), italic (width 84%, author in tracked small caps), caps (tracked 0.15em), mono (uppercase Fragment Mono), monoLower. The cover takes the same manner as its spine.
- **Cover layouts, three:** title top-left with author at the foot; centred; title at the foot with author at right and the device raised.
- **Device fits, three:** boxed in the middle (11.8em wide), bleed (board edge to board edge), edge (oversized, running off the fore-edge).
- The library's imprint, the open C of the wordmark, is stamped at the foot of every spine.

### The shelf (signature)
A butted row of upright spines with one book turned cover-forward, a marquee of titles above it and a strip below (the book in hand at left, named `NO. 01  TITLE  AUTHOR, YEAR` (`N° 01` in French; author and year muted), the whole name leading to the index; Previous, Next and the primary action at right).
- **Turning** is the whole interaction: the left and right keys (Home and End for the ends), click on a spine, sideways wheel or swipe, drag, or the strip's two words, `PREVIOUS` and `NEXT` (`PRÉCÉDENT`, `SUIVANT`), each a label with a full-size target, faded when there is nowhere further to go. The outgoing book closes, the incoming one swings open, the row re-centres under a clamp that never pulls its ends inside the page margin, the marquee re-centres the title over the cover, and the page tweens to the new pair.
- **Timing:** turn 560ms and row settle 900ms on `cubic-bezier(0.16, 1, 0.3, 1)`; marquee 660ms and perspective lean 750ms on `cubic-bezier(0.25, 1, 0.5, 1)`; ground and ink 500ms on the same quart curve (both are registered colour properties, so everything mixed from them follows on every frame).
- **Pointer:** a closed book comes a little off the shelf under the pointer; the perspective origin leans up to 15% either way with the mouse.
- **Phone (720px and below):** the open cover is always centred, the marquee becomes the one title in hand set alone and centred on up to two lines, and the strip drops the book's name.
- With JavaScript off the shelf is a row of plain links.

### Motion
Movement uses exponential ease-out (`--ease-out-expo`) or its gentler quart sibling (`--ease-out-quart`); nothing bounces. Small state fades of opacity and colour (the label's underline, the catalogue line swap, the roman / italic cross-fade) use plain `ease` at 160 to 420ms. Under `prefers-reduced-motion: reduce` every animation and transition is removed globally, and the wordmark stops bursting on its own; turning still works, instantly.

## Do's and Don'ts

### Do:
- **Do** keep every interface surface to one ground and one ink, with rules at 45%, dotted lines at 55% and secondary text at 78% of that ink.
- **Do** author a new binding as a full object: cloth, foil, page ground, page ink, spine manner, cover layout, weave, device, and check it against the floor (7:1 ink on ground, 4.5:1 muted, 4.5:1 foil on cloth).
- **Do** set facts as a ledger, label in the left column beside what it names.
- **Do** set chrome plain in the mono label voice: words, a colon between a name and its value (`LIGHT: BOOK`), a comma between an author and a year (`ERIC HUGHES, 1993`), space between separate items.
- **Do** show a selected option as full ink with a 1px underline and an unselected one as muted, and underline at rest only an action that changes the screen.
- **Do** make emphasis by swapping the two colours (a band, a line under the pointer, a selection).
- **Do** size books in em and let the holder set the em, so the same object serves the shelf, the book page and the index.
- **Do** draw a new stamped device as a `currentColor` line drawing in the 200 by 240 box at a 1.3 stroke, with fixed seeds for anything random. Drawing belongs to books; the interface has no icons.
- **Do** move things on `cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.25, 1, 0.5, 1)` and leave them still under reduced motion.
- **Do** give 11px labels a full-size target with block padding.
- **Do** make a link to read or browse an italic subhead line with a 1px underline at rest that thickens to 2px under the pointer.
- **Do** answer the pointer on text with an underline: a 1px underline appearing under a label, a 1px underline thickening to 2px under a text link.

### Don't:
- **Don't** introduce a grey, an accent or a third hue on interface. Colour arrives with the book in hand.
- **Don't** put a shadow, a radius, a gradient or a texture on an interface element. Those belong to books.
- **Don't** build cards, pills, chips, filled buttons or boxed inputs. Controls are text; fields are text on a rule.
- **Don't** stack a mono label above a heading as a kicker.
- **Don't** use square brackets, middle dots or arrows as decoration, on any surface: no arrow characters, no drawn arrow marks, no icons after a link or inside a control. They read as machine-made; the owner's word for the arrows was AI slop. Controls are words (`PREVIOUS`, `NEXT`, `BACK TO THE SHELF`, `EXTERNAL`), links are underlined, and items join with a comma, a colon, a vertical bar in page titles, or space.
- **Don't** dim text on hover. Opacity is not a hover state in this system.
- **Don't** recolour one cover template for a new text. Every book is its own binding.
- **Don't** use Alpha Lyrae for anything but the wordmark, or add a fourth typeface.
- **Don't** reach for bold. Junicode stays between 400 and 500; narrow it or enlarge it instead.
- **Don't** use the muted strength on an inverted band, or for anything a reader must not miss.
- **Don't** cast book shadows in the Night light.
- **Don't** use image files or WebGL for covers; they are SVG and CSS 3D with real text.
- **Don't** use bounce, spring overshoot or elastic easing.
- **Don't** dress the library as a neon terminal, a storefront or a database.
