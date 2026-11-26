import type { CSSProperties } from "react";
import type { Book } from "@/lib/books";
import { designFor } from "@/lib/designs";
import Device from "./Device";
import styles from "./book.module.css";

// A bound book, as an object. Two forms:
//
//   <BookObject>  the whole thing in CSS 3D: spine toward you, the front board
//                 hinged off its right edge and running back into depth, the back
//                 board on the left, the page block behind. Whatever holds it
//                 turns it by setting --k (0 = spine-on, 1 = cover-forward).
//   <BookCover>   just the front board, flat, for the index.
//
// All lettering is real text (so it translates, selects, and reads in the page
// source); all measurements are in em, so a book scales with its font-size.
// Server-renderable: no hooks, no client code.

type Props = {
  book: Book;
  /** Display title (the French one on /fr). */
  title: string;
  className?: string;
};

/** The library's imprint: the open C of the wordmark, stamped at every spine's foot. */
export function Imprint({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M17.37 17.37a7.6 7.6 0 1 1 0-10.74"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function vars(book: Book): CSSProperties {
  const d = designFor(book);
  return {
    "--cloth": d.cloth,
    "--foil": d.foil,
    "--h": `${d.h}em`,
    "--t": `${d.t}em`,
  } as CSSProperties;
}

function Board({ book, title }: { book: Book; title: string }) {
  const d = designFor(book);
  return (
    <span className={styles.board}>
      <span className={styles.coverTitle}>
        <span className={styles.coverName}>{title}</span>
        <span className={styles.coverRule} />
        <span className={styles.coverYear}>{book.year}</span>
      </span>
      <Device id={d.device} className={styles.device} />
      <span className={styles.coverAuthor}>{book.author}</span>
    </span>
  );
}

export function BookCover({ book, title, className }: Props) {
  const d = designFor(book);
  return (
    <span
      className={`${styles.flat} ${className ?? ""}`}
      style={vars(book)}
      data-weave={d.weave}
      data-spine={d.spine}
      data-cover={d.cover}
      data-fit={d.fit}
      aria-hidden
    >
      <span className={`${styles.face} ${styles.front}`}>
        <Board book={book} title={title} />
      </span>
    </span>
  );
}

export default function BookObject({ book, title, className }: Props) {
  const d = designFor(book);
  return (
    <span
      className={`${styles.body} ${className ?? ""}`}
      style={vars(book)}
      data-weave={d.weave}
      data-spine={d.spine}
      data-cover={d.cover}
      data-fit={d.fit}
      aria-hidden
    >
      <span className={`${styles.face} ${styles.spine}`} data-face="spine">
        <span className={styles.spineAuthor}>{book.author}</span>
        <span className={styles.spineTitle}>{title}</span>
        <Imprint className={styles.spineMark} />
      </span>
      <span className={`${styles.face} ${styles.front}`} data-face="front">
        <Board book={book} title={title} />
      </span>
      <span className={`${styles.face} ${styles.back}`} />
      <span className={styles.fore} />
    </span>
  );
}
