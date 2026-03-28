"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import type { Card } from "@/types/picture";
import PictureCard from "../pictureCard/pictureCard";
import css from "./pictureList.module.css";

type Prop = {
  prop: Card[];
};

export default function PictureList({ prop }: Prop) {
  return (
    <section className={css.wrapper}>
      <Swiper
        spaceBetween={24}
        breakpoints={{
    320: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  }}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
      >
        {prop.map((el) => (
          <SwiperSlide className={css.cardWrapper} key={el._id.$oid}>
            <PictureCard card={el} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.buttonWrapper}>
        <div className={`${css.prev} prev`}>←</div>
        <div className={`${css.next} next`}>→</div>
      </div>
    </section>
  );
}
