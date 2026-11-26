import type { ComponentType } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import BookObject from "@/components/Book";
import type { Book } from "@/lib/books";
import { designFor } from "@/lib/designs";
import { ui, type Locale } from "@/lib/i18n";
import styles from "@/app/book/[slug]/page.module.css";

// The book page, shared by the English route (app/book/[slug]) and the French
// one (app/fr/book/[slug]). Purely presentational: every locale-dependent value
// (title, blurb, prose, source credit, back-link, switcher target) is resolved
// by the route and handed in.
//
// Top: the bound book standing at three-quarters beside its facts, set as a
// ledger (what it is, how to read it, its edition, its binding). Below: the
// text itself, in the book face, at a reading measure. The page wears this
// book's cloth and foil (see SurfaceSync / lib/surface.ts).
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
  const design = designFor(book);
  // the binding's notes, in the page's language
  const binding = locale === "fr" ? design.fr : design;
  const readsHere = !book.pdf && !book.external && !!Text;

  // Book-length PDFs read badly trapped in a tall inline iframe, so we lead with
  // open/download and make the inline reader opt-in. Short ones (Finney's 7pp)
  // stay inline. Unknown page count is treated as long, to be safe.
  const isLongPdf = !!book.pdf && (book.pages == null || book.pages > 50);

  return (
    <div lang={locale === "fr" ? "fr" : undefined}>
      <Nav
        locale={locale}
        altHref={altHref}
        label={
          <Link href={backHref}>
            {backLabel}
          </Link>
        }
      />
      <main className={styles.page}>
        <div className={styles.head}>
          {/* The object. Hover (or focus within the page) turns it to face you. */}
          <div className={styles.stand} aria-hidden>
            <div className={styles.pose}>
              <BookObject book={book} title={title} />
            </div>
          </div>

          <div className={styles.facts}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.byline}>
              {t.by} {book.author}
            </p>

            <div className={`ledger ${styles.ledger}`}>
              {description && (
                <div className="row">
                  <p className="label">{t.about}</p>
                  <p className={styles.about}>{description}</p>
                </div>
              )}

              <div className="row">
                <p className="label">{t.read}</p>
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
                      <li>
                        <a href="#text">
                          {t.readInline}
                        </a>
                      </li>
                    </>
                  ) : book.external ? (
                    <li>
                      <a href={book.external} target="_blank" rel="noreferrer">
                        {t.readAt} {book.externalLabel}
                      </a>
                    </li>
                  ) : (
                    <li>
                      <a href="#text">
                        {t.readBelow}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="row">
                <p className="label">{t.edition}</p>
                <ul className={styles.list}>
                  <li>
                    {t.written} {book.year}
                  </li>
                  {book.pages && (
                    <li>
                      {book.pages} {t.pages}
                    </li>
                  )}
                  <li>{t.publicDomain}</li>
                  {book.source && (
                    <li>
                      {t.source}
                      {t.colon}
                      <a href={book.source} target="_blank" rel="noreferrer">
                        {book.sourceLabel ?? book.source}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              <div className="row">
                <p className="label">{t.binding}</p>
                <ul className={styles.list}>
                  <li>{binding.materials[0]}</li>
                  <li>{binding.materials[1]}</li>
                  <li>
                    {t.device}
                    {t.colon}
                    {binding.deviceNote}
                  </li>
                  <li>{t.set}</li>
                </ul>
              </div>

              {book.lightning && (
                <div className="row">
                  <p className="label">{t.support}</p>
                  <div className={styles.v4v}>
                    <a
                      className={styles.v4vQr}
                      href={`lightning:${book.lightning}`}
                      aria-label={
                        locale === "fr"
                          ? `Soutenir ${book.author} via Lightning\u00a0: ${book.lightning}`
                          : `Tip ${book.author} over Lightning: ${book.lightning}`
                      }
                    >
                      {/* Static LNURL QR generated once; white-backed so it scans
                          on any cloth. Decorative — the address link names it. */}
                      <img src={`/books/${book.slug}-lightning.svg`} alt="" />
                    </a>
                    <a className={`label ${styles.v4vAddr}`} href={`lightning:${book.lightning}`}>
                      {book.lightning}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {(book.pdf || readsHere) && (
          <section id="text" className={`ledger ${styles.text}`} aria-label={t.text}>
            <div className="row">
              <p className={`label ${styles.textLabel}`}>{t.text}</p>

              {book.pdf ? (
                isLongPdf ? (
                  // Long book: open/download is the real action; inline is opt-in.
                  <div className={styles.reader}>
                    {locale === "fr" ? (
                      <p className={styles.longNote}>
                        {book.pages ? `Ce livre fait ${book.pages} pages. ` : ""}
                        Il se lit mieux{" "}
                        <a href={book.pdf} target="_blank" rel="noreferrer">
                          ouvert dans son propre onglet
                        </a>{" "}
                        ou téléchargé. Vous pouvez aussi le lire dans la page, ci-dessous.
                      </p>
                    ) : (
                      <p className={styles.longNote}>
                        {book.pages ? `This is a ${book.pages}-page book. ` : ""}
                        It reads best{" "}
                        <a href={book.pdf} target="_blank" rel="noreferrer">
                          opened in its own tab
                        </a>{" "}
                        or downloaded. You can also read it inline below.
                      </p>
                    )}
                    <details className={styles.inline}>
                      <summary className="label">
                        <span className={styles.closed}>+</span>
                        <span className={styles.opened}>−</span> {t.readInline}
                      </summary>
                      <iframe
                        className={styles.frame}
                        src={`${book.pdf}#view=FitH`}
                        title={`${title} by ${book.author}`}
                        loading="lazy"
                      />
                    </details>
                  </div>
                ) : (
                  <div className={styles.reader}>
                    <iframe
                      className={styles.frame}
                      src={`${book.pdf}#view=FitH`}
                      title={`${title} by ${book.author}`}
                      loading="lazy"
                    />
                    {locale === "fr" ? (
                      <p className={styles.longNote}>
                        Le PDF ne s’affiche pas ?{" "}
                        <a href={book.pdf} target="_blank" rel="noreferrer">
                          Ouvrez-le dans un nouvel onglet
                        </a>{" "}
                        ou téléchargez-le ci-dessus.
                      </p>
                    ) : (
                      <p className={styles.longNote}>
                        Can&rsquo;t see the PDF?{" "}
                        <a href={book.pdf} target="_blank" rel="noreferrer">
                          Open it in a new tab
                        </a>{" "}
                        or download it above.
                      </p>
                    )}
                  </div>
                )
              ) : Text ? (
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
              ) : null}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
