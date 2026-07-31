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
import AnimatedText from "../AnimatedText/AnimatedText";
import { useInView } from "react-intersection-observer";
import TravellerCardSkeleton from "../TravellerCardSkeleton/TravellerCardSkeleton";
import { TRAVELLERS_PER_PAGE } from "@/constants/pagination";
import clsx from "clsx";

export default function OurTravellers() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["popular-travellers"],
    queryFn: () => getAllUsers({ page: 1, perPage: TRAVELLERS_PER_PAGE }),
    staleTime: 1000 * 60 * 2,
    enabled: inView,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const travellers = data?.users || [];
  const showSkeleton = !inView || isLoading;

  return (
    <section ref={ref} className={css.wrapper}>
      <div className={`container ${css.gridContainer}`}>
        <AnimatedText tag="h2" className={css.title}>
          Наші Мандрівники
        </AnimatedText>

        <AppLink className={css.appLink} href="/travellers" variant="mantis">
          Всі мандрівники
        </AppLink>

        <div className={css.sliderWrapper}>
          {showSkeleton ? (
            <div className={css.skeletonContainer}>
              {[...Array(4)].map((_, index) => (
                <div key={`skeleton-${index}`} className={css.slide}>
                  <TravellerCardSkeleton />
                </div>
              ))}
            </div>
          ) : travellers.length === 0 ? null : (
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
              slidesPerView="auto"
            >
              {travellers.map((el) => (
                <SwiperSlide key={el._id} className={css.slide}>
                  <TravellerCard user={el} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className={css.navigationWrapper}>
          {showSkeleton ? (
            <>
              <div className={clsx(css.skeletonNav, "skeletonBase")} />
              <div className={clsx(css.skeletonNav, "skeletonBase")} />
            </>
          ) : (
            <>
              <button className={css.prev} aria-label="Попередній мандрівник">
                <Icon id="icon-arrow_back" className={css.arrow} />
              </button>
              <button className={css.next} aria-label="Наступний мандрівник">
                <Icon id="icon-arrow_forward" className={css.arrow} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
