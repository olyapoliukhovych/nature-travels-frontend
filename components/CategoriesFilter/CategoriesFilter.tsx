"use client";

import { useMemo } from "react";
import css from "./CategoriesFilter.module.css";
import clsx from "clsx";
import { Category } from "@/types/category";
import AppSelect from "../AppSelect/AppSelect";

interface Props {
  categories: Category[];
  activeCategoryId: string;
  onClick: (id: string) => void;
}

export default function CategoriesFilter({
  categories,
  activeCategoryId,
  onClick,
}: Props) {
  const options = useMemo(
    () => [
      { value: "", label: "Всі статті" },
      ...categories.map((cat) => ({
        value: cat._id,
        label: cat.category,
      })),
    ],
    [categories],
  );

  const currentOption = useMemo(
    () => options.find((opt) => opt.value === activeCategoryId) || options[0],
    [options, activeCategoryId],
  );

  return (
    <>
      <div className={css.mobileOnly}>
        <label className={css.label} htmlFor="category-select-input">
          Категорії
        </label>
        <AppSelect
          instanceId="category-select"
          inputId="category-select-input"
          options={options}
          value={currentOption}
          onChange={(opt) => onClick(opt?.value || "")}
        />
      </div>

      <ul className={css.desktopOnly}>
        <li>
          <button
            type="button"
            className={clsx(css.btn, activeCategoryId === "" && css.active)}
            onClick={() => onClick("")}
          >
            Всі статті
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat._id}>
            <button
              type="button"
              className={clsx(
                css.btn,
                activeCategoryId === cat._id && css.active,
              )}
              onClick={() => onClick(cat._id)}
            >
              {cat.category}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
