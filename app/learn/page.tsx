"use client";

import { motion } from "framer-motion";
import pillarsData from "@/data/pillars.json";
import type { Pillar } from "@/lib/types";
import { PillarHex } from "@/components/shield/PillarHex";
import { TopBar } from "@/components/shield/TopBar";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { stagger } from "@/lib/animations";

const pillars = pillarsData as Pillar[];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-bg pb-[96px]">
      <TopBar />

      <div className="mx-auto max-w-screen-sm px-5 pt-4">
        <header className="mb-6">
          <p className="text-caption uppercase text-primary">Curriculum</p>
          <h1 className="mt-1 text-display text-text-primary">The Six Pillars</h1>
          <p className="mt-1 text-body text-text-secondary">
            Master each pillar to achieve cognitive dominance.
          </p>
        </header>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 place-items-center gap-y-6 sm:grid-cols-3"
        >
          {pillars.map((p, i) => (
            <PillarHex key={p.slug} pillar={p} index={i} />
          ))}
        </motion.div>
      </div>

      <BottomTabBar />
    </main>
  );
}
