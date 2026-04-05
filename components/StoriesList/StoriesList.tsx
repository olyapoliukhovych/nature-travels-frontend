import { Story } from "@/types/stories";
import StoryCard from "../StoryCard/StoryCard";
import css from "./StoriesList.module.css";

interface Props {
  stories: Story[];
}

export default function StoriesList({ stories }: Props) {
  return (
    <ul className={css.list}>
      {stories.map((story) => (
        <li key={story._id} className={css.card}>
          <StoryCard story={story} />
        </li>
      ))}
    </ul>
  );
}
