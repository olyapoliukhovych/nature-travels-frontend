import Hero from "@/components/Hero/Hero";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import About from "@/components/About/About";
import PopularStories from "@/components/PopularStories/PopularStories";
import Join from "@/components/Join/Join";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Головна",
  description:
    "Природні Мандри — ваша платформа для екологічних подорожей Україною.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <PopularStories
        title="Популярні статті"
        linkLabel="Всі статті"
        linkHref="/stories"
        queryKeyName="stories-popular"
      />
      <About />
      <OurTravellers />
      <Join />
    </>
  );
}
