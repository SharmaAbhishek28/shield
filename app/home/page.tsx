"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import pillarsJson from "@/data/pillars.json";
import missionsJson from "@/data/missions.json";
import badgesJson from "@/data/badges.json";

import type { Pillar, Mission, Badge } from "@/lib/types";
import { stagger } from "@/lib/animations";

import { TopBar } from "@/components/shield/TopBar";
import { StreakCard } from "@/components/shield/StreakCard";
import { XPLevelCard } from "@/components/shield/XPLevelCard";
import { ContinueLearningCard } from "@/components/shield/ContinueLearningCard";
import { MissionCard } from "@/components/shield/MissionCard";
import { PillarHex } from "@/components/shield/PillarHex";
import { BadgeIcon } from "@/components/shield/BadgeIcon";
import { UnitRankingCard } from "@/components/shield/UnitRankingCard";
import { BottomTabBar } from "@/components/shield/BottomTabBar";

const pillars = pillarsJson as Pillar[];
const missions = missionsJson as Mission[];
const badges = badgesJson as Badge[];

const railClass =
  "-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 no-scrollbar mask-edges-x";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg pb-[96px]">
      <TopBar />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-screen-sm space-y-5 px-5 pt-4"
      >
        <StreakCard />
        <XPLevelCard />
        <ContinueLearningCard />

        <section>
          <SectionHeading title="Today's Missions" href="/train" />
          <motion.div variants={stagger} className={railClass}>
            {missions.map((m) => (
              <MissionCard key={m.id} mission={m} />
            ))}
          </motion.div>
        </section>

        <section>
          <SectionHeading title="Your Pillars" href="/learn" />
          <motion.div variants={stagger} className={railClass}>
            {pillars.map((p, i) => (
              <PillarHex key={p.slug} pillar={p} index={i} />
            ))}
          </motion.div>
        </section>

        <section>
          <SectionHeading title="Recent Badges" href="/profile" />
          <motion.div variants={stagger} className={railClass + " items-end"}>
            {badges.slice(0, 6).map((b) => (
              <BadgeIcon key={b.id} badge={b} />
            ))}
          </motion.div>
        </section>

        <UnitRankingCard />
        <div className="h-2" />
      </motion.div>

      <BottomTabBar />
    </main>
  );
}

function SectionHeading({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-h3 font-bold text-text-primary">{title}</h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-small text-text-secondary transition hover:text-text-primary"
      >
        See all
        <ChevronRight className="size-3.5" />
      </Link>
    </div>
  );
}
