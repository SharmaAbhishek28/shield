"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, ScanFace, Sparkles } from "lucide-react";

import { TopBar } from "@/components/shield/TopBar";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, pressable, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const modules = [
  {
    href: "/train/deepfake",
    title: "Deepfake Recognition",
    description: "5 challenges across 3 formats — spot the fake, frame analysis, realtime detection.",
    Icon: ScanFace,
    accent: "from-primary/30 to-primary/0",
    tag: "Signature",
  },
  {
    href: "/train/scenarios",
    title: "Decision Scenarios",
    description: "12 time-pressured tactical scenarios — every call has consequences.",
    Icon: Brain,
    accent: "from-info/30 to-info/0",
    tag: "12 missions",
  },
  {
    href: "/train/quiz",
    title: "Quiz Hub",
    description: "Pillar quizzes and mixed-format calibration tests.",
    Icon: Sparkles,
    accent: "from-success/30 to-success/0",
    tag: "2 ready",
  },
];

export default function TrainPage() {
  return (
    <main className="min-h-screen bg-bg pb-[96px]">
      <TopBar />

      <div className="mx-auto max-w-screen-sm px-5 pt-4">
        <header className="mb-6">
          <p className="text-caption uppercase text-primary">Training Ground</p>
          <h1 className="mt-1 text-display text-text-primary">Sharpen the edge</h1>
        </header>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {modules.map((m) => (
            <motion.div key={m.href} variants={cardEnter}>
              <motion.div {...pressable}>
                <Link
                  href={m.href}
                  className="surface relative block overflow-hidden p-5"
                >
                  <div
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-gradient-to-br blur-2xl",
                      m.accent
                    )}
                  />
                  <div className="relative flex items-center gap-4">
                    <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-border bg-bg-elevated text-primary">
                      <m.Icon className="size-7" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-h3 font-bold text-text-primary">
                          {m.title}
                        </h2>
                        <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                          {m.tag}
                        </span>
                      </div>
                      <p className="mt-1 text-small text-text-secondary">
                        {m.description}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-text-secondary" />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <BottomTabBar />
    </main>
  );
}
