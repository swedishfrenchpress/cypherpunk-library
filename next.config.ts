import { networkInterfaces } from "node:os";
import type { NextConfig } from "next";

// Opening the dev server from a phone means opening it by this machine's
// address on the local network, and `next dev` refuses its own dev resources to
// any host but localhost unless that host is named here. Refused, the page
// still arrives but never comes alive: no taps, no swipes. So name whatever
// addresses this machine has on the network when the server starts (and its
// .local name), rather than writing one machine's address into the repo.
// Development only: `next build` and production ignore it.
const lan = Object.values(networkInterfaces())
  .flat()
  .filter((n) => n?.family === "IPv4" && !n.internal)
  .map((n) => n!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: [...lan, "*.local"],
  // Pin the workspace root to this project (a stray lockfile in $HOME would
  // otherwise make Next infer the wrong root).
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
