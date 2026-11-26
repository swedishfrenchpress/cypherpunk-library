"use client";

import { usePathname } from "next/navigation";
import { ui } from "@/lib/i18n";
import styles from "./SiteFooter.module.css";

// The last line of every page: what this place is, and how to reach the
// librarian. Rendered once in the root layout, which does not know the page's
// language, so it reads it from the path: everything under /fr is French.
export default function SiteFooter() {
  const fr = /^\/fr(\/|$)/.test(usePathname());
  return (
    <footer className={styles.footer} lang={fr ? "fr" : undefined}>
      <p className="label">{ui[fr ? "fr" : "en"].chrome.footer}</p>
      <a className="label" href="mailto:info@cypherpunklibrary.com">
        info@cypherpunklibrary.com
      </a>
    </footer>
  );
}
