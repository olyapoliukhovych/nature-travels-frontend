import AnimatedText from "../AnimatedText/AnimatedText";
import css from "./About.module.css";
import { getImageProps } from "next/image";
import { clsx } from "clsx";

const common = {
  alt: "forest",
};

const mobile = getImageProps({
  src: "/aboutIMG/about_mobile.webp",
  width: 335,
  height: 410,
  ...common,
});

const tablet = getImageProps({
  src: "/aboutIMG/about_tablet.webp",
  width: 704,
  height: 410,
  ...common,
});

const desktop = getImageProps({
  src: "/aboutIMG/about_desktop.webp",
  width: 644,
  height: 686,
  ...common,
});

export default function About() {
  const alt = common.alt;

  return (
    <section className={css.aboutSection}>
      <div className={clsx(css.aboutMainContainer, "container")}>
        <div className={css.aboutMainTextWrapper}>
          <AnimatedText tag="h3" className={css.aboutTitle}>
            Мандруй екологічно та відкривай нові горизонти
          </AnimatedText>
          <AnimatedText tag="p" className={css.aboutText}>
            Наш проєкт створений для тих, хто хоче досліджувати Україну
            відповідально. Ми допоможемо знайти унікальні маршрути, які
            поєднують красу природи, локальну культуру та принципи сталого
            туризму.
          </AnimatedText>
          <div className={css.aboutSubTextWrapper}>
            <div className={css.helperWrapper}>
              <AnimatedText tag="h3" className={css.aboutSubTitle}>
                Еко-маршрути по Україні
              </AnimatedText>
              <AnimatedText tag="p" className={css.aboutSubText}>
                Від Карпат до Чорного моря — добірка локацій, де можна
                подорожувати без шкоди для довкілля.
              </AnimatedText>
            </div>
            <div className={css.helperWrapper}>
              <AnimatedText tag="h3" className={css.aboutSubTitle}>
                Практичні екологічні поради
              </AnimatedText>
              <AnimatedText tag="p" className={css.aboutSubText}>
                Дізнайся, як зменшити свій екологічний слід під час мандрів та
                зробити подорож комфортною й свідомою.
              </AnimatedText>
            </div>
          </div>
        </div>
        <div className={css.aboutImgWrapper}>
          <picture>
            <source media="(min-width: 1440px)" srcSet={desktop.props.srcSet} />
            <source media="(min-width: 768px)" srcSet={tablet.props.srcSet} />
            <img
              src={mobile.props.src}
              srcSet={mobile.props.srcSet}
              width={mobile.props.width}
              height={mobile.props.height}
              alt={alt}
              className={css.aboutImg}
              loading="lazy"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
