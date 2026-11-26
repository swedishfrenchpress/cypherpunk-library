# Product

## Register

brand

## Users

Privacy-minded readers: the cypherpunk crowd who care about free information, encryption, and anti-censorship, alongside curious book lovers who wander in. They arrive expecting a personal, principled corner of the web, not a storefront. Their job is simple: discover something worth reading and trust that it's genuinely free to read and free to keep. There is an app behind the landing eventually (browsing the collection), but the landing page is the face and carries the brand by default.

## Product Purpose

The Cypherpunk Library is a curated collection of good public-domain reads. The landing page exists to make a small, opinionated collection feel inviting and alive, and to make a quiet point: everything here is public domain, so there is nothing for anyone to take down. Success is a visitor who lingers on the shelf, feels the care in the curation, and clicks through to read. The signature element is the shelf: a row of individually bound books, one turned cover-forward, on a surface that takes that book's cloth and foil.

## Brand Personality

Quiet, literary, calm. A hushed private library, not a marketing push. Voice is first-person, understated, and principled, with a dry cypherpunk wink rather than a shout. Restraint over spectacle: a book face (Junicode) for titles and reading, small mono capitals (Fragment Mono) for the chrome, and the technical display face (Alpha-Lyrae) for the wordmark only, where its glitch burst is the one cypherpunk wink on an otherwise calm surface. The freedom-of-information conviction is present but worn lightly, expressed through what the collection *is* rather than through loud rhetoric. Three words: literate, principled, unhurried.

## Anti-references

- **Corporate SaaS landing** — gradient hero, feature-grid cards, hero-metric template, "Trusted by" logo walls. This is a library, not a product launch.
- **Amazon / e-commerce bookstore** — dense product grids, star ratings, buy buttons, price tags, conversion clutter. Nothing here is for sale.
- **Crypto neon-on-black** — the obvious "cypherpunk" cliché: dark hacker terminal, neon-green-on-black, matrix rain. The aesthetic is bookcloth and foil (with paper as the Day light), deliberately the opposite of the category reflex.
- **Generic library catalog** — sterile database UI: tables, filter dropdowns, pagination, admin chrome. This is a curated shelf, not a search index.

## Design Principles

- **Cloth, not the terminal.** Reject the neon-terminal cypherpunk cliché. The page wears the book in hand: its cloth as the ground, its foil as the ink, two colours and no more. Paper and ink remain as the Day light, black as Night. The conviction shows through material and craft, never through hacker theatrics. (Decided 2026-11-26, replacing the earlier paper-only "Daylight" principle.)
- **The shelf is the argument.** The shelf and the books themselves carry the page, and every text is bound as its own object. Let the collection speak; resist explaining it with marketing copy.
- **Restraint as taste.** Quiet hierarchy, generous space, one considered accent. Sophistication reads as confidence, not as decoration.
- **Free to read, free to keep.** The freedom-of-information ethos is a felt promise, not a slogan. Honor it in tone and in the absence of anything transactional.
- **Motion that breathes.** Interactions should feel alive and responsive, never binary or gimmicky. Ease out, respect reduced-motion, let things settle softly.

## Accessibility & Inclusion

Target WCAG AA. Body and UI text maintain at least 7:1 against the ground in every book's colour pair and in the Day and Night lights; the muted strength (the ink at 78%) stays above 4.5:1 and is reserved for secondary text. All motion (the turn of a book, the colour change, the title marquee, the lean of the perspective) is fully disabled under `prefers-reduced-motion: reduce`, which the codebase honors globally. Interactive affordances do not rely on color alone. The collection must remain navigable and readable with motion off and at increased zoom.
