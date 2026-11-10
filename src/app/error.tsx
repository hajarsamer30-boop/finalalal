"use client";

import { useAppPreferences } from "@/providers/app-preferences-provider";

export default function ErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useAppPreferences();

  return (
    <main className="flex min-h-96 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">{t("error.title")}</h1>
      <p className="max-w-xl text-muted-foreground">{t("error.description")}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="min-h-11 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {t("error.retry")}
      </button>
    </main>
  );
}
