"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Crown, Minus, TrendingDown, TrendingUp } from "lucide-react";
import data from "@/data/leaderboard.json";
import type { LeaderRow } from "@/lib/types";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, stagger } from "@/lib/animations";
import { cn, formatNumber } from "@/lib/utils";

const rows = data as LeaderRow[];

const periods = ["This Week", "This Month", "All Time"] as const;
type Period = typeof periods[number];

const scope = ["My Unit", "All Units", "Global"] as const;
type Scope = typeof scope[number];

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<Period>("This Month");
  const [s, setScope] = useState<Scope>("My Unit");
  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/more" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-primary">Competition</p>
          <h1 className="text-h1 text-text-primary">Leaderboard</h1>
        </div>
      </header>

      <div className="mx-auto mt-4 max-w-screen-sm px-5">
        <div className="relative flex rounded-full border border-border bg-bg-elevated p-1">
          {scope.map((sc) => {
            const active = s === sc;
            return (
              <button key={sc} onClick={() => setScope(sc)} className={cn("relative z-10 flex-1 rounded-full px-3 py-2 text-small font-semibold transition-colors", active ? "text-primary-foreground" : "text-text-secondary")}>
                {active && <motion.span layoutId="scope-pill" className="absolute inset-0 z-[-1] rounded-full bg-primary" transition={{ type:"spring", stiffness: 500, damping: 32 }} />}
                {sc}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} className={cn("rounded-full border px-3 py-1.5 text-caption font-semibold whitespace-nowrap transition",
              period === p ? "border-primary bg-primary/15 text-primary" : "border-border bg-bg-elevated text-text-secondary")}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto mt-8 grid max-w-screen-sm grid-cols-3 items-end gap-2 px-5">
        {[top3[1], top3[0], top3[2]].map((u, i) => {
          const place = u === top3[0] ? 1 : u === top3[1] ? 2 : 3;
          const heights: Record<1|2|3, number> = { 1: 130, 2: 100, 3: 80 };
          return (
            <motion.div key={u.id}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 220, damping: 18 }}
              className="flex flex-col items-center">
              <div className={cn("relative grid size-14 place-items-center rounded-full border-2 text-h3 font-extrabold",
                place === 1 ? "border-primary bg-primary/15 text-primary" :
                place === 2 ? "border-info/50 bg-info/10 text-info" :
                "border-warning/50 bg-warning/10 text-warning")}>
                {u.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                {place === 1 && <Crown className="absolute -top-3 size-5 text-primary" />}
              </div>
              <p className="mt-2 line-clamp-1 text-small font-semibold text-text-primary">{u.name}</p>
              <p className="text-caption text-text-secondary tabular-nums">{formatNumber(u.xp)} XP</p>
              <div className={cn("mt-2 w-full rounded-t-xl border-t-2",
                place === 1 ? "border-primary bg-primary/15" :
                place === 2 ? "border-info/60 bg-info/10" :
                "border-warning/60 bg-warning/10")} style={{ height: heights[place as 1|2|3] }}>
                <p className="pt-2 text-center text-h2 font-black text-text-primary/80">{place}</p>
              </div>
            </motion.div>
          );
        })}
      </section>

      <motion.ol variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-6 max-w-screen-sm space-y-2 px-5">
        {rest.map((u) => (
          <motion.li key={u.id} variants={cardEnter}>
            <div className={cn("flex items-center gap-3 rounded-xl border bg-bg-elevated px-4 py-3",
              u.isMe ? "border-primary/40 bg-primary/10" : "border-border")}>
              <span className="w-6 text-h3 font-bold text-text-secondary tabular-nums">#{u.rank}</span>
              <div className="grid size-9 place-items-center rounded-full bg-bg-surface text-small font-bold text-text-primary">
                {u.name.split(" ").map(w => w[0]).slice(0,2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-small font-semibold", u.isMe ? "text-primary" : "text-text-primary")}>{u.name}{u.isMe && " (You)"}</p>
                <p className="text-caption text-text-muted">{u.unit}</p>
              </div>
              <span className="text-small font-bold text-text-primary tabular-nums">{formatNumber(u.xp)}</span>
              <span className={cn("inline-flex size-6 place-items-center rounded-full",
                u.trend === "up" && "bg-success/15 text-success",
                u.trend === "down" && "bg-danger/15 text-danger",
                u.trend === "same" && "bg-bg-surface text-text-muted")}>
                {u.trend === "up" ? <TrendingUp className="size-3" /> : u.trend === "down" ? <TrendingDown className="size-3" /> : <Minus className="size-3" />}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <BottomTabBar />
    </main>
  );
}
