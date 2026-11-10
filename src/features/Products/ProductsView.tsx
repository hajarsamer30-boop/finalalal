"use client";

import type { ProductInterface } from "./interfaces/product.interface";
import ProductItem from "./ProductItem";
import { useAppPreferences } from "@/providers/app-preferences-provider";

export default function ProductsView({ products }: { products: ProductInterface[] }) {
  const { t } = useAppPreferences();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 sm:mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {t("shop.eyebrow")}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t("shop.title")}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("shop.description")}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => <ProductItem key={product._id} prod={product} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-muted-foreground">
          {t("shop.empty")}
        </p>
      )}
    </section>
  );
}
