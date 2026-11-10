"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useAppPreferences } from "@/providers/app-preferences-provider";

const routeLabelKeys = {
  brands: "nav.brands",
  cart: "nav.cart",
  categories: "nav.categories",
  shop: "nav.shop",
} as const;

type Crumb = { label: string; href: string | null };

function formatSegment(segment: string) {
  try {
    return decodeURIComponent(segment)
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  } catch {
    return segment;
  }
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const { t } = useAppPreferences();
  const segments = pathname.split("/").filter(Boolean);
  const isProductDetails = segments[0] === "productDetails" && segments.length > 1;

  const crumbs: Crumb[] = isProductDetails
    ? [
        { label: t("breadcrumb.home"), href: "/" },
        { label: t("nav.shop"), href: "/shop" },
        { label: t("breadcrumb.productDetails"), href: null },
      ]
    : [
        { label: t("breadcrumb.home"), href: "/" },
        ...segments.map((segment, index) => ({
          label: segment in routeLabelKeys
            ? t(routeLabelKeys[segment as keyof typeof routeLabelKeys])
            : formatSegment(segment),
          href: `/${segments.slice(0, index + 1).join("/")}`,
        })),
      ];

  if (segments.length === 0) {
    crumbs[0] = { label: t("breadcrumb.home"), href: null };
  }

  return (
    <nav aria-label={t("breadcrumb.aria")} className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
      <ol className="flex min-h-6 flex-wrap items-center gap-2 text-sm">
        {crumbs.map((crumb, index) => {
          const isCurrent = index === crumbs.length - 1;

          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground rtl:rotate-180" />}
              {crumb.href && !isCurrent ? (
                <Link
                  href={crumb.href}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={isCurrent ? "font-medium text-foreground" : "text-muted-foreground"}
                >
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function BreadcrumbsFallback() {
  return <div aria-hidden="true" className="mx-auto h-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8" />;
}
