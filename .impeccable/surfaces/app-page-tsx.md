---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/collection/page.tsx","app/book/[slug]/page.tsx"]
---

# Surface brief: the shelf (landing), the index (/collection), the book (/book/[slug])

Scope: whole-site replacement world. Modes: landing = Experience; /collection = Operate; /book/[slug] = Read.
Audience and job: privacy-minded readers finding one text worth reading and trusting it is free to read and keep. Nothing is for sale.
Constraints confirmed by the user (2026-11-26): the surface opens book-tinted, with paper Day and black Night one click away; the Alpha Lyrae wordmark and its glitch burst stay exactly as they are; all 21 covers are authored in SVG and CSS 3D, no WebGL, no image files. Build path: code-led (no image generation in this session).

## Direction contract

THESIS: The library is a shelf of 21 individually bound objects and the page wears whichever one you are holding. It refuses the category default of one cover template recoloured 21 times over a hero headline and a button.

OWN-WORLD: Two colours per screen, never more: a cloth ground and a foil ink, taken from the focused book; rules are the ink at 45 percent, secondary text at 78 percent. Three voices: Junicode (condensed for titles, text cut for reading), Fragment Mono in plain small capitals for all chrome (no square brackets, no middle dots and no arrows: the owner ruled all three out on 2026-11-26 as reading machine-made; state shows as ink plus an underline, and controls are words), Alpha Lyrae for the wordmark only. Hairline and dotted rules, ledger rows with the label in a left column, no cards, no pills, no drop shadows on interface.

STORY: A visitor sees real bound books, turns one to its cover, reads its title set large, opens it, and reads the text in a book face. They learn the shelf is public domain end to end and where to go for everything else.

FIRST VIEWPORT: Wordmark top left over a full-width hairline; plain mono labels beneath. A marquee of titles at about 51px, the focused one roman and its neighbours italic. Below it a butted row of upright spines about 62 percent of the viewport tall with the focused book turned cover-forward at centre, casting wall shadows. On a phone the title in hand is set alone over its book, on up to two lines. A bottom strip names the book at left with its catalogue number (it leads to the index) and carries the primary action, Read it, at right.

FORM: reference pinned by the user. seed: none (pinned) "I am really inspired by stripe press ... build out the cypherpunk library like this".

SIGNATURE INTERACTION: turning a book. Arrow keys, click, horizontal wheel or drag move the focus; the outgoing book closes to its spine while the incoming one swings cover-forward, the marquee re-centres over it and the whole surface tweens to its cloth and foil in about half a second. MOTION GRAMMAR: exponential ease-out throughout. The turn is 560ms on that curve, which puts four fifths of the rotation inside the first 200ms and spends the rest settling (a flat 240ms, the figure first written here from the reference's WebGL turn, read as a snap once the slot's width was animating with it); 500ms for colour, 900ms for the lateral settle; pointer parallax on the perspective only; everything off under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
