import Link from "next/link";
import { books } from "@/lib/books";
import { ui, type Locale } from "@/lib/i18n";
import styles from "@/app/page.module.css";

// What the library is, said once, below the shelf: the one-line statement, the
// principled footnote (with its links kept), and the way into the index. Set as
// a ledger on the page's two colours swapped, so the shelf above ends on a
// clear edge.
export default function Statement({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  const count = `${books.length} ${t.browseView.many}`;
  return (
    <aside className={`surface invert ${styles.band}`} aria-label={t.chrome.library}>
      <div className="ledger">
        <div className="row">
          <p className={styles.statement}>{t.subtitle}</p>
        </div>
        <div className="row">
          <p className="label">{t.chrome.everythingElse}</p>
          {locale === "fr" ? (
            <p className={styles.note}>
              Cette étagère est entièrement composée d’œuvres du domaine public. Pour
              tout le reste, il y a{" "}
              <a href="https://annas-archive.gl/" target="_blank" rel="noreferrer">
                Anna’s Archive
              </a>
              ,{" "}
              <a
                href="https://shadowlibraries.github.io/DirectDownloads/libgen/"
                target="_blank"
                rel="noreferrer"
              >
                LibGen
              </a>
              , et les torrents.
            </p>
          ) : (
            <p className={styles.note}>
              This shelf is public domain end to end. For everything else,
              there&rsquo;s{" "}
              <a href="https://annas-archive.gl/" target="_blank" rel="noreferrer">
                Anna&rsquo;s Archive
              </a>
              ,{" "}
              <a
                href="https://shadowlibraries.github.io/DirectDownloads/libgen/"
                target="_blank"
                rel="noreferrer"
              >
                LibGen
              </a>
              , and the torrents.
            </p>
          )}
        </div>
        <div className="row">
          <p className="label">
            {t.chrome.index}
            {t.chrome.colon}
            {count}
          </p>
          <p>
            <Link
              href={locale === "fr" ? "/fr/collection" : "/collection"}
              className={styles.browse}
            >
              {t.browse}
            </Link>
          </p>
        </div>
      </div>
    </aside>
  );
}
