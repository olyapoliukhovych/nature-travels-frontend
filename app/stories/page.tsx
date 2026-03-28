import StoriesCategories from "@/components/StoriesCategories/StoriesCategories";
import StoriesList from "@/components/StoriesList/StoriesList";
<<<<<<< HEAD
import { getAllStories } from "@/lib/api/clientApi";

export default async function Stories() {
  const { stories } = await getAllStories();
=======

export default function Stories() {
>>>>>>> cfbe94d (Add basic structure to /stories)
  return (
    <div>
      <h1>Статті</h1>
      <StoriesCategories />
<<<<<<< HEAD
      <StoriesList stories={stories} />
=======
      <StoriesList />
>>>>>>> cfbe94d (Add basic structure to /stories)
    </div>
  );
}
