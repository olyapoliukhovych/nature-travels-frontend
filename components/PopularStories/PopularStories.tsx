"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import StoryCard from "../StoryCard/StoryCard";
import css from "./PopularStories.module.css";
import AppLink from "../AppLink/AppLink";
import { Icon } from "../Icon/Icon";
import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "@/lib/api/stories/clientApi";

export default function PopularStories() {
  const { data } = useQuery({
    queryKey: ["popular-stories"],
    queryFn: () => getAllStories({ page: 1, perPage: 10 }),
    refetchOnMount: false,
  });

  const stories = data?.stories || [];
  if (stories.length === 0) return null;

  return (
    <section className={css.wrapper}>
      <div className={`container ${css.gridContainer}`}>
        <h2 className={css.title}>Популярні Статті</h2>

        <AppLink className={css.appLink} href="/stories" variant="mantis">
          Всі статті
        </AppLink>

        <div className={css.sliderWrapper}>
          <Swiper
            spaceBetween={24}
            modules={[Navigation]}
            observer={true}
            observeParents={true}
            navigation={{
              nextEl: `.${css.next}`,
              prevEl: `.${css.prev}`,
            }}
            loop={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
          >
            {stories.map((el) => (
              <SwiperSlide key={el._id}>
                <StoryCard story={el} />
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
