import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import Wordmark from "./Wordmark";
import LangSwitch from "./LangSwitch";
import { ui, type Locale } from "@/lib/i18n";

// The banner: the wordmark and the site's links. No rule and no tagline: the name is enough. A page that has somewhere
// to send you back to (a book, the index) puts that one link under the
// wordmark; the landing puts nothing there.
//
// Rendered per page rather than in the root layout, so each page hands it the
// locale, its own label, and the URL of its twin in the other language
// (`altHref`; omit it to hide the language switch).
type Props = {
  locale?: Locale;
  altHref?: string;
  /** A way back, or where you are, under the wordmark. Nothing by default. */
  label?: ReactNode;
};

export default function Nav({ locale = "en", altHref, label }: Props) {
  const t = ui[locale];
  return (
    <header className={styles.nav}>
      <div className={styles.top}>
        <Wordmark />
        <nav className={styles.links} aria-label={t.chrome.index}>
          <Link
            href={locale === "fr" ? "/fr/collection" : "/collection"}
            className="label"
          >
            {t.collection}
          </Link>
          {altHref && <LangSwitch locale={locale} altHref={altHref} />}
        </nav>
      </div>
      {label && (
        <div className={styles.under}>
          <div className={`label ${styles.where}`}>{label}</div>
        </div>
      )}
    </header>
  );
}
