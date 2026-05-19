"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Brain, Clock, Target } from "lucide-react";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, pressable, stagger } from "@/lib/animations";

const scenarios = Array.from({ length: 12 }, (_, i) => ({
  id: `sc_${i+1}`,
  title: ["Border outpost — pre-dawn", "City square — viral clip", "Comms blackout — squad call", "Refugee corridor — disinfo wave", "Joint exercise — false flag", "Cyber-physical incident", "Election week press cycle", "Hostage broadcast", "Misattributed footage", "Coordinated bot wave", "Synthetic intercept", "Local panic spike"][i],
  difficulty: i < 4 ? "Cadet" : i < 8 ? "Specialist" : "Advanced",
  timeLimit: 60 + (i % 4) * 30,
  reward: 80 + i * 20,
}));

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/train" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-info">Training</p>
          <h1 className="text-h1 text-text-primary">Decision Scenarios</h1>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 grid max-w-screen-sm gap-3 px-5 sm:grid-cols-2">
        {scenarios.map((s) => (
          <motion.div key={s.id} variants={cardEnter} {...pressable}>
            <Link href="#" className="surface flex h-full flex-col gap-3 p-4">
              <div className="flex items-center gap-2">
                <div className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elevated text-info"><Brain className="size-5" /></div>
                <span className="rounded-full border border-info/40 bg-info/15 px-2 py-0.5 text-[10px] font-bold uppercase text-info">{s.difficulty}</span>
              </div>
              <h3 className="text-h3 font-semibold text-text-primary">{s.title}</h3>
              <div className="mt-auto flex items-center justify-between text-caption text-text-secondary">
                <span className="inline-flex items-center gap-1"><Clock className="size-3" />{s.timeLimit}s</span>
                <span className="inline-flex items-center gap-1 text-primary"><Target className="size-3" />+{s.reward} XP</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <BottomTabBar />
    </main>
  );
}
