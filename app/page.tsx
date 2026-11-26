import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ShelfView from "@/components/ShelfView";
import Statement from "@/components/Statement";
import { MASTHEAD_LINES } from "@/lib/i18n";
import styles from "./page.module.css";

// Point hreflang at the French home; canonical stays "/" (this is the English
// landing). Other metadata (title, openGraph, the file-based card) is inherited
// from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { en: "/", fr: "/fr" } },
};

export default function Home() {
  return (
    <>
      {/* The first screen is the shelf and nothing else: the banner, the title of
          the book in hand, the row of books, and the strip that opens one. */}
      <div className={styles.first}>
        <Nav locale="en" altHref="/fr" />
        <main className={styles.main}>
          <h1 className="srOnly">{MASTHEAD_LINES.en.join(" ")}</h1>
          <ShelfView locale="en" />
        </main>
      </div>
      <Statement locale="en" />
    </>
  );
}
