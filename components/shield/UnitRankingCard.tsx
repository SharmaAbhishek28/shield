"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useUser } from "@/lib/stores/useUser";
import { cardEnter } from "@/lib/animations";

export function UnitRankingCard() {
  const { unitRank, unit, unitRankTrend } = useUser();
  const max = Math.max(...unitRankTrend);
  const min = Math.min(...unitRankTrend);
  const w = 120;
  const h = 36;
  const stepX = w / (unitRankTrend.length - 1);
  // Rank: lower number = better, so invert.
  const norm = (v: number) =>
    max === min ? h / 2 : ((v - min) / (max - min)) * (h - 6) + 3;
  const path = unitRankTrend
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${norm(v)}`)
    .join(" ");

  const trendImproved =
    unitRankTrend[unitRankTrend.length - 1] < unitRankTrend[0];

  return (
    <motion.div variants={cardEnter}>
      <Link
        href="/leaderboard"
        className="surface flex items-center justify-between gap-4 p-5"
      >
        <div>
          <p className="text-caption uppercase text-text-secondary">
            Unit Ranking
          </p>
          <p className="mt-1 text-h2 font-extrabold text-text-primary">
            #{unitRank}
            <span className="ml-1 text-small font-medium text-text-secondary">
              in {unit}
            </span>
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-caption text-success">
            <TrendingUp className="size-3" />
            {trendImproved ? "Climbing" : "Steady"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <svg
            width={w}
            height={h}
            viewBox={`0 0 ${w} ${h}`}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="sparkfade" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF8F1F" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF8F1F" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={`${path} L ${w} ${h} L 0 ${h} Z`}
              fill="url(#sparkfade)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.path
              d={path}
              fill="none"
              stroke="#FF8F1F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-bg-elevated text-text-secondary">
            <ArrowRight className="size-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
