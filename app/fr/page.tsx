import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ShelfView from "@/components/ShelfView";
import Statement from "@/components/Statement";
import { ui, MASTHEAD_LINES } from "@/lib/i18n";
import { OG_IMAGE, TWITTER_IMAGE } from "@/lib/og";
import styles from "@/app/page.module.css";

const FR_DESCRIPTION = ui.fr.subtitle;

// The French landing. Defining openGraph here replaces the root's (shallow
// merge), so re-attach the file-based card image and flag the French locale.
export const metadata: Metadata = {
  description: FR_DESCRIPTION,
  alternates: { canonical: "/fr", languages: { en: "/", fr: "/fr" } },
  openGraph: {
    title: "The Cypherpunk Library",
    description: FR_DESCRIPTION,
    url: "/fr",
    siteName: "The Cypherpunk Library",
    type: "website",
    locale: "fr_FR",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cypherpunk Library",
    description: FR_DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
};

export default function HomeFr() {
  return (
    // Mirrors the English landing; lang="fr" marks the subtree.
    <div lang="fr">
      <div className={styles.first}>
        <Nav locale="fr" altHref="/" />
        <main className={styles.main}>
          <h1 className="srOnly">{MASTHEAD_LINES.fr.join(" ")}</h1>
          <ShelfView locale="fr" />
        </main>
      </div>
      <Statement locale="fr" />
    </div>
  );
}
