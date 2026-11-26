import Link from "next/link";
import styles from "./Nav.module.css";

// The wordmark: two lines of Alpha Lyrae, set tight, linking home. It is
// static. The face carries glitch alternates in its OpenType features; they are
// switched off (see .logo), and nothing here animates or answers the pointer.
export default function Wordmark() {
  return (
    <Link href="/" aria-label="The Cypherpunk Library, home" className={styles.logo}>
      <span className={styles.logoLine}>Cypherpunk</span>
      <span className={styles.logoLine}>Library</span>
    </Link>
  );
}
