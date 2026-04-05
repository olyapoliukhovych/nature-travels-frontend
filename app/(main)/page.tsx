import Hero from "@/components/Hero/Hero";
// import styles from "./page.module.css";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import About from "@/components/About/About";
import PopularStories from "@/components/PopularStories/PopularStories";
import Join from "@/components/Join/Join";
import { getAllStories } from "@/lib/api/stories/clientApi";
import { getAllUsers } from "@/lib/api/users/clientApi";

export default async function Home() {
  const d = await getAllStories({ page: 1, perPage: 10 });
  const s = await getAllUsers({ page: 1, perPage: 12 });

  return (
    <>
      <Hero />
      <PopularStories stories={d.stories} />
      <About />
      <OurTravellers travellers={s.users} />
      <Join />
    </>
  );
}
