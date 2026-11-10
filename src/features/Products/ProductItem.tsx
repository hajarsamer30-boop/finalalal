"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAppPreferences } from "@/providers/app-preferences-provider";
import { calcRate } from "@/utlis/calc-rate";
import type { ProductInterface } from "./interfaces/product.interface";
import CartButtonCom from "@/app/(pages)/cart/components/CartButtonCom";

const formatPrice = (price: number, language: "en" | "ar") =>
  new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductItem({ prod }: { prod: ProductInterface }) {
  const { language, t } = useAppPreferences();
  const discount =
    prod.priceAfterDiscount && prod.priceAfterDiscount < prod.price
      ? Math.round(((prod.price - prod.priceAfterDiscount) / prod.price) * 100)
      : 0;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {prod.imageCover ? (
          <Link href={`/productDetails/${prod._id}`} className="absolute inset-0">
            <Image
              src={prod.imageCover}
              alt={prod.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          </Link>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {t("product.noImage")}
          </div>
        )}

        {discount > 0 && (
          <span className="absolute start-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            {t("product.discount")} {discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {prod.brand?.name || prod.category?.name || t("product.featured")}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground">
            {calcRate(prod.ratingsAverage, language)}
            <span>
              {new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-EG", {
                maximumFractionDigits: 1,
              }).format(Number(prod.ratingsAverage || 0))}
            </span>
          </span>
        </div>

        <h2 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-card-foreground sm:text-lg">
          {prod.title}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {prod.description}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
          <span className="text-lg font-bold text-primary">
            {formatPrice(prod.priceAfterDiscount && discount > 0 ? prod.priceAfterDiscount : prod.price, language)}
          </span>
          {discount > 0 && (
            <span className="pb-0.5 text-sm text-muted-foreground line-through">
              {formatPrice(prod.price, language)}
            </span>
          )}

            <CartButtonCom isProductItem pId={prod._id}/>

        </div>
      </div>
    </article>
  );
}
