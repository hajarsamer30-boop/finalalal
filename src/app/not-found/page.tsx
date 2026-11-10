"use client";

import Link from "next/link";
import { useAppPreferences } from "@/providers/app-preferences-provider";

export default function NotFoundPage() {
  const { t } = useAppPreferences();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <section className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{t("notFound.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("notFound.description")}</p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {t("notFound.home")}
        </Link>
      </section>
    </main>
  );
}
