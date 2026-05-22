import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/lib/i18n";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: "teacher" | "student";
  institution_type: "school" | "college" | "institute" | "university";
}

interface AppState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setGuest: (value: boolean) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isGuest: false,
      setUser: (user, token) =>
        set({ user, token, isAuthenticated: true, isGuest: false }),
      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, isGuest: false }),
      setGuest: (value) => set({ isGuest: value }),
      theme: "dark",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
      locale: "en",
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: "dangasa-ai-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        locale: state.locale,
      }),
    }
  )
);
