"use client";

import { useAppPreferences } from "@/providers/app-preferences-provider";

export default function CategoriesPage() {
  const { t } = useAppPreferences();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("categories.title")}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{t("categories.description")}</p>
    </main>
  );
}
