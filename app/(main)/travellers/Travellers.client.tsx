"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/lib/api/users/clientApi";
import TravellersList from "@/components/TravellersList/TravellersList";
import Loader from "@/components/Loader/Loader";
import css from "./Travellers.module.css";
import clsx from "clsx";
import PageTitle from "@/components/PageTitle/PageTitle";

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
    <section className={clsx(css.section, "container")}>
      <PageTitle align="center">Мандрівники</PageTitle>

      {status === "pending" && !isFetchingNextPage ? (
        <Loader />
      ) : (
        <div className={css.contentWrapper}>
          {hasUsers ? (
            <TravellersList
              users={users}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={!!hasNextPage}
            />
          ) : (
            <div className={css.empty}>Мандрівників поки не знайдено.</div>
          )}
        </div>
      )}
    </section>
  );
}
