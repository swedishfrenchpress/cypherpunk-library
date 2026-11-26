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
// the whole row is a function of one number: a place along it, counted in
// books. 10 is the eleventh book open; 10.5 is that one half closed and the
// next half open. `pose` writes that place to the row (each slot's turn and how
// far it stands aside, the row's centre and length) and CSS does the rest, with
// transforms only: slots never change width.
//
// A click or a key sets a whole-number place and CSS transitions carry the row
// there: unhurried from the pointer, short from the keyboard, none while a key
// is held (see `turn`).
//
// A hand works in two phases. While it is down (a finger, a mouse drag, two
// fingers on a trackpad) the place follows it directly, frame by frame, with no
// easing: the edge of the book being pulled in moves 1:1 with the hand, the
// cover in front of it folds shut and the next one unfolds, and the title above
// travels in step. When the hand lets go, one spring, seeded with its speed,
// carries the row to the nearest whole book: half-way is enough, and so is a
// flick. The spring can be caught again at any moment.

export type ShelfItem = {
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
  open: string;
  /** Names for assistive tech ("Previous book"), and the words shown. */
  previous: string;
  next: string;
  previousWord: string;
  nextWord: string;
};

// In book-ems. Mirrored as --gap / --m in shelf.module.css.
const GAP = 0.34; // between two spines
const MARGIN = 1; // either side of the open cover
const PAD = 16; // the page margin (--pad) where it cannot be read, in px

type Pace = "pointer" | "keys" | "repeat" | "instant";
/** What a hand holds once it has taken the row. */
type Hold = {
  /** Which taking of the row this is: a later one, or a click, makes it void. */
  id: number;
  /** Where the row was when it was taken, in px of hand travel from the first book. */
  x0: number;
  /** One book-em, in px. */
  em: number;
  /** The book that was in hand. */
  from: number;
  /** The furthest the hand has taken the row from that book, in books, signed. */
  out: number;
};
type Drag = {
  id: number;
  /** Where the pointer was when it took the row (and, until then, where it went down). */
  x: number;
  y: number;
  hold: Hold | null;
  /** The last few pointer positions, for the speed at release. */
  samples: { t: number; x: number }[];
};

// The release spring: quick, so a snap-back never dawdles, and critically
// damped, so a book arrives and stays. Nothing on this site bounces.
const STIFFNESS = 280;
const DAMPING = 2 * Math.sqrt(STIFFNESS);
// A hand leaving faster than this (px per ms) turns a book by speed alone: a
// flick is enough, however short. To undo a turn it has itself begun, a flick
// back has to be meant, so a hand drifting back as it lifts does not cancel it.
const FLICK = 0.11;
const FLICK_BACK = 0.35;
// How long the row is imagined to coast after the hand lets go, in ms.
const COAST = 160;
// Past the first or last book the row still gives, but less the further it is
// pulled, and never as far as GIVE_MOST px: the end is felt, not hit.
const GIVE = 0.55;
const GIVE_MOST = 140;
const give = (over: number) =>
  Math.sign(over) * GIVE_MOST * (1 - 1 / ((Math.abs(over) * GIVE) / GIVE_MOST + 1));

/** An element's own horizontal translation, mid-transition included. */
const readX = (el: Element | null) =>
  el ? new DOMMatrixReadOnly(getComputedStyle(el).transform).m41 : 0;
/** Where an element's left edge is on screen, whatever is moving it. */
const leftOf = (el: Element) => el.getBoundingClientRect().left;
const em = (v: number) => `${v.toFixed(3)}em`;
const within = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Shelf({
  items,
  start,
  labels,
}: {
  items: ShelfItem[];
  start: number;
  labels: Labels;
}) {
  const count = items.length;
  const last = count - 1;
  // The book in hand: the one nearest the middle. Titles, the page's colours
  // and the links follow it; the row's geometry does not come from here.
  const [i, setI] = useState(start);
  const [ready, setReady] = useState(false);

  const shelfRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeLayerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLLIElement | null)[]>([]);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const titleRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Where the row is, in books (see the note at the top), and the book in hand.
  const at = useRef(start);
  const inHand = useRef(start);
  // The same place in px of hand travel, while a hand or the spring has the
  // row. It may run past either end; the row then only gives.
  const run = useRef(0);
  // What is left of a slide that was caught part-way: carried by the two drag
  // layers and spent by the spring.
  const rest = useRef({ row: 0, title: 0 });
  // The last whole-book turn: where it came from, and when.
  const prev = useRef({ from: start, when: 0 });
  // Where the title row stands for each book, px.
  const stops = useRef<number[]>([]);
  const posed = useRef<string[]>([]);
  const turning = useRef<boolean[]>([]);
  const drag = useRef<Drag | null>(null);
  const dragged = useRef(false);
  // Counts every time the row changes hands, so a hand that has lost it (to
  // another hand, or to a key) cannot move it afterwards.
  const grip = useRef(0);
  const raf = useRef(0);
  const reduced = useRef(false);

  // The row's arithmetic, in book-ems. None of it depends on which book is open.
  const geo = useMemo(() => {
    const C: number[] = []; // the centre of book j's cover when j is open
    const S: number[] = []; // how far the books after j stand aside for it
    let x = 0;
    for (const it of items) {
      C.push(x + MARGIN + it.w / 2);
      S.push(it.w + MARGIN * 2 - (it.t + GAP));
      x += it.t + GAP;
    }
    // How far a hand travels to bring each book in. Going from j to j+1 the
    // next book's edge crosses the open cover, so that is the distance, and the
    // edge keeps exactly under the hand.
    const stop = [0];
    for (let j = 1; j < items.length; j++) stop.push(stop[j - 1] + C[j] - C[j - 1] + S[j - 1]);
    return { C, S, base: x, stop };
  }, [items]);

  // Hand travel (book-ems) to a place along the row, and back.
  const toPlace = (d: number) => {
    if (last < 1) return 0;
    const s = geo.stop;
    let j = 0;
    while (j < last - 1 && d >= s[j + 1]) j++;
    return j + within((d - s[j]) / (s[j + 1] - s[j]), 0, 1);
  };
  const toTravel = (p: number) => {
    if (last < 1) return 0;
    const j = within(Math.floor(p), 0, last - 1);
    return geo.stop[j] + (p - j) * (geo.stop[j + 1] - geo.stop[j]);
  };

  // Write a place to the row. Each element gets its own values, the few that
  // changed, and nothing is measured: this runs on every frame of a drag.
  const pose = useCallback(
    (p: number) => {
      const track = trackRef.current;
      if (!track) return;
      const { C, S, base } = geo;
      const q = within(p, 0, last);
      const lo = within(Math.floor(q), 0, Math.max(0, last - 1));
      const hi = Math.min(last, lo + 1);
      const f = q - lo;
      const aside = S[lo] * (1 - f);
      track.style.setProperty("--c", em(C[lo] + (C[hi] - C[lo]) * f));
      track.style.setProperty("--total", em(base + aside + (hi > lo ? S[hi] * f : 0)));
      slotRefs.current.forEach((el, j) => {
        if (!el) return;
        const k = j === lo ? 1 - f : j === hi ? f : 0;
        const shift = j <= lo ? 0 : j === hi ? aside : aside + S[hi] * f;
        const key = `${k.toFixed(4)} ${shift.toFixed(3)}`;
        if (posed.current[j] === key) return;
        posed.current[j] = key;
        el.style.setProperty("--k", k.toFixed(4));
        el.style.setProperty("--shift", em(shift));
        // a book held part-way through its turn says so (see shelf.module.css)
        const part = k > 0.0001 && k < 0.9999;
        if (part !== !!turning.current[j]) {
          turning.current[j] = part;
          el.toggleAttribute("data-turning", part);
        }
      });
      const row = marqueeRef.current;
      const st = stops.current;
      if (row && st.length === count) {
        row.style.transform = `translate3d(${(st[lo] + (st[hi] - st[lo]) * f).toFixed(1)}px,0,0)`;
      }
    },
    [geo, last, count],
  );

  // The two drag layers: what is left of a caught slide, plus the give past
  // either end of the row.
  const layers = (over: number) => {
    const g = -give(over);
    const x = rest.current.row + g;
    const m = rest.current.title + g;
    const row = layerRef.current;
    const title = marqueeLayerRef.current;
    if (row) row.style.transform = Math.abs(x) > 0.05 ? `translate3d(${x.toFixed(1)}px,0,0)` : "";
    if (title) title.style.transform = Math.abs(m) > 0.05 ? `translate3d(${m.toFixed(1)}px,0,0)` : "";
  };

  const take = (j: number) => {
    inHand.current = j;
    setI(j);
  };

  // How fast the next whole-book turn plays. Set on the shelf before the change
  // so the CSS durations are in place when it lands.
  const pace = (p: Pace) => {
    const el = shelfRef.current;
    if (!el) return;
    if (p === "keys" || p === "repeat") el.setAttribute("data-pace", p);
    else el.removeAttribute("data-pace");
  };

  // Turn to a whole book: from a click, a key, a title. CSS carries the row
  // there from wherever it is, a half-finished spring included.
  const turn = useCallback(
    (to: number, how: Pace) => {
      const shelf = shelfRef.current;
      if (!shelf) return;
      to = within(Math.round(to), 0, last);
      // whatever had the row lets go of it
      cancelAnimationFrame(raf.current);
      grip.current += 1;
      drag.current = null;
      shelf.removeAttribute("data-direct");
      shelf.removeAttribute("data-dragging");
      if (how === "instant") {
        shelf.setAttribute("data-instant", "");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => shelf.removeAttribute("data-instant")),
        );
      }
      pace(how);
      rest.current = { row: 0, title: 0 };
      layers(0);
      prev.current = { from: at.current, when: performance.now() };
      at.current = to;
      pose(to);
      take(to);
    },
    // `layers`, `pace` and `take` only touch refs and a state setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [last, pose],
  );

  // Coming back to the landing (from a book, or on reload), turn to the book
  // this tab last had in hand, without animating there. The before-paint script
  // has already dressed the page for it and raised [data-restore] to keep the
  // shelf out of sight until this runs.
  useIsoLayoutEffect(() => {
    const saved = lastBook();
    const to = saved ? items.findIndex((it) => it.slug === saved) : -1;
    if (to >= 0 && to !== start) turn(to, "instant");
    document.documentElement.removeAttribute("data-restore");
    // Mount only: `start` and `items` are fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The page wears the book in hand.
  useEffect(() => {
    const it = items[i];
    wear(it.slug, it.bg, it.fg);
  }, [items, i]);

  // While the row is travelling, books sliding under a still pointer must not
  // each lift in turn: the shelf says it is moving and the hover waits.
  useEffect(() => {
    const el = shelfRef.current;
    if (!el) return;
    el.setAttribute("data-moving", "");
    const p = el.getAttribute("data-pace");
    const t = setTimeout(
      () => el.removeAttribute("data-moving"),
      p === "repeat" ? 60 : p === "keys" ? 240 : 540,
    );
    return () => clearTimeout(t);
  }, [i]);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduced.current = m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => {
      m.removeEventListener("change", sync);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // Keep keyboard focus on the open book as the arrows move it.
  useEffect(() => {
    const active = document.activeElement;
    if (active && linkRefs.current.includes(active as HTMLAnchorElement)) {
      linkRefs.current[i]?.focus({ preventScroll: true });
    }
  }, [i]);

  // Where the title row stands for each book, so that book's title is over its
  // cover. This is the one place that measures: text widths aren't knowable
  // ahead of time. Between two books the row stands between their two stops.
  const measure = useCallback(() => {
    const shelf = shelfRef.current;
    const track = trackRef.current;
    if (!shelf || !track) return;
    const size = parseFloat(getComputedStyle(track).fontSize);
    const vw = shelf.clientWidth;
    // the page margin as it is now (wider beside a notch): the strip is set in by it
    const strip = stripRef.current;
    const pad = (strip && parseFloat(getComputedStyle(strip).paddingRight)) || PAD;
    // the same clamp the track's own transform uses (shelf.module.css)
    const edge = vw <= 720 ? vw / 2 : Math.max(pad, vw * 0.045); // --edge
    // keep a title clear of the row's faded ends (the 8% mask either side)
    const inset = Math.max(pad, vw * 0.08);
    stops.current = items.map((_, j) => {
      const title = titleRefs.current[j];
      if (!title) return 0;
      const totalPx = (geo.base + geo.S[j]) * size;
      const cPx = geo.C[j] * size;
      const mid = (vw - totalPx) / 2;
      const centre = within(vw / 2 - cPx, Math.min(vw - edge - totalPx, mid), Math.max(edge, mid)) + cPx;
      const w = title.offsetWidth;
      const left = w > vw - inset * 2 ? inset : within(centre - w / 2, inset, vw - inset - w);
      return left - title.offsetLeft;
    });
    pose(at.current);
  }, [items, geo, pose]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(shelf);
    let live = true;
    document.fonts.ready.then(() => {
      if (!live) return;
      measure();
      requestAnimationFrame(() => setReady(true));
    });
    return () => {
      live = false;
      ro.disconnect();
    };
  }, [measure]);

  // Arrow keys turn the shelf from anywhere on the page, unless you are typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      const how = e.repeat ? "repeat" : "keys";
      if (e.key === "ArrowRight") turn(inHand.current + 1, how);
      else if (e.key === "ArrowLeft") turn(inHand.current - 1, how);
      else if (e.key === "Home") turn(0, how);
      else turn(last, how);
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn, last]);

  // ---- the hand ----

  // Put the row at `x` px of hand travel. Inside the row that is a place along
  // it; past either end the row only gives. Returns how far past it is.
  const drive = (x: number, size: number, follow = true) => {
    run.current = x;
    const inside = within(x, 0, geo.stop[last] * size);
    const p = toPlace(inside / size);
    at.current = p;
    pose(p);
    layers(x - inside);
    // The book in hand changes as the next one passes half-way, with a little
    // slack so a hand resting on the half-way mark does not flicker between two.
    if (follow && Math.abs(p - inHand.current) > 0.55) take(Math.round(p));
    return x - inside;
  };

  // Take hold of the row exactly where it is: at rest, part-way through a turn
  // the CSS is playing, or mid-spring. Nothing jumps under the hand.
  const grab = (): Hold | null => {
    const shelf = shelfRef.current;
    const track = trackRef.current;
    const row = marqueeRef.current;
    if (!shelf || !track || !row) return null;
    cancelAnimationFrame(raf.current);
    const size = parseFloat(getComputedStyle(track).fontSize) || 16;
    if (!shelf.hasAttribute("data-direct")) {
      // If a turn is still playing, read how far it has come from a slot it
      // moves, and start from that fraction rather than from its end.
      let p = at.current;
      const { from, when } = prev.current;
      if (Number.isInteger(from) && from !== p && performance.now() - when < 700) {
        const done =
          p > from
            ? 1 - readX(slotRefs.current[p]) / (geo.S[from] * size)
            : readX(slotRefs.current[from]) / (geo.S[p] * size);
        p -= Math.sign(p - from) * (1 - within(done, 0, 1));
      }
      // The slide has its own clock: whatever of it is left goes to the drag
      // layers, so the row and the title stay where they are on screen.
      const rowBefore = leftOf(track);
      const titleBefore = leftOf(row);
      shelf.setAttribute("data-direct", "");
      rest.current = { row: 0, title: 0 };
      layers(0);
      at.current = p;
      pose(p);
      const dRow = rowBefore - leftOf(track);
      const dTitle = titleBefore - leftOf(row);
      rest.current = {
        row: Math.abs(dRow) > 0.5 ? dRow : 0,
        title: Math.abs(dTitle) > 0.5 ? dTitle : 0,
      };
      layers(0);
      run.current = toTravel(p) * size;
    }
    grip.current += 1;
    return { id: grip.current, x0: run.current, em: size, from: inHand.current, out: 0 };
  };

  // Track: the row is the hand. `delta` is how far the hand has moved, px.
  const dragTo = (h: Hold, delta: number) => {
    if (h.id !== grip.current) return 0;
    const over = drive(h.x0 - delta, h.em);
    const gone = at.current - h.from;
    if (Math.abs(gone) > Math.abs(h.out)) h.out = gone;
    return over;
  };

  // Let go at speed `v` (the hand's, px per ms). The row would coast a little
  // further; the book it would then be nearest is where it goes, and a flick
  // goes on to the next one whatever the distance. `nudge` is how much of a
  // book has to have gone by for a slow release to count; `flicks` is off for
  // a trackpad, whose speed at the end is only its momentum fading.
  const release = (h: Hold, v: number, nudge = 0.5, flicks = true) => {
    const shelf = shelfRef.current;
    if (!shelf || h.id !== grip.current) return;
    shelf.removeAttribute("data-dragging");
    const speed = -v; // along the row
    const size = h.em;
    const end = geo.stop[last] * size;
    const here = at.current;
    const j = within(Math.floor(here), 0, Math.max(0, last - 1));
    const book = last < 1 ? 1 : (geo.stop[j + 1] - geo.stop[j]) * size;
    // a throw never skips a book: the coast is worth six tenths of one at most
    const coast = within(speed * COAST, -0.6 * book, 0.6 * book);
    let to = Math.round(toPlace(within(run.current + coast, 0, end) / size));
    // With the way the hand has been going, any flick counts. Against it, only
    // a firm one: that is a change of mind, not a hand settling as it lifts.
    const along = Math.abs(h.out) < 0.05 || Math.sign(h.out) === Math.sign(speed);
    const flick = flicks && Math.abs(speed) > (along ? FLICK : FLICK_BACK);
    if (flick && speed > 0) {
      const next =
        here < h.from - 0.12 ? Math.floor(here) + 1 : Math.max(h.from + 1, Math.floor(here) + 1);
      to = Math.max(to, next);
    } else if (flick && speed < 0) {
      const next =
        here > h.from + 0.12 ? Math.ceil(here) - 1 : Math.min(h.from - 1, Math.ceil(here) - 1);
      to = Math.min(to, next);
    } else if (to === h.from && Math.abs(here - h.from) > nudge) {
      to = h.from + Math.sign(here - h.from);
    }
    to = within(to, 0, last);
    const goal = geo.stop[to] * size;
    // the title and the page change now; the books arrive on the spring
    if (inHand.current !== to) take(to);

    const land = () => {
      rest.current = { row: 0, title: 0 };
      run.current = goal;
      at.current = to;
      prev.current = { from: to, when: 0 };
      pose(to);
      layers(0);
      // the durations come back a frame later, once this last frame is drawn
      raf.current = requestAnimationFrame(() => shelf.removeAttribute("data-direct"));
    };
    // Reduced motion: the hand moved it this far; the rest changes at once.
    if (reduced.current) return land();

    let x = run.current;
    let { row, title } = rest.current;
    // Leave the hand at the hand's speed, up to the fastest this spring can
    // take without carrying the row past its book.
    const most = Math.sqrt(STIFFNESS) * Math.abs(goal - x);
    let vx = within(speed * 1000, -most, most);
    let vr = 0;
    let vt = 0;
    let then = performance.now();
    const tick = (now: number) => {
      // Real time, in small steps: a slow frame makes the spring coarser, never
      // slower, so the row lands when it should on any device.
      let left = Math.min(0.25, (now - then) / 1000);
      then = now;
      while (left > 0) {
        const dt = Math.min(left, 0.008);
        left -= dt;
        vx += (-STIFFNESS * (x - goal) - DAMPING * vx) * dt;
        x += vx * dt;
        vr += (-STIFFNESS * row - DAMPING * vr) * dt;
        row += vr * dt;
        vt += (-STIFFNESS * title - DAMPING * vt) * dt;
        title += vt * dt;
      }
      if (Math.abs(x - goal) < 0.5 && Math.abs(vx) < 12 && Math.abs(row) < 0.5 && Math.abs(title) < 0.5) {
        return land();
      }
      rest.current = { row, title };
      drive(x, size, false);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  // The latest of these, for the wheel listener below.
  const hand = useRef({ grab, dragTo, release, turn });
  useIsoLayoutEffect(() => {
    hand.current = { grab, dragTo, release, turn };
  });

  // Two fingers sideways on a trackpad move the row the way a finger does: 1:1
  // while they are down and while the system's own momentum lasts. As the
  // momentum runs out the row is let go, rather than left to creep between two
  // books, and what remains of the swipe is ignored. Vertical scrolling stays
  // the page's. Needs a non-passive listener to claim the sideways gesture.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let hold: Hold | null = null;
    let gone = 0; // how far this swipe has moved the row, px
    let dir = 0; // which way it is going
    let peak = 0; // the fastest it has been that way, px per ms
    let recent: { t: number; dx: number }[] = [];
    let spent = false; // already answered: what follows is the swipe's tail
    let tail = 0; // the slowest that tail has been, px per ms
    let lastT = 0;
    let lastDx = 0;
    let notched = 0;
    let idle = 0;
    const letGo = (v: number) => {
      const h = hold;
      hold = null;
      gone = 0;
      dir = 0;
      peak = 0;
      recent = [];
      if (h) hand.current.release(h, v, 0.22, false);
    };
    const onWheel = (e: WheelEvent) => {
      if (drag.current?.hold) return; // a finger already has the row
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? stage.clientWidth : 1;
      const dx = e.deltaX * unit;
      const dy = e.deltaY * unit;
      const sideways = Math.abs(dx) > Math.abs(dy);
      const gap = e.timeStamp - lastT;
      if (spent) {
        // Momentum only ever fades. A pause, a turn back, or a push faster than
        // the tail has been is a new swipe.
        const now = Math.abs(dx) / within(gap, 4, 40);
        const fresh =
          gap > 140 ||
          (Math.abs(dx) > 3 && Math.sign(dx) !== Math.sign(lastDx)) ||
          now > tail * 1.5 + 0.3;
        if (!fresh) {
          if (sideways) e.preventDefault();
          tail = Math.min(tail, now);
          lastT = e.timeStamp;
          lastDx = dx;
          return;
        }
        spent = false;
      }
      if (!hold && !sideways) return;
      e.preventDefault();
      lastT = e.timeStamp;
      lastDx = dx;
      // a notched wheel has no travel to follow: one notch, one book
      if (e.deltaMode !== 0) {
        if (e.timeStamp - notched > 120) {
          notched = e.timeStamp;
          hand.current.turn(inHand.current + Math.sign(dx), "keys");
        }
        return;
      }
      if (!hold) {
        hold = hand.current.grab();
        if (!hold) return;
        gone = 0;
        dir = 0;
        peak = 0;
        recent = [];
      }
      // turning back is a new stroke: its speed is not the old one fading
      if (Math.abs(dx) > 1 && Math.sign(dx) !== dir) {
        dir = Math.sign(dx);
        peak = 0;
        recent = [];
      }
      gone += dx;
      const over = hand.current.dragTo(hold, -gone);
      recent.push({ t: e.timeStamp, dx });
      while (recent.length > 1 && e.timeStamp - recent[0].t > 70) recent.shift();
      const span = e.timeStamp - recent[0].t;
      const speed = span >= 24 ? recent.slice(1).reduce((sum, r) => sum + r.dx, 0) / span : 0;
      peak = Math.max(peak, Math.abs(speed));
      window.clearTimeout(idle);
      if ((span >= 24 && peak > 0.8 && Math.abs(speed) < 0.35) || Math.abs(over) > 80) {
        spent = true;
        tail = Math.max(0.1, Math.abs(speed));
        letGo(-speed);
      } else {
        // fingers still on the pad, or lifted with no momentum: 80ms of
        // nothing is the end of the swipe
        idle = window.setTimeout(() => letGo(0), 80);
      }
    };
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      window.clearTimeout(idle);
    };
  }, []);

  // A press that ended where the shelf could not hear it (a mouse button let
  // go off the page, or over another window) is over: let the row go.
  const drop = (d: Drag) => {
    drag.current = null;
    if (d.hold) release(d.hold, 0);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const old = drag.current;
    if (old && old.id !== e.pointerId) return; // a second finger does not take over the row
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (old) drop(old); // the same pointer, pressing again
    const d: Drag = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      hold: null,
      samples: [{ t: e.timeStamp, x: e.clientX }],
    };
    drag.current = d;
    // A finger landing on a row that is still settling catches it there and
    // then, as a hand would. (A mouse press on it stays a click.)
    if (e.pointerType !== "mouse" && shelfRef.current?.hasAttribute("data-direct")) {
      d.hold = grab();
      if (d.hold) shelfRef.current.setAttribute("data-dragging", "");
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    // a mouse moving with no button down is not dragging anything
    if (e.pointerType === "mouse" && e.buttons === 0) return drop(d);
    if (!d.hold) {
      const dx = Math.abs(e.clientX - d.x);
      const dy = Math.abs(e.clientY - d.y);
      // a stroke that sets off up or down is the page's, not the shelf's
      if (dy > 8 && dy > dx) {
        drag.current = null;
        return;
      }
      if (dx <= 8) return;
      // the drag begins here, so the first eight pixels are not a jump
      d.hold = grab();
      if (!d.hold) return;
      d.x = e.clientX;
      shelfRef.current?.setAttribute("data-dragging", "");
    }
    if (!stageRef.current?.hasPointerCapture(d.id)) {
      try {
        // keep receiving the gesture if the pointer leaves the shelf
        stageRef.current?.setPointerCapture(d.id);
      } catch {
        /* the pointer is already gone; the drag ends on the next event */
      }
    }
    d.samples.push({ t: e.timeStamp, x: e.clientX });
    if (d.samples.length > 6) d.samples.shift();
    dragTo(d.hold, e.clientX - d.x);
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.hold) return;
    // the hand's speed over its last 80ms, px per ms (zero if it had stopped;
    // two samples a millisecond apart say nothing about speed, so ignore them)
    const end = d.samples[d.samples.length - 1];
    const from = d.samples.find((s) => end.t - s.t <= 80) ?? end;
    let v = end.t - from.t >= 16 ? (end.x - from.x) / (end.t - from.t) : 0;
    // nor does a gesture the browser took away (to scroll the page) mean to
    // throw the row anywhere
    if (e.timeStamp - end.t > 80 || e.type === "pointercancel") v = 0;
    v = within(v, -2.5, 2.5);
    try {
      stageRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* the capture was already gone (the gesture was cancelled) */
    }
    release(d.hold, v);
    // the click that follows a drag must not open or turn anything
    dragged.current = true;
    setTimeout(() => (dragged.current = false), 0);
  };

  const now = items[i];

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
        {/* moved with the row while a hand has it, so a title stays over its book */}
        <div ref={marqueeLayerRef} className={styles.marqueeLayer}>
        <div ref={marqueeRef} className={styles.marqueeRow}>
          {items.map((it, j) => (
            <div
              key={it.slug}
              className={styles.title}
              data-on={j === i || undefined}
              onClick={() => turn(j, "pointer")}
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
      </div>

      <div
        ref={stageRef}
        className={styles.stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* the drag layer: the only thing a finger moves */}
        <div ref={layerRef} className={styles.layer}>
        <ol
          ref={trackRef}
          className={styles.track}
          // The place the server draws, and the one React keeps: after this,
          // `pose` is the only writer of these values, here and on the slots.
          style={
            {
              "--c": em(geo.C[start]),
              "--total": em(geo.base + geo.S[start]),
            } as CSSProperties
          }
        >
          {items.map((it, j) => (
            <li
              key={it.slug}
              ref={(el) => {
                slotRefs.current[j] = el;
              }}
              className={styles.slot}
              data-on={j === i || undefined}
              style={
                {
                  "--st": `${it.t}em`,
                  "--sw": `${it.w}em`,
                  "--sh": `${it.h}em`,
                  // a closed book's shadow is its open one squeezed to a spine's width
                  "--sx": (it.t / it.w).toFixed(4),
                  "--k": j === start ? 1 : 0,
                  "--shift": j > start ? em(geo.S[start]) : "0em",
                } as CSSProperties
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
                    turn(j, "pointer");
                  }
                }}
              >
                {it.node}
              </Link>
            </li>
          ))}
        </ol>
        </div>
      </div>

      <div ref={stripRef} className={styles.strip}>
        {/* the title stands large above the book already; here it is only
            spoken, for anyone turning the shelf without seeing it */}
        <p className="srOnly" aria-live="polite">
          {now.title}, {now.author}, {now.year}
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={`label ${styles.turn}`}
            onClick={() => turn(i - 1, "pointer")}
            disabled={i === 0}
            aria-label={labels.previous}
          >
            {labels.previousWord}
          </button>
          <button
            type="button"
            className={`label ${styles.turn}`}
            onClick={() => turn(i + 1, "pointer")}
            disabled={i === last}
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
