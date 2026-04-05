"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import StoryCard from "../StoryCard/StoryCard";
import css from "./PopularStories.module.css";
import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";
import { Story } from "@/types/stories";

type Prop = {
  stories: Story[];
};

export default function PopularStories({ stories }: Prop) {
  return (
    <section className={css.wrapper}>
      <div className="container">
        <div className={css.titleWrapper}>
          <h2>Популярні Статті</h2>
          <AppLink
            className={css.appLinkUp}
            href={"/stories"}
            variant={"mantis"}
          >
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
            <SwiperSlide className={css.cardWrapper} key={el._id}>
              <StoryCard story={el} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.buttonWrapper}>
          <button className={`${css.prev} stories-prev`}>
            <Icon id={"icon-arrow_back"} className={css.arrow} />
          </button>
          <button className={`${css.next} stories-next`}>
            <Icon id={"icon-arrow_forward"} className={css.arrow} />
          </button>
        </div>
        <AppLink
          className={css.appLinkDown}
          href={"/stories"}
          variant={"mantis"}
        >
          Всі статті
        </AppLink>
      </div>
    </section>
  );
}
