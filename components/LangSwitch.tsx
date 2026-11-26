import Link from "next/link";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./Nav.module.css";

// The EN / FR switch. Two fixed slots: the current locale is plain text, the
// other is a link to this exact page's twin in that language (`altHref`). With
// two locales exactly one side is live on any page. Server-only: no JS, no state.
type Props = { locale: Locale; altHref: string };

export default function LangSwitch({ locale, altHref }: Props) {
  return (
    <span className={`label ${styles.lang}`} role="group" aria-label={ui[locale].chrome.language}>
      <Slot code="en" current={locale === "en"} altHref={altHref} />
      <Slot code="fr" current={locale === "fr"} altHref={altHref} />
    </span>
  );
}

function Slot({
  code,
  current,
  altHref,
}: {
  code: Locale;
  current: boolean;
  altHref: string;
}) {
  const label = code.toUpperCase();
  if (current) {
    return <span aria-current="true">{label}</span>;
  }
  return (
    <Link
      href={altHref}
      className={styles.langOther}
      hrefLang={code}
      aria-label={code === "fr" ? "Français" : "English"}
    >
      {label}
    </Link>
  );
}
