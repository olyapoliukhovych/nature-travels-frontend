"use client";

import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getAllStories } from "@/lib/api/stories/clientApi";
import { getCategories } from "@/lib/api/category/clientApi";
import StoriesCategories from "@/components/StoriesCategories/StoriesCategories";
import Button from "@/components/Button/Button";
import css from "./Stories.module.css";
import StoriesList from "@/components/StoriesList/StoriesList";
import Loader from "@/components/Loader/Loader";

const INITIAL_PAGE = 1;

export default function StoriesClient() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [perPage, setPerPage] = useState(9);

  useEffect(() => {
    const handleResize = () => {
      const isMobileOrTablet = window.innerWidth < 1439;
      setPerPage(isMobileOrTablet ? 8 : 9);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["stories", selectedCategoryId, perPage],
      queryFn: ({ pageParam = INITIAL_PAGE }) =>
        getAllStories({
          page: pageParam as number,
          perPage: perPage,
          category: selectedCategoryId || undefined,
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
    <section className={css.section}>
      <h1 className={css.title}>Статті</h1>
      <StoriesCategories
        categories={categories}
        activeCategoryId={selectedCategoryId}
        onClick={handleCategoryChange}
      />

      {status === "pending" && !isFetchingNextPage ? (
        <Loader />
      ) : (
        <div className={css.contentWrapper}>
          {hasStories ? (
            <StoriesList stories={stories} />
          ) : (
            <div className={css.empty}>No stories found in this category.</div>
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
