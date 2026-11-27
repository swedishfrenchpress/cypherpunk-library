import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import BookObject, { BookCover, Imprint } from "@/components/Book";
import Device from "@/components/Device";
import { books, getBookBySlug } from "@/lib/books";
import { designFor, HOUSE } from "@/lib/designs";
import shelf from "@/components/shelf.module.css";
import styles from "./lab.module.css";

// The share-card bench. Not part of the site: it 404s in production. Each
// ?card= renders one 1200 x 630 card in the top-left corner of the page, built
// from the site's real books and type, so a screenshot of the viewport at that
// size IS the card. Used to draw candidates for the Open Graph image.
//
//   /og-lab?card=shelf | cover | stack | statement
//   /og-lab?card=shelf&book=<slug>   that book turned to face you (the per-book card)
//   /og-lab?card=book&book=<slug>
//   /og-lab?card=one&look=cover|stand|pose|flat&book=<slug>   the book alone

type Props = { searchParams: Promise<{ card?: string; book?: string; look?: string }> };

const DESCRIPTION = "A personal collection of good public-domain reads.";

function Wordmark({ oneLine }: { oneLine?: boolean }) {
  // on one line the mark is a single run of text; stacked, it is two
  if (oneLine) return <span className={styles.wordmark}>Cypherpunk Library</span>;
  return (
    <span className={styles.wordmark}>
      <span>Cypherpunk</span>
      <span>Library</span>
    </span>
  );
}

function Head({ right, oneLine }: { right: ReactNode; oneLine?: boolean }) {
  return (
    <div className={styles.head}>
      <Wordmark oneLine={oneLine} />
      <span className={styles.label}>{right}</span>
    </div>
  );
}

function Foot({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className={styles.foot}>
      <span className={styles.label}>{left}</span>
      <span className={styles.label}>{right}</span>
    </div>
  );
}

function pair(bg: string, fg: string): CSSProperties {
  return { "--bg": bg, "--fg": fg } as CSSProperties;
}

/* A. The shelf itself: the landing's row, one book turned to face you. With no
   slug that is the first book (the site card); with one, it is that book, the
   rest of the shelf turned round it in catalogue order. */
function ShelfCard({ slug }: { slug?: string }) {
  const half = Math.floor(books.length / 2);
  const at = slug ? books.findIndex((b) => b.slug === slug) : 0;
  if (at < 0) notFound();
  const turned = [...books.slice(at), ...books.slice(0, at)];
  const order = [...turned.slice(books.length - half), ...turned.slice(0, books.length - half)];
  const GAP = 0.34;
  const M = 1;
  let x = 0;
  let c = 0;
  order.forEach((b, j) => {
    const d = designFor(b);
    if (j === half) {
      c = x + M + (d.h * 0.66) / 2;
      x += d.h * 0.66 + M * 2;
    } else x += d.t + GAP;
  });
  const open = designFor(order[half]);
  // a book's card hangs on the wall of that book's own page
  const wall = slug ? open : HOUSE;
  return (
    <div className={`surface ${styles.card}`} style={pair(wall.bg, wall.fg)}>
      {/* only the name, on one line: no rule under it and nothing beside it */}
      <div className={styles.name}>
        <Wordmark oneLine />
      </div>
      <div className={styles.shelfWrap}>
        <div className={shelf.stage}>
          <ol
            className={shelf.track}
            style={{ "--c": `${c.toFixed(3)}em`, "--total": `${x.toFixed(3)}em` } as CSSProperties}
          >
            {order.map((b, j) => {
              const d = designFor(b);
              return (
                <li
                  key={b.slug}
                  className={shelf.slot}
                  data-on={j === half || undefined}
                  style={
                    {
                      "--st": `${d.t}em`,
                      "--sw": `${d.h * 0.66}em`,
                      "--sh": `${d.h}em`,
                      "--sx": (d.t / (d.h * 0.66)).toFixed(4),
                      "--k": j === half ? 1 : 0,
                      "--shift":
                        j > half
                          ? `${(open.h * 0.66 + M * 2 - (open.t + GAP)).toFixed(3)}em`
                          : "0em",
                    } as CSSProperties
                  }
                >
                  <span className={shelf.book}>
                    <BookObject book={b} title={b.title} />
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* B. The card as a binding: the library bound as its own first book. */
function CoverCard() {
  const d = designFor(books[0]);
  return (
    <div className={`${styles.card} ${styles.cloth}`} style={{ "--cloth": d.cloth, color: d.foil } as CSSProperties}>
      <div className={styles.coverText}>
        <p className={styles.coverTitle}>
          The Cypherpunk
          <br />
          Library
        </p>
        <span className={styles.coverRule} />
        <p className={styles.coverLine}>{DESCRIPTION}</p>
      </div>
      <p className={styles.coverFoot}>Free to read, free to keep.</p>
      <Device id="digest" className={styles.coverDevice} />
      <Imprint className={styles.coverMark} />
    </div>
  );
}

/* C. The whole catalogue, lying in a pile: every spine legible, left to right. */
function StackCard() {
  const total = books.reduce((sum, b) => sum + designFor(b).t, 0);
  const room = 526;
  const floor = 14;
  return (
    <div className={`surface ${styles.card}`} style={pair(HOUSE.bg, HOUSE.fg)}>
      <Head right="21 texts, public domain end to end" />
      <div className={styles.stack}>
        {books.map((b) => {
          const d = designFor(b);
          const h = floor + (d.t / total) * (room - floor * books.length);
          return (
            <div
              key={b.slug}
              className={styles.band}
              data-spine={d.spine}
              style={{ "--cloth": d.cloth, color: d.foil, height: `${h.toFixed(2)}px`, fontSize: `${(h * 0.62).toFixed(2)}px` } as CSSProperties}
            >
              <span className={styles.bandAuthor}>{b.author}</span>
              <span className={styles.bandTitle}>{b.title}</span>
              <Imprint className={styles.bandMark} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* D. The statement, alone, on the house colours swapped. */
function StatementCard() {
  return (
    <div className={`surface ${styles.card}`} style={pair(HOUSE.fg, HOUSE.bg)}>
      <Head right="21 texts" />
      <p className={styles.statement}>
        A personal collection of good public-domain reads. Nothing for sale, nothing to take down.
      </p>
      <Foot left="Free to read, free to keep" right="cypherpunklibrary.com" />
    </div>
  );
}

/* E. One card per book: the page that book already wears, with the book on it. */
function BookCard({ slug }: { slug: string }) {
  const book = getBookBySlug(slug);
  if (!book) notFound();
  const d = designFor(book);
  const n = String(books.indexOf(book) + 1).padStart(2, "0");
  const size = book.title.length > 40 ? 62 : book.title.length > 27 ? 74 : 92;
  return (
    <div className={`surface ${styles.card}`} style={pair(d.bg, d.fg)}>
      <Head right={`No. ${n}`} />
      <div className={styles.bookRow}>
        <div className={styles.stand}>
          <div className={styles.pose}>
            <BookObject book={book} title={book.title} />
          </div>
        </div>
        <div className={styles.bookText}>
          <p className={styles.bookTitle} style={{ fontSize: size }}>
            {book.title}
          </p>
          <p className={styles.bookBy}>by {book.author}</p>
        </div>
      </div>
      <Foot left={`Written ${book.year}, free to read`} right="cypherpunklibrary.com" />
    </div>
  );
}

/* F. The book alone, on its own page's colours. Four ways to hold it:
   cover   the front board, flat and centred, nothing else
   stand   the book standing, turned most of the way to you, the name above
   pose    the book turned half to you, its title and author beside it
   flat    the front board beside its title and author */
function OneBook({ slug, look }: { slug: string; look: string }) {
  const book = getBookBySlug(slug);
  if (!book) notFound();
  const d = designFor(book);
  const em = (px: number) => `${(px / d.h).toFixed(3)}px`;
  const size = book.title.length > 40 ? 58 : book.title.length > 27 ? 70 : 86;
  const words = (
    <div className={styles.oneText}>
      <p className={styles.bookTitle} style={{ fontSize: size }}>
        {book.title}
      </p>
      <p className={styles.bookBy}>{book.author}</p>
    </div>
  );
  return (
    <div className={`surface ${styles.card}`} style={pair(d.bg, d.fg)} data-look={look}>
      {look === "cover" ? (
        <div className={styles.oneCentre} style={{ fontSize: em(540) }}>
          <BookCover book={book} title={book.title} className={styles.oneLift} />
        </div>
      ) : look === "stand" ? (
        <>
          <div className={styles.name}>
            <Wordmark oneLine />
          </div>
          <div className={styles.oneStand} style={{ fontSize: em(470), "--k": 0.86 } as CSSProperties}>
            <BookObject book={book} title={book.title} />
          </div>
        </>
      ) : look === "pose" ? (
        <div className={styles.oneRow}>
          <div className={styles.oneStand} style={{ fontSize: em(500), "--k": 0.68 } as CSSProperties}>
            <BookObject book={book} title={book.title} />
          </div>
          {words}
        </div>
      ) : (
        <div className={styles.oneRow}>
          <div className={styles.oneCentre} style={{ fontSize: em(520) }}>
            <BookCover book={book} title={book.title} className={styles.oneLift} />
          </div>
          {words}
        </div>
      )}
    </div>
  );
}

export default async function OgLab({ searchParams }: Props) {
  if (process.env.NODE_ENV === "production") notFound();
  const { card = "shelf", book, look = "cover" } = await searchParams;
  return (
    <div className={styles.bench}>
      {/* keep the dev overlay and the site footer out of the picture */}
      <style>{`nextjs-portal{display:none!important}body>footer{display:none}`}</style>
      {card === "cover" ? (
        <CoverCard />
      ) : card === "stack" ? (
        <StackCard />
      ) : card === "statement" ? (
        <StatementCard />
      ) : card === "one" ? (
        <OneBook slug={book ?? "why-i-wrote-pgp"} look={look} />
      ) : card === "book" ? (
        <BookCard slug={book ?? "why-i-wrote-pgp"} />
      ) : (
        <ShelfCard slug={book} />
      )}
    </div>
  );
}
