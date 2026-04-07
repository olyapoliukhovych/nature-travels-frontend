"use client";

import { useEffect, useState } from "react";
import { Icon } from "../Icon/Icon";
import css from "./ScrollToTopBtn.module.css";

export default function ScrollToTopBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 900);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button className={css.button} onClick={scrollToTop} aria-label="Вгору">
      <Icon id="icon-arrow_back" className={css.icon} />
    </button>
  );
}
