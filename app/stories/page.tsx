import StoriesCategories from "@/components/StoriesCategories/StoriesCategories";
import StoriesList from "@/components/StoriesList/StoriesList";

export default function Stories() {
  return (
    <div>
      <h1>Статті</h1>
      <StoriesCategories />
      <StoriesList />
    </div>
  );
}
