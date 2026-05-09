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
import AnimatedText from "../AnimatedText/AnimatedText";

type Props = {
  title?: string;
  linkLabel?: string;
  linkHref?: string;
  categoryId?: string;
  queryKeyName?: string;
  currentStoryId?: string;
  withContainer?: boolean;
};

export default function PopularStories({
  title,
  linkLabel,
  linkHref,
  categoryId = "",
  queryKeyName,
  currentStoryId,
  withContainer = true,
}: Props) {
  const { data } = useQuery({
    queryKey: [queryKeyName, categoryId],
    queryFn: () =>
      getAllStories({
        page: 1,
        perPage: 10,
        ...(categoryId ? { categoryId } : {}),
      }),
    refetchOnMount: false,
  });

  const stories =
    data?.stories.filter((story) => story._id !== currentStoryId) || [];

  if (stories.length === 0) return null;

  return (
    <section className={css.wrapper}>
      <div
        className={`${withContainer ? "container" : ""} ${css.gridContainer}`}
      >
        {title && (
          <AnimatedText tag="h2" className={css.title}>
            {title}
          </AnimatedText>
        )}

        {linkLabel && linkHref && (
          <AppLink className={css.appLink} href={linkHref} variant="mantis">
            {linkLabel}
          </AppLink>
        )}

        <div className={css.sliderWrapper}>
          <Swiper
            spaceBetween={24}
            modules={[Navigation]}
            observer={true}
            observeParents={true}
            navigation={{
              nextEl: `.${css.next}`,
              prevEl: `.${css.prev}`,
              disabledClass: css.disabled,
            }}
            loop={false}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
          >
            {stories.map((el, index) => (
              <SwiperSlide key={el._id}>
                <StoryCard story={el} priority={index < 2} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={css.navigationWrapper}>
          <button className={css.prev} aria-label="Попередня історія">
            <Icon id="icon-arrow_back" className={css.arrow} />
          </button>
          <button className={css.next} aria-label="Наступна історія">
            <Icon id="icon-arrow_forward" className={css.arrow} />
          </button>
        </div>
      </div>
    </section>
  );
}
