import Shelf, { type ShelfItem } from "./Shelf";
import BookObject from "./Book";
import { books } from "@/lib/books";
import { designFor } from "@/lib/designs";
import { ui, frBooks, type Locale } from "@/lib/i18n";

// The server half of the shelf: binds every book (title in the page's language,
// its cloth, its device) and hands the finished objects to the client <Shelf>,
// which only decides which one is in hand.
//
// The row is the collection's own order, turned so that the first text, the
// Manifesto, stands in the middle and opens the shelf: a full row either side of
// it, and the library's own colours on the first screen.
export default function ShelfView({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale].chrome;
  const half = Math.floor(books.length / 2);
  const order = [...books.slice(books.length - half), ...books.slice(0, books.length - half)];

  const items: ShelfItem[] = order.map((book) => {
    const d = designFor(book);
    const title = (locale === "fr" && frBooks[book.slug]?.title) || book.title;
    return {
      slug: book.slug,
      href: `${locale === "fr" ? "/fr" : ""}/book/${book.slug}`,
      title,
      author: book.author,
      year: book.year,
      bg: d.bg,
      fg: d.fg,
      t: d.t,
      w: Math.round(d.h * 0.66 * 1000) / 1000,
      h: d.h,
      node: <BookObject book={book} title={title} />,
    };
  });

  return (
    <Shelf
      items={items}
      start={half}
      labels={{
        help: t.shelfHelp,
        open: t.open,
        previous: t.previous,
        next: t.next,
        previousWord: t.previousWord,
        nextWord: t.nextWord,
      }}
    />
  );
}
