---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/collection/page.tsx","app/book/[slug]/page.tsx"]
---

# Surface brief: the shelf (landing), the index (/collection), the book (/book/[slug])

Scope: whole-site replacement world. Modes: landing = Experience; /collection = Operate; /book/[slug] = Read.
Audience and job: privacy-minded readers finding one text worth reading and trusting it is free to read and keep. Nothing is for sale.
Constraints confirmed by the user (2026-11-26): the surface opens book-tinted, with paper Day and black Night one click away; the Alpha Lyrae wordmark stays (its glitch was later removed, see below); all 21 covers are authored in SVG and CSS 3D, no WebGL, no image files. Build path: code-led (no image generation in this session).

## Direction contract

THESIS: The library is a shelf of 21 individually bound objects and the page wears whichever one you are holding. It refuses the category default of one cover template recoloured 21 times over a hero headline and a button.

OWN-WORLD: Two colours per screen, never more: a cloth ground and a foil ink, taken from the focused book; secondary text is the ink at 78 percent. Running text is one face, Junicode (condensed for titles, text cut for reading), with no rules and no labels beside it; Fragment Mono in plain small capitals is kept for the banner and the controls; Alpha Lyrae is the wordmark only, static. No square brackets, middle dots or arrows anywhere, no cards, no pills, no drop shadows on interface. Space and position do the separating.

STORY: A visitor sees real bound books, turns one to its cover, reads its title set large, opens it, and reads the text in a book face. They learn the shelf is public domain end to end and where to go for everything else.

FIRST VIEWPORT: Wordmark top left over a full-width hairline; one plain mono line beneath. A marquee of titles at about 51px, the focused one roman and its neighbours italic (on a phone the title in hand is set alone over its book, on up to two lines). Below it a butted row of upright spines about 60 percent of the viewport tall with the focused book turned cover-forward at centre, casting wall shadows. A bottom strip carries only the controls, at right: Previous, Next, and the primary action, Read it.

FORM: reference pinned by the user. seed: none (pinned) "I am really inspired by stripe press ... build out the cypherpunk library like this".

SIGNATURE INTERACTION: turning a book. Arrow keys, click, horizontal wheel or drag move the focus; the outgoing book closes to its spine while the incoming one swings cover-forward, the title re-centres over it and the whole surface changes to its cloth and foil. MOTION GRAMMAR: transforms only. Two clocks: the turn (300ms, strong ease-out) and the slide of the row and its title together (500ms, drawer curve). From the keyboard both are short (180ms and 200ms) and a held key is instant. A hand (a finger, a mouse drag, two fingers on a trackpad) turns the books directly: the row is one number, a place along it counted in books, and the hand moves that number, so the edge of the book being pulled in travels 1:1 with it while the cover in front folds shut, the next unfolds and the title moves in step. Past either end the row only gives. On release one critically damped spring, seeded with the hand's speed, carries the row to the nearest whole book (half-way is enough, and so is a flick) and can be caught again mid-flight. Colour changes in 300ms. Under reduced motion nothing travels or turns over time; colour and opacity changes stay.

OWNER'S CORRECTIONS (2026-11-26, after the first build): brackets, middle dots and arrows removed ("AI slop", non-negotiable, enforced by scripts/check-tics.mjs); the landing's closing section and the footer made a plain colophon with no lines and one face; the book page's ledger and its "binding" notes removed ("too much content", "corny and fake") and the page set as a title page; the strip's line naming the book removed; the wordmark's glitch removed. DESIGN.md records each as a rule.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
