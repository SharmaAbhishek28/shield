"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Construction } from "lucide-react";

/**
 * `/home` placeholder.
 *
 * The full dashboard (streak widget, XP/level card, Continue Learning hero,
 * Today's Missions, Pillar rail, Recent Badges, Unit Ranking, bottom tab bar,
 * pull-to-refresh, all staggered animations) is **Step 5** in the build plan.
 * This stub is here so the login flow doesn't 404 on Vercel before then.
 */
export default function HomePlaceholder() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[480px] rounded-2xl border border-border bg-bg-surface/80 p-8 text-center backdrop-blur-md glow-border"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-xl border border-border bg-bg-elevated text-primary">
          <Construction className="size-7" />
        </div>
        <h1 className="mt-5 text-h1 font-bold text-text-primary">Dashboard</h1>
        <p className="mt-2 text-body text-text-secondary">
          The full Home screen — streak widget, XP/level card, daily missions,
          pillar rail, badges, leaderboard preview, bottom tab bar — is{" "}
          <span className="text-text-primary">Step 5</span> in the build plan.
        </p>
        <p className="mt-2 text-small text-text-muted">
          You&apos;re seeing this stub because the splash + login flow are
          wired and the prototype needs a landing target on Vercel.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-small font-semibold text-text-primary transition hover:bg-bg-elevated/70"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </motion.div>
    </main>
  );
}
