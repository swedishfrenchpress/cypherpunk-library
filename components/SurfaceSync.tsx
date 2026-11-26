"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { wear } from "@/lib/surface";

// Keeps the page dressed across client-side navigations. Arriving on a book
// page puts that book in hand; every other route keeps whatever was last in
// hand (so the index wears the book you just came from), and the landing's shelf
// writes its own focus as you turn it. Renders nothing.
export default function SurfaceSync({
  pairs,
}: {
  pairs: Record<string, [string, string]>;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/\/book\/([^/]+)/);
    if (!match) return;
    const slug = decodeURIComponent(match[1]);
    const pair = pairs[slug];
    if (pair) wear(slug, pair[0], pair[1]);
  }, [pathname, pairs]);

  return null;
}
