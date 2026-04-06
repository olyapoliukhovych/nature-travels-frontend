import Button from "../Button/Button";
import css from "./StoryDetails.module.css";

export default function SaveStorySection() {
  return (
    <div className={css.saveStoryWrapper}>
      <h3 className={css.title}>Збережіть собі історію</h3>
      <p className={css.text}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>
      <Button className={css.saveButton}>Зберегти</Button>
    </div>
  );
}
