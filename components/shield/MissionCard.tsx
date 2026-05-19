"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Mission } from "@/lib/types";
import { Icon } from "./Icon";
import { cardEnter, pressable } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function MissionCard({ mission }: { mission: Mission }) {
  const done = mission.claimed || mission.progress >= mission.target;
  const fill = Math.min(1, mission.progress / mission.target);

  return (
    <motion.div
      variants={cardEnter}
      {...pressable}
      className={cn(
        "surface min-w-[240px] max-w-[240px] shrink-0 p-4",
        done && "border-primary/40"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl border",
            done
              ? "border-primary/40 bg-primary/15 text-primary"
              : "border-border bg-bg-elevated text-text-secondary"
          )}
        >
          <Icon name={mission.icon} className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-caption uppercase text-text-secondary">
            {mission.subtitle}
          </p>
          <p className="truncate text-small font-semibold text-text-primary">
            {mission.title}
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bg-elevated">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${fill * 100}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "h-full rounded-full",
            done ? "bg-primary" : "bg-secondary-light"
          )}
        />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-caption text-text-secondary">
          +{mission.xp} XP
        </span>
        {done ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-caption font-semibold text-success">
            <Check className="size-3" /> {mission.claimed ? "Claimed" : "Ready"}
          </span>
        ) : (
          <span className="text-caption font-semibold text-text-secondary tabular-nums">
            {mission.progress}/{mission.target}
          </span>
        )}
      </div>
    </motion.div>
  );
}
