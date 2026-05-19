"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/stores/useUser";
import { cardEnter } from "@/lib/animations";
import { formatNumber } from "@/lib/utils";

export function XPLevelCard() {
  const { xp, level, nextLevelXp } = useUser();
  const fill = Math.min(1, xp / nextLevelXp);
  const remaining = Math.max(0, nextLevelXp - xp);

  // Animated XP count-up (4000 → 4250 per spec)
  const display = useMotionValue(xp - 250);
  const rounded = useTransform(display, (v) => formatNumber(Math.round(v)));
  const [text, setText] = useState(formatNumber(xp - 250));

  useEffect(() => {
    const unsub = rounded.on("change", setText);
    const controls = animate(display, xp, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [display, rounded, xp]);

  return (
    <motion.div variants={cardEnter} className="surface p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative grid size-12 place-items-center rounded-xl border border-primary/40 bg-primary/10">
            <span className="text-caption uppercase text-text-secondary">
              LVL
            </span>
            <span className="absolute inset-0 grid translate-y-1 place-items-center text-h3 font-extrabold text-primary">
              {level}
            </span>
          </div>
          <div>
            <p className="text-caption uppercase text-text-secondary">
              Experience
            </p>
            <p className="text-h2 font-extrabold text-text-primary tabular-nums">
              {text} <span className="text-small text-text-muted">XP</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-caption uppercase text-text-secondary">To LVL {level + 1}</p>
          <p className="text-h3 font-bold text-text-primary tabular-nums">
            {formatNumber(remaining)}
          </p>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${fill * 100}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="h-full rounded-full bg-gradient-to-r from-primary-light via-primary to-primary-dark"
        />
      </div>
    </motion.div>
  );
}
