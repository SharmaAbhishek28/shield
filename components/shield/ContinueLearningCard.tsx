"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, PlayCircle } from "lucide-react";
import data from "@/data/continue-learning.json";
import { cardEnter, pressable } from "@/lib/animations";

export function ContinueLearningCard() {
  const { pillarName, partTitle, progress, durationMins, thumbnailHue } = data;

  return (
    <motion.div variants={cardEnter}>
      <motion.div {...pressable}>
        <Link
          href={`/learn/${data.pillarSlug}`}
          className="surface relative block overflow-hidden p-0"
        >
          {/* Thumbnail strip */}
          <div
            className="relative h-32 w-full overflow-hidden"
            style={{
              background: `linear-gradient(135deg, hsl(${thumbnailHue} 60% 30%) 0%, #0A0E1A 100%)`,
            }}
          >
            {/* Hex grid pattern overlay */}
            <div
              aria-hidden
              className="absolute inset-0 bg-hex-grid opacity-30"
              style={{ backgroundSize: "16px 16px" }}
            />

            {/* Play badge */}
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_32px_-4px_rgba(255,143,31,0.6)]"
              >
                <PlayCircle className="size-8" strokeWidth={1.6} />
              </motion.div>
            </div>

            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-caption uppercase text-text-primary backdrop-blur">
              Continue learning
            </div>
            <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-caption text-text-primary backdrop-blur">
              <Clock className="size-3" />
              {durationMins} min
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-caption uppercase text-text-secondary">
                {pillarName}
              </p>
              <p className="truncate text-h3 font-semibold text-text-primary">
                {partTitle}
              </p>
              <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
              <ArrowRight className="size-4" />
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
