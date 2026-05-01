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

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(actualTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const getIcon = () => {
    if (theme === "system") {
      if (!mounted) {
        return "icon-moon";
      }
      return actualTheme === "dark" ? "icon-sun" : "icon-moon";
    }
    return theme === "dark" ? "icon-sun" : "icon-moon";
  };

  const getLabel = () => {
    if (theme === "system") {
      if (!mounted) {
        return "Змінити тему";
      }
      return actualTheme === "dark"
        ? "Перемкнути на світлу тему"
        : "Перемкнути на темну тему";
    }
    return theme === "dark"
      ? "Перемкнути на світлу тему"
      : "Перемкнути на темну тему";
  };

  const label = getLabel();

  return (
    <button
      className={css.toggle}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <Icon id={getIcon()} className={css.icon} />
    </button>
  );
}
