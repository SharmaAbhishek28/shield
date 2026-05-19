"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, ChevronRight, Clock, FileText, HelpCircle,
  PlayCircle, Sparkles, BookOpen, Lightbulb,
} from "lucide-react";

import pillarsJson from "@/data/pillars.json";
import partsJson from "@/data/parts.json";
import type { Pillar, Part } from "@/lib/types";
import { useUser } from "@/lib/stores/useUser";
import { cardEnter, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

const pillars = pillarsJson as Pillar[];
const partsByPillar = partsJson as Record<string, Part[]>;

export default function PartContentPage() {
  const params = useParams<{ pillar: string; part: string }>();
  const router = useRouter();
  const setXp = useUser((s) => s.setXp);
  const xp = useUser((s) => s.xp);

  const pillar = pillars.find((p) => p.slug === params.pillar);
  const part = pillar ? partsByPillar[pillar.slug]?.find((p) => String(p.order) === params.part) : undefined;
  if (!pillar || !part) return notFound();

  const [videoProgress, setVideoProgress] = useState(0);
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const canComplete = videoProgress >= 0.9;

  const onComplete = () => {
    setShowCelebration(true);
    setXp(xp + 150);
    setTimeout(() => router.push(`/learn/${pillar.slug}`), 1900);
  };

  return (
    <main className="min-h-screen bg-bg pb-32">
      {/* Top progress bar */}
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-bg-elevated">
        <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${videoProgress * 100}%` }} transition={{ duration: 0.3 }} />
      </div>

      <header className="mx-auto flex max-w-screen-md items-center gap-3 px-5 pt-4">
        <Link href={`/learn/${pillar.slug}`} className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated">
          <ArrowLeft className="size-4" />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="text-caption uppercase text-text-secondary">{pillar.name} / Part {part.order}</p>
          <h1 className="truncate text-h2 font-bold text-text-primary">{part.title}</h1>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-screen-md space-y-6 px-5">
        {/* Meta strip */}
        <motion.div variants={cardEnter} className="flex flex-wrap items-center gap-3 text-small text-text-secondary">
          <span className="inline-flex items-center gap-1.5"><Clock className="size-4 text-primary" />{part.durationMins} min</span>
          {part.contentTypes.includes("video") && <span className="inline-flex items-center gap-1.5"><PlayCircle className="size-4" />Video</span>}
          {part.contentTypes.includes("text") && <span className="inline-flex items-center gap-1.5"><FileText className="size-4" />Reading</span>}
          {part.contentTypes.includes("quiz") && <span className="inline-flex items-center gap-1.5"><HelpCircle className="size-4" />Knowledge check</span>}
        </motion.div>

        {/* Video block */}
        <motion.section variants={cardEnter}>
          <div className="surface relative overflow-hidden p-0">
            <div className="relative aspect-video w-full" style={{ background: `linear-gradient(135deg, ${pillar.color}33 0%, #0A0E1A 100%)` }}>
              <div aria-hidden className="absolute inset-0 bg-hex-grid opacity-20" style={{ backgroundSize: "16px 16px" }} />
              <div className="absolute inset-0 grid place-items-center">
                <motion.button onClick={() => setVideoProgress((v) => Math.min(1, v + 0.25))} whileTap={{ scale: 0.9 }} className="grid size-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_40px_-4px_rgba(255,143,31,0.7)]">
                  <PlayCircle className="size-12" strokeWidth={1.4} />
                </motion.button>
              </div>
              {/* Service ID watermark */}
              <div className="absolute right-3 top-3 rounded-md bg-black/40 px-2 py-1 text-[10px] uppercase tracking-wider text-text-secondary backdrop-blur">
                IA458291 · {new Date().toISOString().slice(0,16).replace("T"," ")}
              </div>
              {/* Caption row */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-caption text-text-secondary">
                <button className="rounded-md bg-black/40 px-2 py-1 backdrop-blur">CC</button>
                <span className="tabular-nums">{Math.round(videoProgress*part.durationMins*60).toString().padStart(2,"0")}s / {part.durationMins*60}s</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-black/50">
                <motion.div className="h-full bg-primary" animate={{ width: `${videoProgress*100}%` }} transition={{ duration: 0.4 }} />
              </div>
            </div>
            <p className="px-4 py-3 text-small text-text-secondary">Tap the play badge to scrub forward (prototype). Progress bar mirrors playback.</p>
          </div>
        </motion.section>

        {/* Text block with callout */}
        <motion.section variants={cardEnter} className="surface p-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-caption text-primary"><BookOpen className="size-3" />Concept</div>
          <h2 className="mt-3 text-h2 text-text-primary">{part.description}</h2>
          <p className="mt-2 text-body text-text-secondary">In the modern cognitive battlespace, the operator who detects manipulation earliest wins the decision cycle. This Part covers the foundational tells — the indicators you'll learn to recognise reflexively over the next four modules.</p>
          <div className="mt-4 rounded-2xl border border-info/30 bg-info/10 p-4">
            <p className="inline-flex items-center gap-2 text-caption uppercase text-info"><Lightbulb className="size-3" />Field definition</p>
            <p className="mt-1 text-small text-text-primary"><span className="font-bold">Cognitive battlespace</span> — the domain where perception, attention, and decision-making are contested using information, signals, and synthetic media.</p>
          </div>
        </motion.section>

        {/* Knowledge check */}
        <motion.section variants={cardEnter} className="surface p-5">
          <p className="text-caption uppercase text-primary">Knowledge check</p>
          <h3 className="mt-1 text-h3 text-text-primary">Which is the strongest single indicator of synthetic video?</h3>
          <ul className="mt-3 space-y-2">
            {["Background noise", "Lip-sync drift", "Color cast", "Compression artifacts"].map((opt, i) => {
              const correct = i === 1;
              const picked = checkAnswer === i;
              return (
                <li key={opt}>
                  <button
                    onClick={() => setCheckAnswer(i)}
                    disabled={checkAnswer !== null}
                    className={cn("flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-small transition",
                      checkAnswer === null && "border-border bg-bg-elevated text-text-primary hover:border-primary/50",
                      checkAnswer !== null && correct && "border-success/60 bg-success/10 text-success",
                      checkAnswer !== null && !correct && picked && "border-danger/60 bg-danger/10 text-danger",
                      checkAnswer !== null && !correct && !picked && "border-border bg-bg-elevated text-text-muted")}
                  >
                    <span>{opt}</span>
                    {checkAnswer !== null && correct && <CheckCircle2 className="size-4" />}
                  </button>
                </li>
              );
            })}
          </ul>
          <AnimatePresence>
            {checkAnswer !== null && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden rounded-xl border border-info/30 bg-info/5 p-3 text-small text-text-secondary">
                Lip-sync drift exposes timing-based generative errors that compression and color shifts don't.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Mark Complete */}
        <motion.button
          variants={cardEnter}
          onClick={onComplete}
          disabled={!canComplete}
          whileTap={canComplete ? { scale: 0.97 } : undefined}
          className={cn("flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-h3 font-bold transition",
            canComplete ? "bg-primary text-primary-foreground shadow-inner-glow-primary"
            : "bg-bg-elevated text-text-muted")}
        >
          <CheckCircle2 className="size-5" />
          {canComplete ? "Mark as Complete (+150 XP)" : `Watch ${Math.round((0.9 - videoProgress)*100)}% more to complete`}
        </motion.button>
      </motion.div>

      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-bg/85 backdrop-blur-md">
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 280, damping: 18 }} className="text-center">
              <div className="mx-auto grid size-24 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_0_80px_-4px_rgba(255,143,31,0.7)]">
                <Sparkles className="size-12" />
              </div>
              <p className="mt-4 text-caption uppercase text-primary">XP Earned</p>
              <p className="text-display text-text-primary">+150</p>
              <p className="text-body text-text-secondary">Part {part.order} complete</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA / next */}
      <Link href={`/learn/${pillar.slug}`} className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-border/60 bg-bg/85 px-5 py-4 backdrop-blur-md">
        <span className="text-small text-text-secondary">Up next</span>
        <span className="inline-flex items-center gap-1 text-small font-semibold text-primary">{pillar.name} progress<ChevronRight className="size-4" /></span>
      </Link>
    </main>
  );
}
