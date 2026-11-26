import Link from "next/link";
import styles from "./Nav.module.css";

// The wordmark: one line of Alpha Lyrae, linking home. It is static. The face
// carries glitch alternates in its OpenType features; they are switched off
// (see .logo), and nothing here animates or answers the pointer.
export default function Wordmark() {
  return (
    <Link href="/" aria-label="The Cypherpunk Library, home" className={styles.logo}>
      Cypherpunk Library
    </Link>
  );
}
