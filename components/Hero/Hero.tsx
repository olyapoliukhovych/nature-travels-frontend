"use client";

import css from "./Hero.module.css";
import { getImageProps } from "next/image";
import AppLink from "../AppLink/AppLink";
import AnimatedText from "../AnimatedText/AnimatedText";

const common = {
  alt: "forest and mountains",
  priority: true,
};

const mobile = getImageProps({
  src: "/heroIMG/hero_mobile.webp",
  width: 335,
  height: 469,
  ...common,
});

const tablet = getImageProps({
  src: "/heroIMG/hero_tablet.webp",
  width: 704,
  height: 469,
  ...common,
});

const desktop = getImageProps({
  src: "/heroIMG/hero_desktop.webp",
  width: 644,
  height: 580,
  ...common,
});

export default function Hero() {
  const alt = common.alt;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#join")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={css.heroSection}>
      <div className="container">
        <div className={css.heroWrapper}>
          <div className={css.imageWrapper}>
            <picture>
              <source
                media="(min-width: 1200px)"
                srcSet={desktop.props.srcSet}
              />
              <source media="(min-width: 565px)" srcSet={tablet.props.srcSet} />
              <img
                src={mobile.props.src}
                srcSet={mobile.props.srcSet}
                width={mobile.props.width}
                height={mobile.props.height}
                alt={alt}
                className={css.heroImg}
                fetchPriority="high"
                decoding="async"
              />
            </picture>
          </div>
          <div className={css.textWrapper}>
            <AnimatedText className={css.title}>
              Відкрий Україну заново — еко-мандри для натхнення
            </AnimatedText>
            <AnimatedText tag="p" className={css.heroText}>
              Подорожуй екологічно, відкривай заповідні місця, гори та річки
              України. Ми зібрали маршрути, які допоможуть побачити красу
              природи без шкоди для неї.
            </AnimatedText>
            <AppLink
              href="#join"
              onClick={handleAnchorClick}
              className={css.heroLink}
            >
              Доєднатись до мандрів
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
