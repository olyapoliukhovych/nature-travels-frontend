import Image from "next/image";
import css from "./pictureCard.module.css";
import type { Card } from "@/types/picture";

interface Props {
  card: Card;
}

export default function PictureCard({ card }: Props) {
  return (
    <>
      <Image
        className={css.picture}
        alt={card.title}
        src={card.img}
        width={340}
        height={340}
      />

      <div className={css.titleWrapper}>
        <p>{"card.title"}</p>
        <span className={css.point}>.</span>
        <span>
          {card.rate}
          <Image height={16} width={16} src={"/bookmark.svg"} alt={"Save"} />
        </span>
      </div>

      <h3>{card.title}</h3>
    </>
  );
}
