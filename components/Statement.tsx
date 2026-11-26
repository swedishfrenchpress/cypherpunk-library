import Link from "next/link";
import { ui, type Locale } from "@/lib/i18n";
import styles from "@/app/page.module.css";

// The colophon: what the library is, said once, below the shelf. One face, two
// sizes, no rules and no labels: the statement (a sentence to a line), the
// footnote with its links kept, and the way into the collection.
export default function Statement({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale];
  // each sentence of the statement stands on its own line
  const sentences = t.subtitle.match(/[^.]+\./g) ?? [t.subtitle];
  return (
    <aside className={styles.colophon} aria-label={t.chrome.library}>
      <p className={styles.statement}>
        {sentences.map((s) => (
          <span key={s}>{s.trim()}</span>
        ))}
      </p>
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
      <p className={styles.note}>
        <Link href={locale === "fr" ? "/fr/collection" : "/collection"}>{t.browse}</Link>
      </p>
    </aside>
  );
}
