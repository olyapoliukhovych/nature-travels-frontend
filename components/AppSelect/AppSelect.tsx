"use client";

import { useMemo } from "react";
import Select, {
  StylesConfig,
  GroupBase,
  components,
  DropdownIndicatorProps,
} from "react-select";
import { Icon } from "../Icon/Icon";

interface Option {
  value: string;
  label: string;
}

interface AppSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
  onBlur?: () => void;
  instanceId?: string;
  inputId?: string;
  placeholder?: string;
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

export default function AppSelect({
  options,
  value,
  onChange,
  onBlur,
  instanceId,
  inputId,
  placeholder = "Категорія",
}: AppSelectProps) {
  const customStyles = useMemo(() => {
    return {
      container: (base) => ({
        ...base,
        width: "100%",
      }),
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
      valueContainer: (base) => ({ ...base, padding: "0" }),
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
        "&::-webkit-scrollbar": { width: "6px", display: "block" },
        "&::-webkit-scrollbar-track": { background: "transparent" },
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
        fontSize: "18px",
        borderRadius: "4px",
        padding: "4px 8px",
        margin: "4px 0",
        cursor: "pointer",
        transition: "all var(--transition)",
      }),
      singleValue: (base) => ({
        ...base,
        fontSize: "18px",
        color: "var(--color-scheme-2-text)",
        fontWeight: "400",
      }),
      input: (base) => ({ ...base, display: "none" }),
      indicatorSeparator: () => ({ display: "none" }),
      dropdownIndicator: (base) => ({ ...base, padding: "0" }),
    } as StylesConfig<Option, false, GroupBase<Option>>;
  }, []);

  return (
    <Select
      instanceId={instanceId}
      inputId={inputId}
      options={options}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      styles={customStyles}
      isSearchable={false}
      placeholder={placeholder}
      openMenuOnFocus={true}
      components={{ DropdownIndicator }}
    />
  );
}
