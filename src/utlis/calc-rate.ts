import { createElement, type ReactNode } from "react";
import { Star } from "lucide-react";
import { translateTemplate, type Language } from "@/lib/i18n";

export function calcRate(rate: number, language: Language = "en"): ReactNode {
  const safeRate = Number.isFinite(rate) ? Math.min(5, Math.max(0, rate)) : 0;

  return createElement(
    "span",
    {
      className: "inline-flex items-center gap-0.5",
      role: "img",
      "aria-label": translateTemplate(language, "product.rating", { rating: safeRate.toFixed(1) }),
    },
    Array.from({ length: 5 }, (_, index) => {
      const fillPercent = Math.min(100, Math.max(0, (safeRate - index) * 100));

      return createElement(
        "span",
        { key: index, className: "relative inline-flex size-4" },
        createElement(Star, {
          "aria-hidden": true,
          className: "absolute inset-0 size-4 fill-muted text-muted",
        }),
        createElement(
          "span",
          {
            "aria-hidden": true,
            className: "absolute inset-y-0 left-0 overflow-hidden",
            style: { width: `${fillPercent}%` },
          },
          createElement(Star, {
            className: "size-4 min-w-4 fill-amber-400 text-amber-400",
          }),
        ),
      );
    }),
  );
}
