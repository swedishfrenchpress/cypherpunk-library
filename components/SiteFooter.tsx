import styles from "./SiteFooter.module.css";

// The last line of every page: how to reach the librarian. Rendered once in the
// root layout. One quiet line in the book face, no rule above it.
export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <a href="mailto:info@cypherpunklibrary.com">info@cypherpunklibrary.com</a>
    </footer>
  );
}
