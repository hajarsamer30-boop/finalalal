"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { translate, type Language, type Theme, type TranslationKey } from "@/lib/i18n";

type Preferences = {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: (key: TranslationKey) => string;
};

const PreferencesContext = createContext<Preferences | null>(null);
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyPreferencesChanged() {
  listeners.forEach((listener) => listener());
}

function getLanguageSnapshot(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem("freshcart-language");
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    // Fall back to the browser language when storage is unavailable.
  }
  return navigator.language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem("freshcart-theme");
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // Fall back to the system preference when storage is unavailable.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getLanguageSnapshot, () => "en" as Language);
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "light" as Theme);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    root.classList.toggle("dark", theme === "dark");
  }, [language, theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const updateFromSystem = () => {
      if (!window.localStorage.getItem("freshcart-theme")) notifyPreferencesChanged();
    };
    media.addEventListener("change", updateFromSystem);
    return () => media.removeEventListener("change", updateFromSystem);
  }, []);

  function toggleLanguage() {
    const next = language === "en" ? "ar" : "en";
    window.localStorage.setItem("freshcart-language", next);
    notifyPreferencesChanged();
  }

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("freshcart-theme", next);
    notifyPreferencesChanged();
  }

  const value: Preferences = {
    language,
    theme,
    toggleLanguage,
    toggleTheme,
    t: (key) => translate(language, key),
  };

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useAppPreferences() {
  const preferences = useContext(PreferencesContext);
  if (!preferences) {
    throw new Error("useAppPreferences must be used inside AppPreferencesProvider");
  }
  return preferences;
}
