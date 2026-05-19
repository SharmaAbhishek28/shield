"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ScanFace, Crosshair, Radar } from "lucide-react";

import data from "@/data/deepfake-challenges.json";
import type { DeepfakeChallenge } from "@/lib/types";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, pressable, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const challenges = data as DeepfakeChallenge[];
const formatIcon = { compare: ScanFace, frame: Crosshair, realtime: Radar };
const formatLabel = { compare: "Spot the Fake", frame: "Frame Analysis", realtime: "Realtime Detection" };
const difficultyHue: Record<string, string> = { Cadet: "info", Specialist: "primary", Advanced: "warning", Elite: "danger" };

export default function DeepfakeListPage() {
  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/train" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-primary">Training · Signature</p>
          <h1 className="text-h1 text-text-primary">Deepfake Recognition</h1>
        </div>
      </header>

      <motion.ol variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-screen-sm space-y-3 px-5">
        {challenges.map((c) => {
          const Icon = formatIcon[c.format];
          const hue = difficultyHue[c.difficulty] ?? "primary";
          return (
            <motion.li key={c.id} variants={cardEnter}>
              <motion.div {...pressable}>
                <Link href={`/train/deepfake/${c.id}`} className="surface flex items-center gap-4 p-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-bg-elevated text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-caption uppercase text-text-secondary">{formatLabel[c.format]}</p>
                    <h2 className="truncate text-h3 font-semibold text-text-primary">{c.title}</h2>
                    <div className="mt-1 flex items-center gap-3 text-caption text-text-muted">
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" />{c.durationSecs}s</span>
                      <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase",
                        hue==="info" && "border-info/40 bg-info/15 text-info",
                        hue==="primary" && "border-primary/40 bg-primary/15 text-primary",
                        hue==="warning" && "border-warning/40 bg-warning/15 text-warning",
                        hue==="danger" && "border-danger/40 bg-danger/15 text-danger")}>
                        {c.difficulty}
                      </span>
                      <span>+{c.reward} XP</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ol>

      <BottomTabBar />
    </main>
  );
}
