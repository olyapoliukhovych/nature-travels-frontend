"use client";

import { Icon } from "../Icon/Icon";
import css from "./ThemeToggleButton.module.css";
import { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider/ThemeProvider";

export function ThemeToggleButton() {
  const { theme, setTheme, actualTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = (theme === "system" ? actualTheme : theme) === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <button className={css.toggle} aria-label="Завантаження теми">
        <Icon id="icon-moon" className={css.icon} />
      </button>
    );
  }

  const label = isDark
    ? "Перемкнути на світлу тему"
    : "Перемкнути на темну тему";

  return (
    <button
      className={css.toggle}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Icon id={isDark ? "icon-sun" : "icon-moon"} className={css.icon} />
    </button>
  );
}
