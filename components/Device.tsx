import type { ReactNode } from "react";
import type { DeviceId } from "@/lib/designs";

// The stamped devices. One per binding, each drawn from its text's own subject
// and each a line drawing meant to read as foil or ink pressed into cloth: no
// fills beyond a dot, one stroke weight, nothing pictorial that geometry can't
// carry. Several are literally true rather than illustrative (the digest is the
// real SHA-256 of the title; the waveform is the real serial encoding of a word),
// which is the cypherpunk way to decorate something.
//
// Everything is computed once at module load from fixed seeds, so the same
// drawing comes out on every render. All coordinates live in a 200 x 240 box.

const TAU = Math.PI * 2;
const n = (v: number) => Math.round(v * 100) / 100;

type Pt = [number, number];
const line = (pts: Pt[], close = false) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"}${n(x)} ${n(y)}`).join("") +
  (close ? "Z" : "");
const dot = (x: number, y: number, r: number) =>
  `M${n(x - r)} ${n(y)}a${r} ${r} 0 1 0 ${n(r * 2)} 0a${r} ${r} 0 1 0 ${n(-r * 2)} 0Z`;
const seg = (x1: number, y1: number, x2: number, y2: number) =>
  `M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`;

// mulberry32: a small deterministic generator, so "random" placements are fixed.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CX = 100;
const CY = 120;

/* 1. A Cypherpunk's Manifesto: SHA-256("A Cypherpunk's Manifesto"), 16 x 16. */
function digest(): ReactNode {
  const hex = "155cc87cfc4bbca7c070cd6a800d8f80c243fe6860edc3cb0aa81f9742249e4e";
  const pitch = 11;
  const x0 = CX - 7.5 * pitch;
  const y0 = CY - 7.5 * pitch;
  let ones = "";
  let zeros = "";
  for (let i = 0; i < 256; i++) {
    const bit = (parseInt(hex[i >> 2], 16) >> (3 - (i & 3))) & 1;
    const x = x0 + (i % 16) * pitch;
    const y = y0 + Math.floor(i / 16) * pitch;
    if (bit) ones += dot(x, y, 3.2);
    else zeros += dot(x, y, 0.85);
  }
  return (
    <>
      <path d={ones} fill="currentColor" stroke="none" />
      <path d={zeros} fill="currentColor" stroke="none" />
    </>
  );
}

/* 2. The Crypto Anarchist Manifesto: barbed wire, and the wire clippers. */
function wire(): ReactNode {
  const ys = [50, 85, 120, 155, 190];
  let strands = "";
  let barbs = "";
  ys.forEach((y, row) => {
    const cut = row === 2;
    // the strands run board edge to board edge
    const spans: [number, number][] = cut
      ? [
          [0, 84],
          [116, 200],
        ]
      : [[0, 200]];
    for (const [a, b] of spans) {
      for (const phase of [0, Math.PI]) {
        const pts: Pt[] = [];
        for (let x = a; x <= b; x += 2)
          pts.push([x, y + 1.7 * Math.sin((x / 15) * TAU + phase)]);
        strands += line(pts);
      }
    }
    const offset = row % 2 ? 20 : 0;
    for (let x = 16 + offset; x < 196; x += 42) {
      if (cut && x > 76 && x < 124) continue;
      barbs += seg(x - 4.5, y - 7, x + 4.5, y + 7) + seg(x + 4.5, y - 7, x - 4.5, y + 7);
      barbs += `M${n(x - 2.6)} ${n(y)}a2.6 3.6 0 1 0 5.2 0a2.6 3.6 0 1 0 -5.2 0Z`;
    }
  });
  // the cut ends, sprung apart and drooping
  const droop =
    `M84 120Q92 121 95 134` + `M116 120Q108 121 105 133` + `M84 118.6Q91 118 93 110` + `M116 118.6Q110 117 108 111`;
  return <path d={strands + barbs + droop} />;
}

/* 3. A Declaration of the Independence of Cyberspace: a globe, no borders. */
function globe(): ReactNode {
  const R = 80;
  let d = dot(CX, CY, R).replace("Z", "");
  for (const deg of [18, 36, 54, 72]) {
    const rx = n(R * Math.sin((deg / 360) * TAU));
    d += `M${n(CX - rx)} ${CY}a${rx} ${R} 0 1 0 ${n(rx * 2)} 0a${rx} ${R} 0 1 0 ${n(-rx * 2)} 0`;
  }
  d += seg(CX, CY - R, CX, CY + R);
  for (const deg of [-67.5, -45, -22.5, 0, 22.5, 45, 67.5]) {
    const phi = (deg / 360) * TAU;
    const half = R * Math.cos(phi);
    const y = CY - R * Math.sin(phi);
    d += seg(CX - half, y, CX + half, y);
  }
  return <path d={d} />;
}

/* 4. Your Secret Right to Cash: banknote engraving. */
function guilloche(): ReactNode {
  let d = "";
  for (let k = 0; k < 6; k++) {
    const pts: Pt[] = [];
    for (let i = 0; i < 360; i++) {
      const th = (i / 360) * TAU;
      const r = 50 + 24 * Math.cos(8 * th + (k / 6) * TAU);
      pts.push([CX + r * Math.cos(th), CY + r * Math.sin(th)]);
    }
    d += line(pts, true);
  }
  d += dot(CX, CY, 84) + dot(CX, CY, 80) + dot(CX, CY, 18);
  return <path d={d} strokeWidth={0.85} />;
}

/* 5. The Praxeology of Privacy: everything deduced from one axiom. */
function tree(): ReactNode {
  let edges = "";
  let nodes = "";
  const at = (level: number, i: number): Pt => {
    const count = 2 ** level;
    return [CX + (i - (count - 1) / 2) * (172 / count), 36 + level * 42];
  };
  for (let level = 0; level < 5; level++) {
    for (let i = 0; i < 2 ** level; i++) {
      const [x, y] = at(level, i);
      nodes += dot(x, y, level === 0 ? 4.6 : 4.2 - level * 0.55);
      if (level < 4) {
        for (const child of [i * 2, i * 2 + 1]) {
          const [cx, cy] = at(level + 1, child);
          edges += seg(x, y, cx, cy);
        }
      }
    }
  }
  return (
    <>
      <path d={edges} />
      <path d={nodes} fill="currentColor" stroke="none" />
    </>
  );
}

/* 6. Of Cypherpunks and Sousveillance: watched from above, watching from below. */
function watch(): ReactNode {
  let d = "";
  const maxHalf = (70 / 360) * TAU;
  for (const [sy, dir] of [
    [24, 1],
    [216, -1],
  ] as const) {
    for (let i = 1; i <= 7; i++) {
      const r = 23 * i;
      const half = Math.min(maxHalf, r > 86 ? Math.asin(86 / r) : maxHalf);
      const pts: Pt[] = [];
      for (let s = 0; s <= 28; s++) {
        const b = -half + (s / 28) * half * 2;
        pts.push([CX + r * Math.sin(b), sy + dir * r * Math.cos(b)]);
      }
      d += line(pts);
    }
  }
  return (
    <>
      <path d={d} />
      <path d={dot(CX, 24, 3.4) + dot(CX, 216, 3.4)} fill="currentColor" stroke="none" />
    </>
  );
}

/* 7. Protecting Privacy with Electronic Cash: a blinded coin. */
function blind(): ReactNode {
  const R = 62;
  let d = dot(CX, CY, 70) + dot(CX, CY, R) + seg(CX, CY - R, CX, CY + R);
  for (let dx = 4.6; dx < R - 1; dx += 4.6) {
    const half = Math.sqrt(R * R - dx * dx);
    d += seg(CX - dx, CY - half, CX - dx, CY + half);
  }
  for (let deg = -75; deg <= 75; deg += 10) {
    const a = (deg / 360) * TAU;
    d += seg(CX + 46 * Math.cos(a), CY + 46 * Math.sin(a), CX + 54 * Math.cos(a), CY + 54 * Math.sin(a));
  }
  d += dot(CX + 22, CY, 11);
  return <path d={d} />;
}

/* 8. Why I Wrote PGP: "You put it in an envelope." */
function envelope(): ReactNode {
  const d =
    `M22 68H178V172H22Z` +
    `M22 68L100 128L178 68` +
    `M22 172L86 117.2M178 172L114 117.2` +
    dot(100, 128, 9.5) +
    dot(100, 128, 5.6);
  return <path d={d} />;
}

/* 9. Definition of Democratic Civilization: a comb, no cell above another. */
function comb(): ReactNode {
  const s = 17.5;
  let d = "";
  for (let q = -2; q <= 2; q++) {
    for (let r = -2; r <= 2; r++) {
      if (Math.abs(q + r) > 2) continue;
      const cx = CX + s * Math.sqrt(3) * (q + r / 2);
      const cy = CY + s * 1.5 * r;
      const pts: Pt[] = [];
      for (let k = 0; k < 6; k++) {
        const a = (30 + 60 * k) * (TAU / 360);
        pts.push([cx + s * Math.cos(a), cy + s * Math.sin(a)]);
      }
      d += line(pts, true);
    }
  }
  return <path d={d} />;
}

/* 10. The Conscience of a Hacker: "curiosity" on a serial line, 8-N-1. */
function baud(): ReactNode {
  const word = "curiosity";
  const cell = 13;
  const x0 = CX - (12 * cell) / 2;
  let d = "";
  [...word].forEach((ch, row) => {
    const code = ch.charCodeAt(0);
    // idle high, start bit low, eight data bits LSB first, stop bit high, idle
    const bits = [1, 0, ...Array.from({ length: 8 }, (_, i) => (code >> i) & 1), 1, 1];
    const hi = 32 + row * 22;
    const lo = hi + 11;
    let p = `M${n(x0)} ${bits[0] ? hi : lo}`;
    bits.forEach((b, i) => {
      const y = b ? hi : lo;
      p += `V${y}H${n(x0 + (i + 1) * cell)}`;
    });
    d += p;
  });
  return <path d={d} strokeLinejoin="miter" strokeLinecap="square" />;
}

/* 11. The Cyphernomicon: an eleven-pointed star in one unbroken line. */
function star(): ReactNode {
  const R = 82;
  const pts: Pt[] = [];
  for (let k = 0; k < 11; k++) {
    const a = -TAU / 4 + ((k * 5) % 11) * (TAU / 11);
    pts.push([CX + R * Math.cos(a), CY + R * Math.sin(a)]);
  }
  return (
    <>
      <path d={line(pts, true) + dot(CX, CY, 88) + dot(CX, CY, 91.5)} />
      <path d={dot(CX, CY, 2.6)} fill="currentColor" stroke="none" />
    </>
  );
}

/* 12. Meditations on Cypherpunk Nightmares: a Doric column, for the Stoics. */
function column(): ReactNode {
  let d = `M62 38H138V48H62Z` + `M66 48L76 60H124L134 48` + seg(76, 64, 124, 64) + seg(76, 67.5, 124, 67.5);
  for (let j = -3; j <= 3; j++) d += seg(CX + j * 8, 60, CX + j * 10, 198);
  d += `M34 198H166V205H34Z` + `M28 205H172V212H28Z` + `M22 212H178V219H22Z`;
  return <path d={d} strokeLinejoin="miter" />;
}

/* 13. The Beauty of eCash: the fractal Finney imagined on a banknote. */
function fractal(): ReactNode {
  const koch = (cx: number, cy: number, R: number, depth: number, flip: boolean) => {
    let pts: Pt[] = [];
    for (let k = 0; k < 3; k++) {
      const a = (flip ? TAU / 4 : -TAU / 4) + (k * TAU) / 3;
      pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
    }
    for (let dpt = 0; dpt < depth; dpt++) {
      const next: Pt[] = [];
      for (let i = 0; i < pts.length; i++) {
        const [ax, ay] = pts[i];
        const [bx, by] = pts[(i + 1) % pts.length];
        const dx = (bx - ax) / 3;
        const dy = (by - ay) / 3;
        const p1: Pt = [ax + dx, ay + dy];
        const p2: Pt = [ax + 2 * dx, ay + 2 * dy];
        // the peak: p1 + the middle third rotated -60 degrees (outward)
        const peak: Pt = [
          p1[0] + dx * 0.5 + dy * (Math.sqrt(3) / 2),
          p1[1] + dy * 0.5 - dx * (Math.sqrt(3) / 2),
        ];
        next.push([ax, ay], p1, peak, p2);
      }
      pts = next;
    }
    return line(pts, true);
  };
  return <path d={koch(CX, CY + 4, 74, 3, false) + koch(CX, CY + 4, 27, 2, true)} strokeLinejoin="miter" />;
}

/* 14. 21 Lessons: twenty-one blocks, chained. */
function blocks(): ReactNode {
  const size = 20;
  const xs = [56, 90, 124];
  let outline = "";
  let links = "";
  let last = "";
  for (let i = 0; i < 21; i++) {
    const row = Math.floor(i / 3);
    const col = row % 2 ? 2 - (i % 3) : i % 3;
    const x = xs[col];
    const y = 26 + row * 28;
    const box = `M${x} ${y}h${size}v${size}h${-size}Z`;
    if (i === 20) last = box;
    else outline += box;
    if (i < 20) {
      const sameRow = Math.floor((i + 1) / 3) === row;
      if (sameRow) {
        const dir = row % 2 ? -1 : 1;
        const edge = dir > 0 ? x + size : x;
        links += seg(edge, y + size / 2, edge + dir * 14, y + size / 2);
      } else {
        links += seg(x + size / 2, y + size, x + size / 2, y + size + 8);
      }
    }
  }
  return (
    <>
      <path d={outline + links} strokeLinejoin="miter" />
      <path d={last} fill="currentColor" strokeLinejoin="miter" />
    </>
  );
}

/* 15. A Lodging of Wayfaring Men: a route picked out between stars. */
function wayfare(): ReactNode {
  const rand = rng(1503);
  const stars: { x: number; y: number; s: number }[] = [];
  let guard = 0;
  while (stars.length < 15 && guard++ < 600) {
    const x = 24 + rand() * 152;
    const y = 30 + rand() * 180;
    if (stars.every((p) => Math.hypot(p.x - x, p.y - y) > 27))
      stars.push({ x, y, s: 2.2 + rand() * 3.4 });
  }
  let marks = "";
  for (const { x, y, s } of stars) marks += seg(x - s, y, x + s, y) + seg(x, y - s, x, y + s);
  const route = [...stars].sort((a, b) => b.y - a.y).filter((_, i) => i % 2 === 0);
  const end = route[route.length - 1];
  return (
    <>
      <path d={marks + dot(end.x, end.y, 9)} />
      <path d={line(route.map((p) => [p.x, p.y]))} strokeDasharray="0.1 5" strokeWidth={1.9} />
    </>
  );
}

/* 16. Fog of CryptoWar: signal, mostly lost. */
function fog(): ReactNode {
  const rand = rng(2017);
  let d = "";
  for (let i = 0; i < 19; i++) {
    const y = 30 + i * 10;
    const thick = 1 + 3.4 * Math.exp(-(((i - 9) / 3.4) ** 2));
    let x = rand() * 12 - 6;
    while (x < 198) {
      const len = (8 + rand() * 40) / Math.sqrt(thick);
      const end = Math.min(206, x + len);
      d += seg(x, y, end, y);
      x = end + (4 + rand() * 16) * thick;
    }
  }
  return <path d={d} />;
}

/* 17. Libertaria in Cyberspace: an archipelago with no capital. */
function islands(): ReactNode {
  const rand = rng(1992);
  const spots: [number, number, number][] = [
    [62, 60, 31],
    [142, 86, 24],
    [84, 136, 36],
    [152, 172, 27],
    [50, 198, 17],
  ];
  let d = "";
  for (const [cx, cy, R] of spots) {
    const amp = [2, 3, 4].map((k) => ({ k, a: 0.05 + rand() * 0.1, p: rand() * TAU }));
    for (const scale of [1, 0.66, 0.34]) {
      const pts: Pt[] = [];
      for (let i = 0; i < 60; i++) {
        const th = (i / 60) * TAU;
        const wob = amp.reduce((sum, w) => sum + w.a * Math.sin(w.k * th + w.p), 0);
        const r = R * scale * (1 + wob);
        pts.push([cx + r * Math.cos(th), cy + r * Math.sin(th)]);
      }
      d += line(pts, true);
    }
  }
  return <path d={d} />;
}

/* 18. Measuring Freenet in the Wild: a small-world ring with long shortcuts. */
function smallworld(): ReactNode {
  const rand = rng(2014);
  const N = 26;
  const R = 80;
  const at = (i: number): Pt => {
    const a = -TAU / 4 + (i / N) * TAU;
    return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
  };
  let edges = "";
  let nodes = "";
  for (let i = 0; i < N; i++) {
    const [x, y] = at(i);
    nodes += dot(x, y, 2.5);
    for (const hop of [1, 2]) {
      const [bx, by] = at((i + hop) % N);
      edges += seg(x, y, bx, by);
    }
  }
  for (let k = 0; k < 9; k++) {
    const a = Math.floor(rand() * N);
    const b = (a + 7 + Math.floor(rand() * 12)) % N;
    const [x, y] = at(a);
    const [bx, by] = at(b);
    edges += seg(x, y, bx, by);
  }
  return (
    <>
      <path d={edges} strokeWidth={0.95} />
      <path d={nodes} fill="currentColor" stroke="none" />
    </>
  );
}

/* 19. Ideal Money and Asymptotically Ideal Money: approaching, never reaching. */
function asymptote(): ReactNode {
  const ox = 28;
  const oy = 202;
  const top = 62;
  let curves = "";
  let ends = "";
  for (const k of [0.42, 0.8, 1.55]) {
    const pts: Pt[] = [];
    for (let i = 0; i <= 60; i++) {
      const u = (i / 60) * 5;
      pts.push([ox + (u / 5) * 152, oy - (oy - top) * (1 - Math.exp(-k * u))]);
    }
    curves += line(pts);
    const [ex, ey] = pts[pts.length - 1];
    ends += dot(ex, ey, 2.3);
  }
  const axes = `M${ox} 40V${oy}H186` + seg(ox - 4, top, ox, top);
  return (
    <>
      <path d={axes + curves} strokeLinejoin="miter" />
      <path d={seg(ox, top, 186, top)} strokeDasharray="4 5" />
      <path d={ends} fill="currentColor" stroke="none" />
    </>
  );
}

/* 20. Farewell to Westphalia: a map whose borders give out. */
function borders(): ReactNode {
  const rand = rng(1648);
  const cols = 7;
  const rows = 8;
  const grid: Pt[][] = [];
  for (let r = 0; r < rows; r++) {
    grid.push([]);
    for (let c = 0; c < cols; c++) {
      grid[r].push([
        -4 + c * (208 / (cols - 1)) + (rand() - 0.5) * 15,
        30 + r * (180 / (rows - 1)) + (rand() - 0.5) * 15,
      ]);
    }
  }
  const gone = (c: number) => rand() < Math.max(0, (c - 1.6) / 4.6) ** 1.25;
  let d = "";
  let towns = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const [x, y] = grid[r][c];
      if (c < cols - 1 && !gone(c + 0.5)) d += seg(x, y, grid[r][c + 1][0], grid[r][c + 1][1]);
      if (r < rows - 1 && !gone(c)) d += seg(x, y, grid[r + 1][c][0], grid[r + 1][c][1]);
      if (c >= 4) towns += dot(x, y, 1.5);
    }
  }
  return (
    <>
      <path d={d} />
      <path d={towns} fill="currentColor" stroke="none" />
    </>
  );
}

/* 21. Against Intellectual Property: the copyright mark, struck. */
function copy(): ReactNode {
  const a0 = (42 / 360) * TAU;
  const r = 33;
  const cArc = `M${n(CX + r * Math.cos(a0))} ${n(CY - r * Math.sin(a0))}A${r} ${r} 0 1 0 ${n(CX + r * Math.cos(a0))} ${n(CY + r * Math.sin(a0))}`;
  const k = Math.SQRT1_2 * 84;
  return (
    <>
      <path d={dot(CX, CY, 74) + dot(CX, CY, 68)} />
      <path d={cArc} strokeWidth={8} strokeLinecap="butt" />
      <path d={seg(CX - k, CY + k, CX + k, CY - k)} strokeWidth={4.5} strokeLinecap="butt" />
    </>
  );
}

/* Default binding: a plain double rule and a lozenge. */
function rule(): ReactNode {
  return <path d={`M44 112H156M44 128H156M100 104L108 120L100 136L92 120Z`} />;
}

const DRAW: Record<DeviceId, () => ReactNode> = {
  digest,
  wire,
  globe,
  guilloche,
  tree,
  watch,
  blind,
  envelope,
  comb,
  baud,
  star,
  column,
  fractal,
  blocks,
  wayfare,
  fog,
  islands,
  smallworld,
  asymptote,
  borders,
  copy,
  rule,
};

const cache = new Map<DeviceId, ReactNode>();

export default function Device({ id, className }: { id: DeviceId; className?: string }) {
  let art = cache.get(id);
  if (art === undefined) {
    art = DRAW[id]();
    cache.set(id, art);
  }
  return (
    <svg
      className={className}
      viewBox="0 0 200 240"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {art}
    </svg>
  );
}
