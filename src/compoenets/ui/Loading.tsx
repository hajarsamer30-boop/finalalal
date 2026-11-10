"use client";

import { LoaderCircle } from "lucide-react";
import { useAppPreferences } from "@/providers/app-preferences-provider";

export default function Loading() {
  const { t } = useAppPreferences();

  return (
    <div role="status" className="flex min-h-48 flex-col items-center justify-center gap-3 p-8 text-muted-foreground">
      <LoaderCircle aria-hidden="true" className="size-10 animate-spin text-primary" />
      <span>{t("loading")}</span>
    </div>
  );
}
