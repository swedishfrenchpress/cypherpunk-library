"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { ReadingKind } from "@/lib/format";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./collection.module.css";

// The index browser: search, a format filter, and two ways to look at the
// result. "Covers" stands every book face-out on a ledge; "List" is the
// catalogue, one line a book. The search field is text, so it is set in the
// book face on a line of its own that inks in when the field is in use; the
// options are the small mono capitals, inked and underlined when on, muted
// when off. No count is shown: the options carry their numbers and the books
// are in front of you. It is still spoken, for anyone who cannot see them.
//
// Entries arrive resolved from the server (CollectionView), each with its cover
// already rendered, so this file holds no book data and no drawing code.

export type Entry = {
  /** Place in the collection's own order, from 1. */
  n: number;
  slug: string;
  href: string;
  /** Display title, in the page's language. */
  title: string;
  /** Every title it answers to (English, and French where there is one). */
  titles: string[];
  author: string;
  year: number;
  description: string;
  kind: ReadingKind;
  /** Reads on another site. */
  external: boolean;
  /** Has a French edition (flagged on the French index only). */
  fr: boolean;
  cover: ReactNode;
};

type Layout = "covers" | "list";

// What the index can be filtered by. A book read on another site is not a
// format of its own here: it is found under All.
const KINDS: ReadingKind[] = ["Text", "PDF"];

export default function CollectionBrowser({
  entries,
  locale,
}: {
  entries: Entry[];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [layout, setLayout] = useState<Layout>("covers");
  const [kind, setKind] = useState<ReadingKind | null>(null);

  const t = ui[locale].browseView;

  const counts = useMemo(() => {
    const m = new Map<ReadingKind, number>();
    for (const e of entries) m.set(e.kind, (m.get(e.kind) ?? 0) + 1);
    return m;
  }, [entries]);

  const fuse = useMemo(
    () =>
      new Fuse(entries, {
        keys: [
          { name: "titles", weight: 0.55 },
          { name: "author", weight: 0.25 },
          { name: "description", weight: 0.15 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [entries],
  );

  // Fuzzy search first (keeps relevance order), then the format filter.
  const results = useMemo(() => {
    const q = query.trim();
    const base = q ? fuse.search(q).map((r) => r.item) : entries;
    return kind ? base.filter((e) => e.kind === kind) : base;
  }, [query, fuse, entries, kind]);

  const clearAll = () => {
    setQuery("");
    setKind(null);
  };

  const label = (e: Entry) =>
    `${e.title} ${t.by} ${e.author}` +
    (e.external ? `, ${t.opensExternal}` : "") +
    (e.fr ? `, ${t.frAvailable}` : "");

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.search}>
          <label htmlFor="collection-search" className="srOnly">
            {t.searchLabel}
          </label>
          <input
            id="collection-search"
            type="search"
            className={styles.searchInput}
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="search"
          />
        </div>

        <div className={styles.set} role="group" aria-label={t.filterLabel}>
          <button
            type="button"
            className={`label ${styles.opt}`}
            aria-pressed={kind === null}
            onClick={() => setKind(null)}
          >
            {t.all} {entries.length}
          </button>
          {KINDS.filter((k) => counts.has(k)).map((k) => (
            <button
              key={k}
              type="button"
              className={`label ${styles.opt}`}
              aria-pressed={kind === k}
              onClick={() => setKind(kind === k ? null : k)}
            >
              {t.formats[k]} {counts.get(k)}
            </button>
          ))}
        </div>

        <div className={styles.set} role="group" aria-label={t.viewLabel}>
          <button
            type="button"
            className={`label ${styles.opt}`}
            aria-pressed={layout === "covers"}
            onClick={() => setLayout("covers")}
          >
            {t.gridView}
          </button>
          <button
            type="button"
            className={`label ${styles.opt}`}
            aria-pressed={layout === "list"}
            onClick={() => setLayout("list")}
          >
            {t.listView}
          </button>
        </div>
      </div>

      <p className="srOnly" aria-live="polite">
        {results.length} {results.length === 1 ? t.one : t.many}
      </p>

      {results.length === 0 ? (
        <div className={styles.empty}>
          <p>
            {t.noMatch}
            {kind ? t.andFilter : ""}.
          </p>
          <button type="button" className={`label ${styles.clear}`} onClick={clearAll}>
            {t.clearAll}
          </button>
        </div>
      ) : layout === "covers" ? (
        <ul className={styles.grid}>
          {results.map((e) => (
            <li key={e.slug}>
              <Link href={e.href} className={styles.card} aria-label={label(e)}>
                <span className={styles.ledge}>{e.cover}</span>
                <span className={styles.cardTitle}>{e.title}</span>
                <span className={`label ${styles.cardMeta}`}>
                  {e.author}, {e.year}
                  {e.fr && <span className={styles.flag}>FR</span>}
                  {e.external && <span className={styles.flag}>{t.formats.External}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ol className={styles.list}>
          {results.map((e) => (
            <li key={e.slug}>
              <Link href={e.href} className={styles.line} aria-label={label(e)}>
                <span className={`label ${styles.lineNo}`}>{String(e.n).padStart(2, "0")}</span>
                <span className={styles.lineTitle}>{e.title}</span>
                <span className={styles.lineAuthor}>{e.author}</span>
                <span className={`label ${styles.lineKind}`}>
                  {t.formats[e.kind]}
                  {e.fr && <span className={styles.flag}>FR</span>}
                </span>
                <span className={`label ${styles.lineYear}`}>{e.year}</span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
