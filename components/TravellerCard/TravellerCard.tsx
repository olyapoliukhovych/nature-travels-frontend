import css from "./TravellerCard.module.css";
import AppLink from "../AppLink/AppLink";
// import { Card } from "@/types/picture";
import { User } from "@/types/types";
import Image from "next/image";

interface Props {
  card: User;
}

export default function TravellerCard({ card }: Props) {
  return (
    <div className={css.card}>
      <div className={css.pictureWrapper}>
        <Image
          className={css.picture}
          src={card.avatarUrl}
          width={130}
          height={130}
          alt={"user"}
        />
      </div>
      <div className={css.infoWrappper}>
        <div className={css.userInfo}>
          <h3 className={css.userName}>{card.name}</h3>
          <p>Статей: {card.articlesAmount}</p>
        </div>
        <AppLink href={"#"} variant="neutral" className={css.userButton}>
          Переглянути профіль
        </AppLink>
      </div>
    </div>
  );
}
