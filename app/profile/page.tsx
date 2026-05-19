"use client";

import { motion } from "framer-motion";
import { Pencil, Trophy, Flame, GraduationCap, Clock, Target } from "lucide-react";
import { useUser } from "@/lib/stores/useUser";
import { TopBar } from "@/components/shield/TopBar";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { BadgeIcon } from "@/components/shield/BadgeIcon";
import badges from "@/data/badges.json";
import type { Badge } from "@/lib/types";
import { cardEnter, stagger } from "@/lib/animations";
import { formatNumber } from "@/lib/utils";

const typedBadges = badges as Badge[];

export default function ProfilePage() {
  const u = useUser();
  const stats = [
    { label: "Total XP", value: formatNumber(u.xp), Icon: Trophy },
    { label: "Level", value: u.level, Icon: Trophy },
    { label: "Day Streak", value: u.streakCount, Icon: Flame },
    { label: "Pillars Mastered", value: 1, Icon: GraduationCap },
    { label: "Hours Trained", value: 47, Icon: Clock },
    { label: "Quizzes Passed", value: 18, Icon: Target },
  ];

  return (
    <main className="min-h-screen bg-bg pb-[96px]">
      <TopBar />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-screen-sm space-y-5 px-5 pt-4"
      >
        {/* Hero */}
        <motion.section variants={cardEnter} className="surface p-5">
          <div className="flex items-center gap-4">
            <div className="grid size-16 place-items-center rounded-2xl border border-primary/30 bg-primary/15 text-h1 font-extrabold text-primary">
              {u.fullName
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-caption uppercase text-text-secondary">
                {u.serviceId}
              </p>
              <h1 className="text-h2 font-extrabold text-text-primary">
                {u.rank} {u.fullName}
              </h1>
              <p className="text-small text-text-secondary">{u.unit}</p>
            </div>
            <button
              aria-label="Edit profile"
              className="grid size-9 place-items-center rounded-full border border-border bg-bg-elevated text-text-secondary transition hover:text-text-primary"
            >
              <Pencil className="size-4" />
            </button>
          </div>
        </motion.section>

        {/* Stats grid */}
        <section>
          <h2 className="mb-3 text-h3 font-bold text-text-primary">Stats</h2>
          <motion.div variants={stagger} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={cardEnter}
                className="surface flex flex-col gap-2 p-4"
              >
                <s.Icon className="size-4 text-primary" />
                <span className="text-caption uppercase text-text-secondary">
                  {s.label}
                </span>
                <span className="text-h2 font-extrabold text-text-primary tabular-nums">
                  {s.value}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="mb-3 text-h3 font-bold text-text-primary">Badges</h2>
          <motion.div variants={stagger} className="grid grid-cols-4 place-items-center gap-y-4 sm:grid-cols-6">
            {typedBadges.map((b) => (
              <BadgeIcon key={b.id} badge={b} size={68} />
            ))}
          </motion.div>
        </section>
      </motion.div>

      <BottomTabBar />
    </main>
  );
}
