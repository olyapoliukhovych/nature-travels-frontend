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

// type Prop = {
//   prop: Card[];
// };


export default function OurTravellers() {
  const data = [
    {
      _id: {
        $oid: "6881563901add19ee16fd011",
      },
      name: "Богдан Коваль",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd011.webp",
      articlesAmount: 27,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd002",
      },
      name: "Олександра Ткаченко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd002.webp",
      articlesAmount: 6,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd014",
      },
      name: "Андрій Коваленко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd014.webp",
      articlesAmount: 3,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffa",
      },
      name: "Іван Ковальчук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffa.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd003",
      },
      name: "Дарина Лисенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd003.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffb",
      },
      name: "Дарина Ковальчук",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffb.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffc",
      },
      name: "Поліна Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffc.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd013",
      },
      name: "Поліна Романенко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd013.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fcffe",
      },
      name: "Владислав Гриценко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fcffe.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
    {
      _id: {
        $oid: "6881563901add19ee16fd005",
      },
      name: "Катерина Іваненко",
      avatarUrl:
        "https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd005.webp",
      articlesAmount: 1,
      savedArticles: [],
    },
  ];
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
                slidesPerView: 3,
                direction: "vertical",
              },
              768: {
                slidesPerView: 2,
                grid: {
                  rows: 2,
                },
                // slidesPerView: 4,
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
            {data.map((el) => (
              <SwiperSlide className={css.cardWrapper} key={el._id.$oid}>
                <TravellerCard card={el} />
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
