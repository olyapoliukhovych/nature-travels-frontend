"use client";

import { useState } from "react";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getAllStories } from "@/lib/api/stories/clientApi";
import { getCategories } from "@/lib/api/category/clientApi";
import css from "./Stories.module.css";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import Loader from "@/components/Loader/Loader";
import clsx from "clsx";
import CategoriesFilter from "@/components/CategoriesFilter/CategoriesFilter";
import PageTitle from "@/components/PageTitle/PageTitle";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import { INITIAL_PAGE, STORIES_PER_PAGE } from "@/constants/pagination";

export default function StoriesClient() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const {
    data: categories = [],
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isError: isStoriesError,
    refetch: refetchStories,
  } = useInfiniteQuery({
    queryKey: ["stories", selectedCategoryId],
    queryFn: ({ pageParam = INITIAL_PAGE }) =>
      getAllStories({
        page: pageParam as number,
        perPage: STORIES_PER_PAGE,
        categoryId: selectedCategoryId || undefined,
      }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.stories),
  });

  const stories = data || [];
  const hasStories = stories.length > 0;

  const handleCategoryChange = (category: string) => {
    setSelectedCategoryId(category);
  };

  return (
    <section className={clsx(css.section, "container")}>
      <PageTitle align="center">Статті</PageTitle>
      {isStoriesError || isCategoriesError ? (
        <div className={css.messageWrapper}>
          <MessageNoStories
            text="Не вдалося завантажити дані. Перевірте підключення до інтернету."
            buttonText="Спробувати ще раз"
            onClick={() => {
              if (isCategoriesError) refetchCategories();
              refetchStories();
            }}
          />
        </div>
      ) : (
        <>
          <CategoriesFilter
            categories={categories}
            activeCategoryId={selectedCategoryId}
            onClick={handleCategoryChange}
          />

          {status === "pending" && !isFetchingNextPage ? (
            <Loader size="md" />
          ) : (
            <div className={css.contentWrapper}>
              {hasStories ? (
                <TravellersStories
                  stories={stories}
                  fetchNextPage={fetchNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                  hasNextPage={!!hasNextPage}
                />
              ) : (
                <MessageNoStories
                  text="У цій категорії ще немає опублікованих історій."
                  buttonText="Всі категорії"
                  onClick={() => setSelectedCategoryId("")}
                />
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
