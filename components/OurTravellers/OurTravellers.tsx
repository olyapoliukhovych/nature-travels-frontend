"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

// import type { Card } from "@/types/picture";
import css from "./OurTravellers.module.css";
import AppLink from "../AppLink/AppLink";
import TravellerCard from "../TravellerCard/TravellerCard";
import { Icon } from "../Icon/Icon";
import { User } from "@/types/user";

interface Props {
  travellers: User[];
}

export default function OurTravellers({ travellers }: Props) {
  console.log(travellers);
  return (
    <section className={css.wrapper}>
      <div className="container">
        <div className={css.titleWrapper}>
          <h2 className={css.title}>Наші Мандрівники</h2>
          <AppLink className={css.appLinkUp} href={"#"} variant={"mantis"}>
            Всі мандрівники
          </AppLink>
        </div>
        <div className={css.swiperContainer}>
          <Swiper
            className={css.swiper}
            spaceBetween={24}
            breakpoints={{
              320: {
                slidesPerView: 1,
                grid: {
                  rows: 3,
                },
              },
              768: {
                slidesPerView: 2,
                grid: {
                  rows: 2,
                },
              },
              1440: {
                slidesPerView: 4,
                grid: {
                  rows: 1,
                },
              },
            }}
            loop={true}
            modules={[Navigation, Grid]}
            navigation={{
              nextEl: ".user-next",
              prevEl: ".user-prev",
            }}
          >
            {travellers.map((el) => (
              <SwiperSlide className={css.cardWrapper} key={el._id}>
                <TravellerCard user={el} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className={css.buttonWrapper}>
          <button className={`${css.prev} user-prev`}>
            <Icon id={"icon-arrow_back"} className={css.arrow} />
          </button>
          <button className={`${css.next} user-next`}>
            <Icon id={"icon-arrow_forward"} className={css.arrow} />
          </button>
        </div>
        <AppLink className={css.appLinkDown} href={"#"} variant={"mantis"}>
          Всі мандрівники
        </AppLink>
      </div>
    </section>
  );
}
