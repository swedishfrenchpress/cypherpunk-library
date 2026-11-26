import Link from "next/link";
import Nav from "@/components/Nav";
import { BookCover } from "@/components/Book";
import CollectionBrowser, { type Entry } from "@/components/Collection/CollectionBrowser";
import { books } from "@/lib/books";
import { getReadingMode } from "@/lib/format";
import { texts } from "@/content/texts";
import { ui, frBooks, hasFr, type Locale } from "@/lib/i18n";
import styles from "@/app/collection/page.module.css";

// The index, shared by the English route (/collection) and the French one
// (/fr/collection). Everything a row needs is resolved here on the server (the
// title in the page's language, how the book is read, its bound cover) and
// handed to the client browser as plain data plus a rendered cover, so neither
// the prose nor the cover drawing ships as client code. `altHref` is the other
// language's index, for the Nav switcher.
export default function CollectionView({
  locale,
  altHref,
}: {
  locale: Locale;
  altHref: string;
}) {
  const t = ui[locale];

  const entries: Entry[] = books.map((book, i) => {
    const frTitle = locale === "fr" ? frBooks[book.slug]?.title : undefined;
    const title = frTitle ?? book.title;
    const mode = getReadingMode(book, book.slug in texts);
    return {
      n: i + 1,
      slug: book.slug,
      href: `${locale === "fr" ? "/fr" : ""}/book/${book.slug}`,
      title,
      // every title this book answers to, for search: as set, and as typed
      // (with a plain apostrophe), in English and in French where there is one
      titles: [book.title, frTitle]
        .filter((s): s is string => !!s)
        .flatMap((s) => [s, s.replace(/[\u2018\u2019]/g, "'")]),
      author: book.author,
      year: book.year,
      description: book.description,
      kind: mode.kind,
      external: mode.where === "external",
      fr: locale === "fr" && hasFr(book.slug),
      cover: <BookCover book={book} title={title} />,
    };
  });

  return (
    <div lang={locale === "fr" ? "fr" : undefined}>
      <Nav
        locale={locale}
        altHref={altHref}
        label={
          <Link href={locale === "fr" ? "/fr" : "/"}>
            {t.back}
          </Link>
        }
      />
      <main className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t.browseView.title}</h1>
          <p className={styles.lead}>{t.browseView.lead}</p>
        </header>
        <CollectionBrowser entries={entries} locale={locale} />
      </main>
    </div>
  );
}
