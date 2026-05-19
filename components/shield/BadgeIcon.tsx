"use client";

import { motion } from "framer-motion";
import type { Badge } from "@/lib/types";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";
import { cardEnter } from "@/lib/animations";

export function BadgeIcon({ badge, size = 64 }: { badge: Badge; size?: number }) {
  const locked = !badge.unlockedAt;
  return (
    <motion.div
      variants={cardEnter}
      whileHover={{ y: -2, rotate: locked ? 0 : 3 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "relative shrink-0",
        locked ? "opacity-30 grayscale" : "opacity-100"
      )}
      style={{ width: size, height: size * 1.1 }}
    >
      <div
        className="hex-clip absolute inset-0"
        style={{
          background: locked
            ? "#2A3142"
            : "linear-gradient(135deg, #FFB766 0%, #FF8F1F 50%, #E67300 100%)",
        }}
      />
      <div className="hex-clip absolute inset-[3px] bg-bg-elevated" aria-hidden />
      <div className="absolute inset-0 grid place-items-center">
        <Icon
          name={badge.icon}
          className={cn(locked ? "text-text-muted" : "text-primary")}
          style={{ width: size * 0.42, height: size * 0.42 }}
        />
      </div>
    </motion.div>
  );
}
