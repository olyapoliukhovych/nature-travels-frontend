'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

import type { Card } from "@/types/picture";
import css from "./UserListMain.module.css";
import AppLink from "../AppLink/AppLink";
import UserCard from "../UserCard/UserCard";

type Prop = {
  prop: Card[];
};

export default function UserListMain({ prop }: Prop) {
  return (
    <section className={css.wrapper}>
      <div className={css.titleWrapper}>
        <h2>Наші манрівники</h2>
        <AppLink className={css.appLink} href={"#"} variant={"mantis"}>
          Всі манрівники
        </AppLink>
      </div>
      <Swiper
        spaceBetween={24}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        loop={true}
        modules={[Navigation]}
        navigation={{
          nextEl: ".user-next",
          prevEl: ".user-prev",
        }}
      >
        {prop.map((el) => (
          <SwiperSlide className={css.cardWrapper} key={el._id.$oid}>
            <UserCard card={el} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.buttonWrapper}>
        <div className={`${css.prev} user-prev`}>
          <Image
            alt={"backArrow"}
            width={24}
            height={24}
            src={"/arrow_back.svg"}
          />
        </div>
        <div className={`${css.next} user-next`}>
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
