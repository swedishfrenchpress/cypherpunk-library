import type { Metadata } from "next";
import { Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Colophon from "@/components/Colophon";
import SiteFooter from "@/components/SiteFooter";
import SurfaceSync from "@/components/SurfaceSync";
import { books } from "@/lib/books";
import { HOUSE, surfacePairs } from "@/lib/designs";
import { surfaceInit } from "@/lib/surface";
import "./globals.css";

// Three voices, and only three.
//
// Junicode (Peter S. Baker, SIL OFL 1.1) is the library's book face: cut from the
// seventeenth-century Fell types of the Oxford press, which is the right lineage
// for a shelf of pamphlets and manifestos. One variable family does both jobs:
// its condensed width sets the titles, its regular width sets the reading. The
// files in app/fonts are a Latin subset with the width (75–100) and weight
// (400–600) axes kept; licence in app/fonts/Junicode-OFL.txt.
const junicode = localFont({
  variable: "--font-serif",
  src: [
    { path: "./fonts/Junicode-Roman.woff2", style: "normal", weight: "400 600" },
    { path: "./fonts/Junicode-Italic.woff2", style: "italic", weight: "400 600" },
  ],
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  display: "swap",
});

// Fragment Mono carries all the chrome: labels, counts, controls.
const fragmentMono = Fragment_Mono({
  variable: "--font-mono",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Alpha-Lyrae (Vega Protocol, SIL OFL 1.1) is the wordmark, and nothing else.
// Single weight (Medium); self-hosted (licence: app/fonts/OFL.md).
const alphaLyrae = localFont({
  variable: "--font-display",
  src: "./fonts/AlphaLyrae-Medium.woff2",
  weight: "500",
  display: "swap",
});

const DESCRIPTION =
  "A personal collection of good public-domain reads. Free to read, free to keep.";

// metadataBase resolves the file-based opengraph-image / twitter-image (app/)
// to absolute https://www.cypherpunklibrary.com URLs so crawlers index them. The
// title template lets child pages set just their own title and inherit the
// " — The Cypherpunk Library" suffix.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.cypherpunklibrary.com"),
  title: {
    default: "The Cypherpunk Library",
    template: "%s | The Cypherpunk Library",
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "The Cypherpunk Library",
    description: DESCRIPTION,
    url: "https://www.cypherpunklibrary.com",
    siteName: "The Cypherpunk Library",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Cypherpunk Library",
    description: DESCRIPTION,
  },
};

// What the page wears is decided before the first paint: this script reads the
// saved light and the book in hand (from the URL, or this tab's memory) and
// writes [data-light] and --book-bg/--book-fg onto <html> during parse. It must
// run synchronously, so it is a plain inline <script> as the first child of
// <body>; next/script's beforeInteractive would defer it to the Next runtime.
// suppressHydrationWarning silences the expected diff between the server's bare
// <html> and the script-dressed one. See lib/surface.ts.
const PAIRS = surfacePairs(books.map((b) => b.slug));
const SURFACE_INIT = surfaceInit(PAIRS, [HOUSE.bg, HOUSE.fg]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${junicode.variable} ${fragmentMono.variable} ${alphaLyrae.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* First child of <body>: runs during parse, before any content paints. */}
        <script dangerouslySetInnerHTML={{ __html: SURFACE_INIT }} />
        {children}
        <SiteFooter />
        {/* Renders nothing: keeps the page wearing the right book across client
            navigations (the inline script only runs on a full load). */}
        <SurfaceSync pairs={PAIRS} />
        {/* Renders nothing — logs a quiet colophon to the console, once. */}
        <Colophon />
        <Analytics />
      </body>
    </html>
  );
}
