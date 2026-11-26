import type { ComponentType } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import BookObject from "@/components/Book";
import type { Book } from "@/lib/books";
import { ui, type Locale } from "@/lib/i18n";
import styles from "@/app/book/[slug]/page.module.css";

// The book page, shared by the English route (app/book/[slug]) and the French
// one (app/fr/book/[slug]). Purely presentational: every locale-dependent value
// (title, blurb, prose, source credit, back-link, switcher target) is resolved
// by the route and handed in.
//
// The top is set like a title page beside the bound book: the title, author and
// year at the head of the column, the blurb and the ways to read it at its foot,
// open space between. Below, on the same left edge, the text itself in the book
// face at a reading measure. One face throughout, no labels and no rules. The
// page wears this book's cloth and foil (see SurfaceSync / lib/surface.ts).
type Props = {
  book: Book;
  /** Resolved title — English title, or the French override. */
  title: string;
  /** Resolved blurb — English description, or the French override. */
  description: string;
  /** Resolved prose component (French if available, else English), if any. */
  Text?: ComponentType;
  /** Page locale: drives the <html>-subtree lang and the chrome. */
  locale: Locale;
  /** Language of the rendered prose — flags the article when it differs from the
   *  page locale (a French page falling back to the English text). */
  contentLocale: Locale;
  /** The URL of this exact page in the other language, for the Nav switcher. */
  altHref: string;
  backHref: string;
  backLabel: string;
  /** Set on a French page with no translation yet — shown above the English prose. */
  untranslatedNote?: string;
  /** Translated attribution lead-in, shown before the linked source name;
   *  replaces the English "Reproduced from …" credit. */
  frSourceIntro?: string;
};

export default function BookView({
  book,
  title,
  description,
  Text,
  locale,
  contentLocale,
  altHref,
  backHref,
  backLabel,
  untranslatedNote,
  frSourceIntro,
}: Props) {
  const t = ui[locale].chrome;
  const readsHere = !book.pdf && !book.external && !!Text;

  // A PDF is opened in its own tab or downloaded, never embedded in the page.

  return (
    <div lang={locale === "fr" ? "fr" : undefined}>
      <Nav locale={locale} altHref={altHref} label={<Link href={backHref}>{backLabel}</Link>} />
      <main className={styles.page}>
        <div className={styles.head}>
          {/* The object. */}
          <div className={styles.stand} aria-hidden>
            <div className={styles.pose}>
              <BookObject book={book} title={title} />
            </div>
          </div>

          <div className={styles.titlePage}>
            <header>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.byline}>
                {t.by} {book.author}, {book.year}
              </p>
            </header>

            <div className={styles.matter}>
              {description && <p className={styles.about}>{description}</p>}

              <ul className={styles.actions}>
                {book.pdf ? (
                  <>
                    <li>
                      <a href={book.pdf} target="_blank" rel="noreferrer">
                        {t.openPdf}
                      </a>
                    </li>
                    <li>
                      <a href={book.pdf} download>
                        {t.downloadPdf}
                      </a>
                    </li>
                    {book.epub && (
                      <li>
                        <a href={book.epub} download>
                          {t.downloadEpub}
                        </a>
                      </li>
                    )}
                  </>
                ) : book.external ? (
                  <li>
                    <a href={book.external} target="_blank" rel="noreferrer">
                      {t.readAt} {book.externalLabel}
                    </a>
                  </li>
                ) : (
                  <li>
                    <a href="#text">{t.readBelow}</a>
                  </li>
                )}
              </ul>

              {book.lightning && (
                <div className={styles.v4v}>
                  <a
                    className={styles.v4vQr}
                    href={`lightning:${book.lightning}`}
                    aria-label={
                      locale === "fr"
                        ? `Soutenir ${book.author} via Lightning : ${book.lightning}`
                        : `Tip ${book.author} over Lightning: ${book.lightning}`
                    }
                  >
                    {/* Static LNURL QR generated once; white-backed so it scans
                        on any cloth. Decorative — the address link names it. */}
                    <img src={`/books/${book.slug}-lightning.svg`} alt="" />
                  </a>
                  <p className={styles.v4vText}>
                    {t.support}
                    {t.colon}
                    <a href={`lightning:${book.lightning}`}>{book.lightning}</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {readsHere && Text && (
          <section id="text" className={styles.text} aria-label={t.text}>
            <div className={styles.reading}>
                {untranslatedNote && <p className={styles.fallbackNote}>{untranslatedNote}</p>}
                <article
                  className={styles.prose}
                  lang={contentLocale !== locale ? contentLocale : undefined}
                >
                  <Text />
                </article>
                {(frSourceIntro || book.source) && (
                  <footer className={styles.sourceNote}>
                    {frSourceIntro ? (
                      <>
                        {frSourceIntro}
                        <a href={book.source} target="_blank" rel="noreferrer">
                          {book.sourceLabel}
                        </a>
                        . Texte du domaine public / librement diffusable, mis en
                        page ici par la Cypherpunk Library.
                      </>
                    ) : (
                      <>
                        Reproduced from{" "}
                        <a href={book.source} target="_blank" rel="noreferrer">
                          {book.sourceLabel ?? "the original source"}
                        </a>
                        . A public-domain / freely distributable text, set here in the
                        Cypherpunk Library&rsquo;s own hand.
                      </>
                    )}
                  </footer>
                )}
              </div>
          </section>
        )}
      </main>
    </div>
  );
}
