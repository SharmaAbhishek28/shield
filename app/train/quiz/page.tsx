"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, HelpCircle, Lock, ChevronRight, Trophy } from "lucide-react";
import pillarsJson from "@/data/pillars.json";
import type { Pillar } from "@/lib/types";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, pressable, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const pillars = pillarsJson as Pillar[];

export default function QuizSelectorPage() {
  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/train" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-success">Training</p>
          <h1 className="text-h1 text-text-primary">Quiz Hub</h1>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-screen-sm space-y-3 px-5">
        <motion.div variants={cardEnter} {...pressable}>
          <Link href="/train/quiz/sense" className="surface flex items-center gap-4 p-5">
            <div className="grid size-12 place-items-center rounded-xl border border-primary/40 bg-primary/15 text-primary"><Trophy className="size-6" /></div>
            <div className="flex-1">
              <p className="text-caption uppercase text-text-secondary">Featured</p>
              <h3 className="text-h3 text-text-primary">Sense — Diagnostic Quiz</h3>
              <p className="text-small text-text-secondary">10 questions · mixed format · calibration scored</p>
            </div>
            <ChevronRight className="size-4 text-text-secondary" />
          </Link>
        </motion.div>

        <p className="pt-2 text-caption uppercase text-text-secondary">Pillar quizzes</p>
        {pillars.map((p) => {
          const locked = p.progress < 100;
          return (
            <motion.div key={p.slug} variants={cardEnter} {...(locked ? {} : pressable)}>
              <Link href={locked ? "#" : `/train/quiz/${p.slug}`} className={cn("surface flex items-center gap-4 p-4", locked && "opacity-60")}>
                <div className="grid size-10 place-items-center rounded-xl" style={{ background: `${p.color}1A`, color: p.color }}>
                  {locked ? <Lock className="size-5" /> : <HelpCircle className="size-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-h3 text-text-primary">{p.name}</p>
                  <p className="text-small text-text-secondary">{locked ? "Complete all 4 Parts to unlock" : "10 questions"}</p>
                </div>
                <ChevronRight className="size-4 text-text-secondary" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <BottomTabBar />
    </main>
  );
}
