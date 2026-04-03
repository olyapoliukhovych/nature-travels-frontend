import AppLink from "../AppLink/AppLink";
import css from "./Join.module.css";

export default function Join() {
  return (
    <section className={css.joinSection} id="join">
      <div className="container">
        <div className={css.bgCard}>
          <div className={css.content}>
            <h3 className={css.title}>
              Приєднуйся до спільноти свідомих мандрівників
            </h3>

            <p className={css.text}>
              Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
              внеском у збереження природи. Тут ти знайдеш однодумців, поради
              для сталих мандрів та натхнення для нових маршрутів Україною.
            </p>

            <AppLink
              href="/auth/register"
              variant="mantis"
              className={css.button}
            >
              Зареєструватися
            </AppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
