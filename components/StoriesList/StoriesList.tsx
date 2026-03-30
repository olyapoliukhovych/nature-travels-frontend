"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

import type { Card } from "@/types/picture";
import PictureCard from "../StoriesCard/StoriesCard";
import css from "./StoriesList.module.css";
import AppLink from "../AppLink/AppLink";

type Prop = {
  stories: Card[];
};

export default function StoriesList({ stories }: Prop) {
  return (
    <section className={css.wrapper}>
      <div className={css.titleWrapper}>
        <h2>Популярні Статті</h2>
        <AppLink className={css.appLink} href={"#"} variant={"mantis"}>
          Всі статті
        </AppLink>
      </div>
      <Swiper
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
        }}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: ".stories-next",
          prevEl: ".stories-prev",
        }}
      >
        {stories.map((el) => (
          <SwiperSlide className={css.cardWrapper} key={el._id.$oid}>
            <PictureCard card={el} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.buttonWrapper}>
        <div className={`${css.prev} stories-prev`}>
          <Image
            alt={"backArrow"}
            width={24}
            height={24}
            src={"/arrow_back.svg"}
          />
        </div>
        <div className={`${css.next} stories-next`}>
          <Image
            alt={"forwardArrow"}
            width={24}
            height={24}
            src={"/arrow_forward.svg"}
          />
        </div>
      </div>
    </section>
  );
}
