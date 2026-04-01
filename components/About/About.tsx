import css from "./About.module.css";
import { getImageProps } from "next/image";

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
      <div className={css.aboutMainContainer}>
        <div className={css.aboutMainTextWrapper}>
          <h2 className={css.aboutTitle}>
            Мандруй екологічно та відкривай нові горизонти
          </h2>
          <p className={css.aboutText}>
            Наш проєкт створений для тих, хто хоче досліджувати Україну
            відповідально. Ми допоможемо знайти унікальні маршрути, які
            поєднують красу природи, локальну культуру та принципи сталого
            туризму.
          </p>
          <div className={css.aboutSubTextWrapper}>
            <div className={css.helperWrapper}>
              <h3 className={css.aboutSubTitle}>Еко-маршрути по Україні</h3>
              <p className={css.aboutSubText}>
                Від Карпат до Чорного моря — добірка локацій, де можна
                подорожувати без шкоди для довкілля.
              </p>
            </div>
            <div className={css.helperWrapper}>
              <h3 className={css.aboutSubTitle}>Практичні екологічні поради</h3>
              <p className={css.aboutSubText}>
                Дізнайся, як зменшити свій екологічний слід під час мандрів, та
                зробити подорож комфортною й свідомою.
              </p>
            </div>
          </div>
        </div>
        <div className={css.aboutImgWrapper}>
          <picture>
            <source media="(min-width: 1440px)" srcSet={desktop.props.srcSet} />
            <source media="(min-width: 768px)" srcSet={tablet.props.srcSet} />
            <img {...mobile.props} alt={alt} className={css.aboutImg} />
          </picture>
        </div>
      </div>
    </section>
  );
}
