"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { lastBook, wear } from "@/lib/surface";
import styles from "./shelf.module.css";

// The shelf: a butted row of upright spines with one book turned cover-forward.
// Turning to another book is the whole interaction: the old one closes to its
// spine, the new one swings open, the title above re-centres over it, and the
// page changes into its cloth and foil.
//
// The books themselves are rendered on the server and handed in as `node`, so
// none of the cover drawing ships as client code and the shelf reads as plain
// links with JavaScript off. This component only decides which one is in hand.
//
// Layout is arithmetic, not measurement. Every width is known in book-ems, so
// the row's offset is a CSS clamp() fed two numbers (--c, the centre of the open
// cover, and --total, the row's width): it is right in the server's HTML, it
// follows a resize by itself, and nothing jumps on hydration.

export type ShelfItem = {
  /** Its number in the catalogue (the index's order), from 1. */
  n: number;
  slug: string;
  href: string;
  title: string;
  author: string;
  year: number;
  /** The page's pair when this book is in hand. */
  bg: string;
  fg: string;
  /** Spine thickness, cover width and height, in book-ems. */
  t: number;
  w: number;
  h: number;
  node: ReactNode;
};

type Labels = {
  help: string;
  /** The abbreviation for "number": No. / N°. */
  no: string;
  open: string;
  /** Names for assistive tech ("Previous book"), and the words shown. */
  previous: string;
  next: string;
  previousWord: string;
  nextWord: string;
  index: string;
};

// In book-ems. Mirrored as --gap / --m in shelf.module.css.
const GAP = 0.34; // between two spines
const MARGIN = 1; // either side of the open cover
const PAD = 16; // the page margin (--pad), in px

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Shelf({
  items,
  start,
  indexHref,
  labels,
}: {
  items: ShelfItem[];
  start: number;
  /** The index page, which the strip's book name leads to. */
  indexHref: string;
  labels: Labels;
}) {
  const count = items.length;
  const [i, setI] = useState(start);
  const [ready, setReady] = useState(false);

  const shelfRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const drag = useRef<{ x: number; id: number; dx: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  const step = useCallback(
    (by: number) => setI((v) => Math.min(count - 1, Math.max(0, v + by))),
    [count],
  );
  const go = useCallback(
    (to: number) => setI(Math.min(count - 1, Math.max(0, to))),
    [count],
  );

  // Where the open cover's centre sits along the row, and how long the row is.
  const { c, total, pitch } = useMemo(() => {
    let x = 0;
    let centre = 0;
    let spines = 0;
    items.forEach((it, j) => {
      spines += it.t;
      if (j === i) {
        centre = x + MARGIN + it.w / 2;
        x += it.w + MARGIN * 2;
      } else {
        x += it.t + GAP;
      }
    });
    return { c: centre, total: x, pitch: spines / items.length + GAP };
  }, [items, i]);

  // Coming back to the landing (from a book, or on reload), turn to the book
  // this tab last had in hand, without animating there. The before-paint script
  // has already dressed the page for it and raised [data-restore] to keep the
  // shelf out of sight until this runs.
  useIsoLayoutEffect(() => {
    const root = document.documentElement;
    const saved = lastBook();
    const at = saved ? items.findIndex((it) => it.slug === saved) : -1;
    if (at >= 0 && at !== start) {
      const shelf = shelfRef.current;
      shelf?.setAttribute("data-instant", "");
      setI(at);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => shelf?.removeAttribute("data-instant")),
      );
    }
    root.removeAttribute("data-restore");
    // Mount only: `start` and `items` are fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The page wears the book in hand.
  useEffect(() => {
    const it = items[i];
    wear(it.slug, it.bg, it.fg);
  }, [items, i]);

  // Keep keyboard focus on the open book as the arrows move it.
  useEffect(() => {
    const active = document.activeElement;
    if (active && linkRefs.current.includes(active as HTMLAnchorElement)) {
      linkRefs.current[i]?.focus({ preventScroll: true });
    }
  }, [i]);

  // Set the marquee so the open book's title stands over its cover. This is the
  // one place that measures: text widths aren't knowable ahead of time.
  const align = useCallback(() => {
    const shelf = shelfRef.current;
    const track = trackRef.current;
    const marquee = marqueeRef.current;
    const title = titleRefs.current[i];
    if (!shelf || !track || !marquee || !title) return;
    const em = parseFloat(getComputedStyle(track).fontSize);
    const vw = shelf.clientWidth;
    const totalPx = total * em;
    const cPx = c * em;
    // the same clamp the track's own transform uses (shelf.module.css)
    const edge = vw <= 720 ? vw / 2 : Math.max(PAD, vw * 0.045); // --edge
    const mid = (vw - totalPx) / 2;
    const lo = Math.min(vw - edge - totalPx, mid);
    const hi = Math.max(edge, mid);
    const centre = Math.min(Math.max(vw / 2 - cPx, lo), hi) + cPx;
    // keep the title clear of the row's faded ends (the 8% mask either side)
    const inset = Math.max(PAD, vw * 0.08);
    const w = title.offsetWidth;
    const left =
      w > vw - inset * 2 ? inset : Math.min(Math.max(centre - w / 2, inset), vw - inset - w);
    marquee.style.transform = `translate3d(${(left - title.offsetLeft).toFixed(1)}px,0,0)`;
  }, [i, c, total]);

  useIsoLayoutEffect(() => {
    align();
  }, [align]);

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    const ro = new ResizeObserver(() => align());
    ro.observe(shelf);
    let live = true;
    document.fonts.ready.then(() => {
      if (!live) return;
      align();
      requestAnimationFrame(() => setReady(true));
    });
    return () => {
      live = false;
      ro.disconnect();
    };
  }, [align]);

  // Arrow keys turn the shelf from anywhere on the page, unless you are typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(count - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, go, count]);

  // A sideways wheel or trackpad swipe turns the shelf; vertical scroll is left
  // to the page. Needs a non-passive listener to claim the sideways gesture.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let acc = 0;
    let lastEvent = 0;
    let lastStep = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (e.timeStamp - lastEvent > 240) acc = 0;
      lastEvent = e.timeStamp;
      acc += e.deltaX;
      if (Math.abs(acc) > 70 && e.timeStamp - lastStep > 110) {
        step(acc > 0 ? 1 : -1);
        acc = 0;
        lastStep = e.timeStamp;
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
  }, [step]);

  // Drag (or swipe) the row; the perspective also leans a little with the
  // mouse, so the boards you can see edge-on shift as you look along the shelf.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, id: e.pointerId, dx: 0, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    if (!stage) return;
    if (e.pointerType === "mouse" && !drag.current?.moved) {
      const box = stage.getBoundingClientRect();
      const lean = ((e.clientX - box.left) / box.width - 0.5) * 30;
      stage.style.setProperty("--lean", `${lean.toFixed(2)}%`);
    }
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    d.dx = e.clientX - d.x;
    if (!d.moved && Math.abs(d.dx) > 8) {
      d.moved = true;
      stage.setPointerCapture(d.id);
      shelfRef.current?.setAttribute("data-dragging", "");
    }
    if (d.moved) trackRef.current?.style.setProperty("--drag", `${d.dx.toFixed(1)}px`);
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || !d.moved) return;
    const track = trackRef.current;
    const em = track ? parseFloat(getComputedStyle(track).fontSize) : 16;
    let by = Math.round(-d.dx / (pitch * em));
    if (by === 0 && Math.abs(d.dx) > 36) by = d.dx < 0 ? 1 : -1;
    track?.style.removeProperty("--drag");
    shelfRef.current?.removeAttribute("data-dragging");
    stageRef.current?.releasePointerCapture?.(e.pointerId);
    if (by) step(by);
    // the click that follows a drag must not open or turn anything
    dragged.current = true;
    setTimeout(() => (dragged.current = false), 0);
  };
  const onPointerLeave = () => stageRef.current?.style.setProperty("--lean", "0%");

  const now = items[i];
  // The catalogue number, not the place in the row: the row is the catalogue
  // turned to open on its first book, and the index numbers books the same way.
  const place = `${labels.no} ${String(now.n).padStart(2, "0")}`;

  return (
    <section
      ref={shelfRef}
      className={styles.shelf}
      aria-label={labels.help}
      data-ready={ready || undefined}
    >
      {/* The title, large. A decorative echo of the links below (which carry
          the same titles for assistive tech), so it is hidden from them. */}
      <div className={styles.marquee} aria-hidden>
        <div ref={marqueeRef} className={styles.marqueeRow}>
          {items.map((it, j) => (
            <div
              key={it.slug}
              className={styles.title}
              data-on={j === i || undefined}
              onClick={() => go(j)}
            >
              <span
                ref={(el) => {
                  titleRefs.current[j] = el;
                }}
                className={styles.titleFaces}
              >
                <span className={styles.roman}>{it.title}</span>
                <span className={styles.italic}>{it.title}</span>
              </span>
              <span className={styles.year}>({it.year})</span>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={onPointerLeave}
      >
        <ol
          ref={trackRef}
          className={styles.track}
          style={{ "--c": `${c.toFixed(3)}em`, "--total": `${total.toFixed(3)}em` } as CSSProperties}
        >
          {items.map((it, j) => (
            <li
              key={it.slug}
              className={styles.slot}
              data-on={j === i || undefined}
              style={
                { "--st": `${it.t}em`, "--sw": `${it.w}em`, "--sh": `${it.h}em` } as CSSProperties
              }
            >
              <Link
                ref={(el) => {
                  linkRefs.current[j] = el;
                }}
                href={it.href}
                className={styles.book}
                tabIndex={j === i ? 0 : -1}
                aria-label={`${it.title}, ${it.author}, ${it.year}`}
                aria-current={j === i ? "true" : undefined}
                draggable={false}
                onClick={(e) => {
                  if (dragged.current) {
                    e.preventDefault();
                    return;
                  }
                  // a closed book turns to face you; the open one opens
                  if (j !== i && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
                    e.preventDefault();
                    go(j);
                  }
                }}
              >
                {it.node}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.strip}>
        <p className={`label ${styles.nowWrap}`} aria-live="polite">
          <Link href={indexHref} className={styles.now} title={labels.index}>
            <span className={styles.place}>{place}</span>
            <span className={styles.nowTitle}>{now.title}</span>
            <span className={styles.nowBy}>
              {now.author}, {now.year}
            </span>
          </Link>
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`label ${styles.turn}`}
            onClick={() => step(-1)}
            disabled={i === 0}
            aria-label={labels.previous}
          >
            {labels.previousWord}
          </button>
          <button
            type="button"
            className={`label ${styles.turn}`}
            onClick={() => step(1)}
            disabled={i === count - 1}
            aria-label={labels.next}
          >
            {labels.nextWord}
          </button>
          <Link href={now.href} className={`label ${styles.open}`}>
            {labels.open}
          </Link>
        </div>
      </div>
    </section>
  );
}
