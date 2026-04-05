"use client";

import { useMemo } from "react";
import Select, {
  StylesConfig,
  GroupBase,
  components,
  DropdownIndicatorProps,
} from "react-select";
import css from "./StoriesCategories.module.css";
import { Icon } from "../Icon/Icon";
import clsx from "clsx";
import { Category } from "@/types/category";

interface Option {
  value: string;
  label: string;
}

interface Props {
  categories: Category[];
  activeCategoryId: string;
  onClick: (id: string) => void;
}

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <Icon
        id="icon-keyboard_arrow_down"
        style={{
          width: "24px",
          height: "24px",
          display: "block",
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform var(--transition)",
        }}
      />
    </components.DropdownIndicator>
  );
};

export default function StoriesCategories({
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

  const currentOption =
    options.find((opt) => opt.value === activeCategoryId) || options[0];

  const customStyles = useMemo(() => {
    return {
      control: (base, state) => ({
        ...base,
        width: "100%",
        height: "40px",
        minHeight: "40px",
        backgroundColor: "var(--opacity-transparent)",
        borderRadius: state.menuIsOpen ? "6px 6px 0 0" : "6px",
        border:
          state.isFocused || state.menuIsOpen
            ? "1px solid var(--color-scheme-1-accent)"
            : "1px solid var(--opacity-neutral-darkest-15)",
        boxShadow: "none",
        padding: "0 8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "border-color var(--transition)",
        "&:hover": {
          borderColor: "var(--color-scheme-1-accent)",
        },
      }),

      valueContainer: (base) => ({
        ...base,
        padding: "0",
      }),

      menu: (base) => ({
        ...base,
        backgroundColor: "var(--color-scheme-1-background)",
        border: "1px solid var(--color-scheme-1-accent)",
        borderTop: "none",
        borderRadius: "0 0 6px 6px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        marginTop: "-1px",
        zIndex: 100,
      }),

      menuList: (base) => ({
        ...base,
        maxHeight: "300px",
        padding: "12px 8px",
        borderTop: "1px solid var(--color-scheme-1-accent)",
        overflowY: "auto",

        "&::-webkit-scrollbar": {
          width: "6px",
          display: "block",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--color-mantis)",
          borderRadius: "10px",
        },

        scrollbarWidth: "thin",
        scrollbarColor: "var(--color-mantis) transparent",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor:
          state.isSelected || state.isFocused
            ? "var(--color-neutral-lightest)"
            : "transparent",
        color: "var(--color-scheme-2-text)",
        lineHeight: 1.5,
        fontSize: "18px",
        fontWeight: "400",
        borderRadius: "4px",
        padding: "4px 8px",
        margin: "4px 0",
        cursor: "pointer",
        transition: "all var(--transition)",
        "&:active": {
          backgroundColor: "var(--color-neutral-lightest)",
        },
      }),

      singleValue: (base) => ({
        ...base,
        fontSize: "18px",
        fontWeight: "400",
        lineHeight: 1.5,
        color: "var(--color-scheme-2-text)",
      }),

      input: (base) => ({ ...base, display: "none" }),
      indicatorSeparator: () => ({ display: "none" }),
      dropdownIndicator: (base) => ({
        ...base,
        padding: "0",
      }),
    } as StylesConfig<Option, false, GroupBase<Option>>;
  }, []);

  return (
    <>
      <div className={css.mobileOnly}>
        <label className={css.label} htmlFor="category-select-input">
          Категорії
        </label>
        <Select
          instanceId="category-select"
          inputId="category-select-input"
          options={options}
          value={currentOption}
          onChange={(opt) => onClick(opt?.value || "")}
          styles={customStyles}
          isSearchable={false}
          components={{ DropdownIndicator }}
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
