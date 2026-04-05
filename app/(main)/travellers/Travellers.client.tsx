"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/api/users/clientApi";
import TravellersList from "@/components/TravellersList/TravellersList";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import css from "./Travellers.module.css";

const INITIAL_PAGE = 1;
const PER_PAGE = 12;

export default function TravellersClient() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["users", PER_PAGE],
      queryFn: ({ pageParam = INITIAL_PAGE }) =>
        getAllUsers({
          page: pageParam as number,
          perPage: PER_PAGE,
        }),
      initialPageParam: INITIAL_PAGE,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
      select: (data) => data.pages.flatMap((page) => page.users),
    });

  const users = data || [];
  const hasUsers = users.length > 0;

  return (
    <section className={css.section}>
      <h1 className={css.title}>Мандрівники</h1>

      {status === "pending" && !isFetchingNextPage ? (
        <Loader />
      ) : (
        <div className={css.contentWrapper}>
          {hasUsers ? (
            <TravellersList users={users} />
          ) : (
            <div className={css.empty}>Мандрівників поки не знайдено.</div>
          )}
        </div>
      )}

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={isFetchingNextPage}
          className={css.loadMore}
          variant="mantis"
        >
          Показати ще
        </Button>
      )}
    </section>
  );
}
