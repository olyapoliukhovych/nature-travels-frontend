import { Story } from "@/types/types";
import StoryCard from "../StoryCard/StoryCard";
import css from "./StoriesList.module.css";

interface Props {
  stories: Story[];
}

export default function StoriesList({ stories }: Props) {
  return (
    <ul className={css.list}>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </ul>
  );
}
