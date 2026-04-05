import { Story } from "@/types/stories";
import StoryCard from "../StoryCard/StoryCard";
import css from "./TravellersStories.module.css";
import Pagination from "../Pagination/Pagination";

interface Props {
  stories: Story[];
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export default function TravellersStories({
  stories,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: Props) {
  return (
    <div className={css.container}>
      <ul className={css.list}>
        {stories.map((story) => (
          <li key={story._id} className={css.card}>
            <StoryCard story={story} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Pagination
          fetchNextPage={() => fetchNextPage()}
          isFetchingNextPage={isFetchingNextPage}
        />
      )}
    </div>
  );
}
