"use client";

import { LIGHTS, currentLight, setLight } from "@/lib/surface";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./Nav.module.css";

// The light: the book's own colours, day, or night. One control that names the
// light you are in and steps to the next. The state is [data-light] on <html>
// (set before paint by the script in app/layout.tsx), so this keeps no React
// state: all three names are rendered and CSS shows the live one, which means no
// hydration mismatch and no flash of the wrong word.
export default function LightSwitch({ locale = "en" }: { locale?: Locale }) {
  const t = ui[locale].chrome;

  const step = () => {
    const now = currentLight();
    setLight(LIGHTS[(LIGHTS.indexOf(now) + 1) % LIGHTS.length]);
  };

  return (
    <button
      type="button"
      className={`label ${styles.light}`}
      onClick={step}
      title={t.lightHint}
    >
      {t.light}
      {t.colon}
      {LIGHTS.map((l) => (
        <span key={l} className={styles.lightName} data-for={l}>
          {t.lights[l]}
        </span>
      ))}
    </button>
  );
}
