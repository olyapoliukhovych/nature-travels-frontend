"use client";

import { useMemo } from "react";
import css from "./CategoriesFilter.module.css";
import clsx from "clsx";
import { Category } from "@/types/category";
import AppSelect from "../AppSelect/AppSelect";
import Button from "../Button/Button";

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
    categories && (
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
          {options.map((cat) => (
            <li key={cat.value}>
              <Button
                type="button"
                variant="neutral"
                className={clsx(
                  css.btn,
                  activeCategoryId === cat.value && css.active,
                )}
                onClick={() => onClick(cat.value)}
              >
                {cat.label}
              </Button>
            </li>
          ))}
        </ul>
      </>
    )
  );
}
