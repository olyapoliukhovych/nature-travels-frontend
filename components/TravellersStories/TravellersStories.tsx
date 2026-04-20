import { Story } from "@/types/stories";
import StoryCard from "../StoryCard/StoryCard";
import css from "./TravellersStories.module.css";
import Pagination from "../Pagination/Pagination";
import { motion } from "framer-motion";

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
          <motion.li
            layout
            key={story._id}
            className={css.card}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <StoryCard story={story} />
          </motion.li>
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
