"use client";

import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useAppPreferences } from "@/providers/app-preferences-provider";
import Slider from "./Slider";

export function HomePage() {
  const { t } = useAppPreferences();

  return (
    <main className=" flex-1 items-center">
       <Slider/>
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {t("home.eyebrow")}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {t("home.description")}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("home.shopNow")}
              <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-6 py-3 font-semibold transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("home.browseCategories")}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary/20 via-primary/10 to-secondary p-8 sm:p-12">
          <div aria-hidden="true" className="absolute inset-6 rounded-[1.5rem] border border-primary/15 sm:inset-8" />
          <div className="relative flex size-40 items-center justify-center rounded-[2rem] bg-background shadow-xl sm:size-52 sm:rounded-[2.5rem]">
            <ShoppingBag aria-hidden="true" className="size-20 text-primary sm:size-28" strokeWidth={1.25} />
          </div>
          <span className="absolute bottom-6 end-6 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm sm:bottom-10 sm:end-10">
            FreshCart
          </span>
        </div>
      </section>
      
     
    </main>
  );
}
