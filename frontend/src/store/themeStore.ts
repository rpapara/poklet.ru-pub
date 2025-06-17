import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleTheme: () => {
        const next = get().mode === 'light' ? 'dark' : 'light';
        set({ mode: next });
      },
    }),
    {
      name: 'theme-mode',
    },
  ),
);
