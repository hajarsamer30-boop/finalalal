"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAppPreferences } from "@/providers/app-preferences-provider";
import { translateTemplate } from "@/lib/i18n";

export default function GetImgSrcCom({
  cover,
  imgs,
}: {
  cover: string;
  imgs: string[];
}) {
  const [selectedSrc, setSelectedSrc] = useState(cover);
  const { language } = useAppPreferences();

  return (
    <div className="w-full">
      {/* Added aspect-square (or a specific height like h-96) so the fill image has a container to size against */}
      <div className="relative my-3 aspect-square w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[4/3] lg:aspect-square">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedSrc}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.24, ease: "easeInOut" }}
          >
            <Image
              src={selectedSrc}
              alt={translateTemplate(language, "details.productImage", { number: 1 })}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 overflow-x-auto py-2">
        {[...new Set([cover, ...imgs])].map((img, index) => (
          <motion.button
            key={img}
            type="button"
            aria-label={translateTemplate(language, "details.productImage", { number: index + 1 })}
            aria-pressed={selectedSrc === img}
            onClick={() => setSelectedSrc(img)}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:size-20 ${
              selectedSrc === img
                ? "border-primary"
                : "border-transparent hover:border-border"
            }`}
          >
            <Image
              src={img}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}