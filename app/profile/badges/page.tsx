"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import data from "@/data/badges.json";
import type { Badge } from "@/lib/types";
import { BadgeIcon } from "@/components/shield/BadgeIcon";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { stagger } from "@/lib/animations";

const badges = data as Badge[];

export default function AllBadgesPage() {
  const unlocked = badges.filter(b => b.unlockedAt).length;
  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/profile" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-primary">Achievements</p>
          <h1 className="text-h1 text-text-primary">Badges</h1>
        </div>
      </header>

      <p className="mx-auto mt-2 max-w-screen-sm px-5 text-small text-text-secondary">{unlocked} of {badges.length} unlocked.</p>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 grid max-w-screen-sm grid-cols-4 place-items-center gap-x-3 gap-y-5 px-5 sm:grid-cols-6">
        {badges.map((b) => (
          <div key={b.id} className="flex flex-col items-center">
            <BadgeIcon badge={b} size={72} />
            <p className="mt-2 line-clamp-2 text-center text-caption text-text-secondary">{b.name}</p>
          </div>
        ))}
      </motion.div>

      <BottomTabBar />
    </main>
  );
}
