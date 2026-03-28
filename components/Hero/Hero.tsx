import css from "./Hero.module.css";
import { getImageProps } from "next/image";
import Link from "next/link";

const common = {
  alt: "forest and mountains",
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

  return (
    <section className={css.heroSection}>
      <div className={`container ${css.heroWrapper}`}>
        <div className={css.imageWrapper}>
          <picture>
            <source media="(min-width: 1440px)" srcSet={desktop.props.srcSet} />
            <source media="(min-width: 768px)" srcSet={tablet.props.srcSet} />
            <img {...mobile.props} alt={alt} className={css.heroImg} />
          </picture>
        </div>
        <div className={css.textWrapper}>
          <h1 className={css.heroTitle}>
            Відкрий Україну заново — еко-мандри для натхнення
          </h1>
          <p className={css.heroText}>
            Подорожуй екологічно, відкривай заповідні місця, гори та річки
            України. Ми зібрали маршрути, які допоможуть побачити красу природи
            без шкоди для неї.
          </p>
          <Link href="/" className={css.heroLink}>
            Доєднатись до мандрів
          </Link>
        </div>
      </div>
    </section>
  );
}
