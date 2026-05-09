import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isAnimationEnabled: boolean;
  toggleAnimation: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isAnimationEnabled: false,
      toggleAnimation: () =>
        set((state) => ({ isAnimationEnabled: !state.isAnimationEnabled })),
    }),
    { name: "ui-settings" },
  ),
);
