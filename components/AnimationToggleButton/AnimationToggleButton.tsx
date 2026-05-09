"use client";

import { useEffect, useState } from "react";
import { useSettingsStore } from "@/lib/store/settingsStore";
import Button from "../Button/Button";
import { LuWaves, LuMoveHorizontal } from "react-icons/lu";
import css from "./AnimationToggleButton.module.css";

export function AnimationToggleButton() {
  const { isAnimationEnabled, toggleAnimation } = useSettingsStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const label = isAnimationEnabled ? "Вимкнути анімацію" : "Увімкнути анімацію";

  return (
    <Button
      type="button"
      className={css.toggle}
      onClick={toggleAnimation}
      title={label}
      aria-label={label}
    >
      {isAnimationEnabled ? (
        <LuMoveHorizontal className={css.icon} />
      ) : (
        <LuWaves className={css.icon} />
      )}
    </Button>
  );
}
