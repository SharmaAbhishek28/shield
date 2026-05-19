"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useUser } from "@/lib/stores/useUser";
import { cardEnter } from "@/lib/animations";

export function StreakCard() {
  const { streakCount, streakFreezes } = useUser();

  return (
    <motion.div
      variants={cardEnter}
      className="surface relative flex items-center gap-4 overflow-hidden p-5"
    >
      {/* Background shimmer haze */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent"
      />

      {/* Flame */}
      <div className="relative grid size-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10">
        <motion.div
          animate={{ opacity: [0.85, 1, 0.9, 1] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-2xl bg-primary/15 blur-md"
        />
        <motion.div
          animate={{ opacity: [0.9, 1, 0.95, 1], scale: [1, 1.04, 1, 1.02] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Flame className="size-7 text-primary" />
        </motion.div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-display text-gradient-primary tabular-nums">
            {streakCount}
          </span>
          <span className="text-small font-semibold text-text-secondary">
            day streak
          </span>
        </div>
        <p className="text-small text-text-secondary">Don&apos;t break it.</p>
      </div>

      <div className="hidden flex-col items-end gap-1 text-right sm:flex">
        <span className="text-caption uppercase text-text-muted">Freezes</span>
        <span className="text-h3 font-bold text-text-primary tabular-nums">
          {streakFreezes}
        </span>
      </div>
    </motion.div>
  );
}
