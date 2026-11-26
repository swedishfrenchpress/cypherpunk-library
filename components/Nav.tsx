import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import GlitchLogo from "./GlitchLogo";
import LightSwitch from "./LightSwitch";
import LangSwitch from "./LangSwitch";
import { ui, type Locale } from "@/lib/i18n";

// The banner. Two rows either side of one full-width rule: the wordmark and the
// site's two links above it; below it, a line that says where you are (or, on
// the landing, what this place is) and the light switch.
//
// Rendered per page rather than in the root layout, so each page hands it the
// locale, its own label, and the URL of its twin in the other language
// (`altHref`; omit it to hide the language switch).
type Props = {
  locale?: Locale;
  altHref?: string;
  /** The line under the rule. Defaults to the library's tagline. */
  label?: ReactNode;
};

export default function Nav({ locale = "en", altHref, label }: Props) {
  const t = ui[locale];
  return (
    <header className={styles.nav}>
      <div className={styles.top}>
        <GlitchLogo />
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
      <div className={styles.under}>
        <div className={`label ${styles.where}`}>{label ?? t.chrome.tagline}</div>
        <LightSwitch locale={locale} />
      </div>
    </header>
  );
}
