import css from "./TravellerCard.module.css";
import AppLink from "../AppLink/AppLink";
import { Card } from "@/types/picture";

interface Props {
  card: Card;
}

export default function TravellerCard({ card }: Props) {
  return (
    <div className={css.card}>
      {/* <Image src={"#"} width={130} height={130} alt={"user"} /> */}
      <div className={css.userInfo}>
        <h3>Name</h3>
        <p>Статей:</p>
      </div>
      <AppLink href={"#"} variant="neutral" className={css.userButton}>
        Переглянути профіль
      </AppLink>
    </div>
  );
}
