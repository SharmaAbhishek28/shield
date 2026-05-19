"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Pillar } from "@/lib/types";
import { Icon } from "./Icon";
import { cardEnter } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function PillarHex({ pillar, index }: { pillar: Pillar; index: number }) {
  const size = 120;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pillar.progress / 100);

  return (
    <motion.div variants={cardEnter} className="shrink-0">
      <Link
        href={`/learn/${pillar.slug}`}
        className="group block w-[132px] text-center"
      >
        <motion.div
          whileHover={{ rotate: 3, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="relative mx-auto h-[132px] w-[120px]"
        >
          {/* Hex backdrop */}
          <div
            className="hex-clip absolute inset-0"
            style={{ background: `${pillar.color}1A` }}
          />
          <div
            className="hex-clip absolute inset-[2px] bg-bg-elevated"
            aria-hidden
          />

          {/* Progress ring (rotated 90deg so it starts at top) */}
          <svg
            className="absolute inset-0 -rotate-90"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={pillar.color}
              strokeOpacity={0.2}
              strokeWidth={stroke}
            />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={pillar.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={c}
              initial={{ strokeDashoffset: c }}
              animate={{ strokeDashoffset: offset }}
              transition={{
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.05 * index,
              }}
            />
          </svg>

          {/* Icon */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              className="grid size-10 place-items-center rounded-full"
              style={{ color: pillar.color }}
            >
              <Icon name={pillar.icon} className="size-6" strokeWidth={2} />
            </div>
          </div>

          {/* Progress chip */}
          <span
            className={cn(
              "absolute -right-1 -top-1 inline-flex items-center justify-center rounded-full px-2 py-0.5 text-caption font-bold text-bg",
              "ring-2 ring-bg"
            )}
            style={{ background: pillar.color }}
          >
            {pillar.progress}%
          </span>
        </motion.div>

        <p className="mt-2 text-small font-semibold text-text-primary">
          {pillar.name}
        </p>
      </Link>
    </motion.div>
  );
}
