"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";

import css from "./OurTravellers.module.css";
import AppLink from "../AppLink/AppLink";
import TravellerCard from "../TravellerCard/TravellerCard";
import { Icon } from "../Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/api/users/clientApi";

export default function OurTravellers() {
  const { data } = useQuery({
    queryKey: ["popular-travellers"],
    queryFn: () => getAllUsers({ page: 1, perPage: 12 }),
    refetchOnMount: false,
  });

  const travellers = data?.users || [];
  if (travellers.length === 0) return null;

  return (
    <section className={css.wrapper}>
      <div className={`container ${css.gridContainer}`}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <AppLink className={css.appLink} href="/travellers" variant="mantis">
          Всі мандрівники
        </AppLink>

        <div className={css.sliderWrapper}>
          <Swiper
            className={css.swiper}
            spaceBetween={24}
            modules={[Navigation, Grid]}
            observer={true}
            observeParents={true}
            navigation={{
              nextEl: `.${css.next}`,
              prevEl: `.${css.prev}`,
              disabledClass: css.disabled,
            }}
            loop={false}
            breakpoints={{
              320: {
                slidesPerView: 1,
                grid: { rows: 3, fill: "row" },
              },
              768: {
                slidesPerView: 2,
                grid: { rows: 2, fill: "row" },
              },
              1440: {
                slidesPerView: 4,
                grid: { rows: 1, fill: "row" },
              },
            }}
          >
            {travellers.map((el) => (
              <SwiperSlide className={css.cardWrapper} key={el._id}>
                <TravellerCard user={el} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={css.navigationWrapper}>
          <button className={css.prev}>
            <Icon id="icon-arrow_back" className={css.arrow} />
          </button>
          <button className={css.next}>
            <Icon id="icon-arrow_forward" className={css.arrow} />
          </button>
        </div>
      </div>
    </section>
  );
}
