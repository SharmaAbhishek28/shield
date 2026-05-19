"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Clock, Lock, PlayCircle, FileText, HelpCircle, Hexagon, Sparkles,
} from "lucide-react";

import pillarsJson from "@/data/pillars.json";
import partsJson from "@/data/parts.json";
import type { Pillar, Part } from "@/lib/types";
import { Icon } from "@/components/shield/Icon";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { stagger, cardEnter, pressable } from "@/lib/animations";
import { cn } from "@/lib/utils";

const pillars = pillarsJson as Pillar[];
const partsByPillar = partsJson as Record<string, Part[]>;

const typeIcon = { video: PlayCircle, text: FileText, quiz: HelpCircle, interactive: Sparkles };

export default function PillarDetailPage() {
  const params = useParams<{ pillar: string }>();
  const pillar = pillars.find((p) => p.slug === params.pillar);
  if (!pillar) return notFound();
  const parts = partsByPillar[pillar.slug] ?? [];
  const completed = parts.filter((p) => p.status === "completed").length;

  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-border/60"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${pillar.color}26 0%, transparent 60%)` }}
      >
        <div className="mx-auto flex max-w-screen-sm items-start gap-3 px-5 pb-8 pt-4">
          <Link href="/learn" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated text-text-primary">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex-1">
            <p className="text-caption uppercase" style={{ color: pillar.color }}>Pillar {pillars.findIndex(p => p.slug===pillar.slug)+1} / 6</p>
            <h1 className="text-display text-text-primary">{pillar.name}</h1>
            <p className="mt-1 text-body text-text-secondary">{pillar.tagline}</p>
          </div>
          <div className="relative grid size-16 shrink-0 place-items-center">
            <Hexagon className="size-16" style={{ color: pillar.color }} strokeWidth={1.2} />
            <Icon name={pillar.icon} className="absolute size-7" style={{ color: pillar.color }} />
          </div>
        </div>

        <div className="mx-auto max-w-screen-sm px-5 pb-5">
          <div className="surface flex items-center gap-4 p-4">
            <div>
              <p className="text-caption uppercase text-text-secondary">Your progress</p>
              <p className="text-h2 font-extrabold text-text-primary tabular-nums">{completed} / {parts.length}<span className="ml-1 text-small text-text-muted">Parts</span></p>
            </div>
            <div className="flex-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-bg-elevated">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pillar.progress}%` }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full" style={{ background: pillar.color }} />
              </div>
              <p className="mt-1 text-right text-caption text-text-secondary">{pillar.progress}% complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Parts timeline */}
      <motion.ol variants={stagger} initial="hidden" animate="visible" className="relative mx-auto mt-4 max-w-screen-sm space-y-4 px-5">
        {/* Connector spine */}
        <div aria-hidden className="absolute bottom-0 left-[40px] top-0 w-px bg-border/70" />
        {parts.map((part) => {
          const locked = part.status === "locked";
          const Tag =
            part.status === "completed" ? CheckCircle2
            : locked ? Lock : PlayCircle;
          const tagColor =
            part.status === "completed" ? "text-success border-success/40 bg-success/15"
            : part.status === "in-progress" ? "text-primary border-primary/40 bg-primary/15 animate-pulse-slow"
            : locked ? "text-text-muted border-border bg-bg-elevated"
            : "text-primary border-primary/40 bg-primary/10";
          return (
            <motion.li key={part.id} variants={cardEnter}>
              <motion.div {...(locked ? {} : pressable)}>
                <Link href={locked ? "#" : `/learn/${pillar.slug}/${part.order}`} className={cn("surface relative flex gap-4 p-4", locked && "opacity-70")}>
                  <div className={cn("relative z-10 grid size-12 shrink-0 place-items-center rounded-full border", tagColor)}>
                    <Tag className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-caption uppercase text-text-secondary">Part {part.order}</p>
                    <h3 className="truncate text-h3 font-semibold text-text-primary">{part.title}</h3>
                    <p className="mt-0.5 text-small text-text-secondary">{part.description}</p>
                    <div className="mt-2 flex items-center gap-3 text-caption text-text-muted">
                      <span className="inline-flex items-center gap-1"><Clock className="size-3" />{part.durationMins} min</span>
                      {part.contentTypes.map((c) => {
                        const I = typeIcon[c];
                        return <I key={c} className="size-3" />;
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.li>
          );
        })}

        {/* Pillar Quiz CTA */}
        <motion.li variants={cardEnter}>
          <div className={cn("surface flex items-center gap-4 p-5", completed < parts.length && "opacity-60")}>
            <div className="grid size-12 place-items-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
              <HelpCircle className="size-6" />
            </div>
            <div className="flex-1">
              <p className="text-caption uppercase text-text-secondary">Pillar Quiz</p>
              <p className="text-h3 font-bold text-text-primary">Final check — 10 questions</p>
              <p className="text-small text-text-secondary">Unlock badge: {pillar.name} Master</p>
            </div>
            <Link
              href={completed < parts.length ? "#" : `/train/quiz/${pillar.slug}`}
              className={cn("rounded-xl px-3 py-2 text-small font-bold", completed < parts.length ? "bg-bg-elevated text-text-muted" : "bg-primary text-primary-foreground")}
            >
              {completed < parts.length ? "Locked" : "Take quiz"}
            </Link>
          </div>
        </motion.li>
      </motion.ol>

      <BottomTabBar />
    </main>
  );
}
