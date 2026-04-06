import Button from "../Button/Button";
import css from "./Pagination.module.css";

interface Props {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

export default function Pagination({
  fetchNextPage,
  isFetchingNextPage,
}: Props) {
  return (
    <Button
      onClick={() => fetchNextPage()}
      isLoading={isFetchingNextPage}
      disabled={isFetchingNextPage}
      className={css.loadMore}
      variant="mantis"
    >
      Показати ще
    </Button>
  );
}
