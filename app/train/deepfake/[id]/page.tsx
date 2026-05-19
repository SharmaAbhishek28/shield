"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle2, ChevronUp, ScanLine, Clock } from "lucide-react";

import data from "@/data/deepfake-challenges.json";
import type { DeepfakeChallenge } from "@/lib/types";
import { cn } from "@/lib/utils";

const challenges = data as DeepfakeChallenge[];

const tells = [
  { ts: "00:04", label: "Lip-sync drift on plosives" },
  { ts: "00:11", label: "Blink cadence < 6/min (sub-human)" },
  { ts: "00:18", label: "Edge artifact along jawline" },
  { ts: "00:27", label: "Lighting mismatch on left cheek" },
];

export default function DeepfakeCompareChallenge() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const challenge = challenges.find((c) => c.id === id);
  if (!challenge) return notFound();

  const [confidence, setConfidence] = useState<"Low" | "Medium" | "High">("Medium");
  const [pick, setPick] = useState<"A" | "B" | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const FAKE: "A" | "B" = "B";

  useEffect(() => {
    if (revealed) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [revealed]);

  const submit = () => setRevealed(true);
  const correct = pick === FAKE;

  return (
    <main className="min-h-screen bg-bg pb-32">
      <header className="mx-auto flex max-w-screen-md items-center justify-between gap-3 px-5 pt-4">
        <div className="flex items-center gap-3">
          <Link href="/train/deepfake" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
          <div>
            <p className="text-caption uppercase text-primary">Challenge {challenges.findIndex(c=>c.id===id)+1} / {challenges.length}</p>
            <h1 className="text-h2 text-text-primary">{challenge.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-small">
          <Clock className="size-4 text-primary" />
          <span className="tabular-nums text-text-primary">{Math.floor(elapsed/60).toString().padStart(2,"0")}:{(elapsed%60).toString().padStart(2,"0")}</span>
        </div>
      </header>

      <div className="mx-auto mt-5 max-w-screen-md space-y-5 px-5">
        {/* Two videos */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["A","B"] as const).map((label) => {
            const isFake = label === FAKE;
            const showResult = revealed;
            return (
              <motion.div
                key={label}
                animate={showResult ? (isFake ? { x: [0,-6,6,-4,4,0] } : {}) : {}}
                transition={{ duration: 0.4 }}
                className={cn(
                  "surface relative overflow-hidden p-0",
                  showResult && isFake && "border-danger ring-2 ring-danger/50",
                  showResult && !isFake && "border-success ring-2 ring-success/40"
                )}
              >
                <div className="relative aspect-video w-full" style={{ background: `linear-gradient(135deg, ${label==="A"?"#1e3a8a":"#7c2d12"} 0%, #0A0E1A 80%)` }}>
                  <div aria-hidden className="absolute inset-0 bg-hex-grid opacity-20" style={{ backgroundSize: "16px 16px" }} />
                  <motion.div animate={isFake ? { opacity: [1, 0.85, 1] } : {}} transition={{ duration: 1.4, repeat: Infinity }} className="absolute inset-0 grid place-items-center">
                    <span className="text-display font-black text-text-primary/70">{label}</span>
                  </motion.div>
                  {/* Scanline shimmer */}
                  {isFake && (
                    <motion.div aria-hidden className="absolute inset-x-0 h-px bg-primary/60" animate={{ top: ["10%","85%","10%"] }} transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }} />
                  )}
                  {showResult && (
                    <div className={cn("absolute left-3 top-3 inline-flex items-center gap-1 rounded-md px-2 py-1 text-caption font-bold backdrop-blur",
                      isFake ? "bg-danger/85 text-text-primary" : "bg-success/80 text-bg")}>
                      {isFake ? <><AlertTriangle className="size-3" />DEEPFAKE</> : <><CheckCircle2 className="size-3" />AUTHENTIC</>}
                    </div>
                  )}
                </div>
                {!revealed && (
                  <button onClick={() => setPick(label)} className={cn("flex w-full items-center justify-center gap-2 px-4 py-3 text-small font-semibold transition", pick===label ? "bg-primary text-primary-foreground" : "bg-bg-elevated text-text-primary hover:bg-bg-elevated/70")}>
                    Video {label} is fake
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>

        {!revealed && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="surface p-5">
            <p className="text-caption uppercase text-text-secondary">Confidence</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(["Low","Medium","High"] as const).map((c) => (
                <button key={c} onClick={() => setConfidence(c)} className={cn("rounded-xl border px-3 py-3 text-small font-semibold transition",
                  confidence===c ? "border-primary bg-primary/10 text-primary" : "border-border bg-bg-elevated text-text-secondary hover:text-text-primary")}>
                  {c}
                </button>
              ))}
            </div>
            <motion.button whileTap={pick ? { scale: 0.97 } : undefined} disabled={!pick} onClick={submit} className={cn("mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-h3 font-bold transition", pick ? "bg-primary text-primary-foreground" : "bg-bg-elevated text-text-muted")}>
              <ScanLine className="size-5" />
              Submit analysis
            </motion.button>
          </motion.section>
        )}

        {/* Reveal panel */}
        <AnimatePresence>
          {revealed && (
            <motion.section initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="surface p-5">
              <div className="flex items-center gap-3">
                <div className={cn("grid size-12 place-items-center rounded-xl", correct ? "bg-success/15 text-success" : "bg-danger/15 text-danger")}>
                  {correct ? <CheckCircle2 className="size-7" /> : <AlertTriangle className="size-7" />}
                </div>
                <div className="flex-1">
                  <p className="text-caption uppercase text-text-secondary">{correct ? "Correct call" : "Missed it"}</p>
                  <p className="text-h2 text-text-primary">{correct ? `+${challenge.reward} XP` : "Review the tells"}</p>
                </div>
                <span className="text-small text-text-secondary">Confidence: <span className="font-semibold text-text-primary">{confidence}</span></span>
              </div>

              <div className="mt-5">
                <p className="text-caption uppercase text-text-secondary">Tells breakdown</p>
                <ul className="mt-2 space-y-2">
                  {tells.map((t) => (
                    <li key={t.ts} className="flex items-center gap-3 rounded-xl border border-border bg-bg-elevated px-3 py-2">
                      <span className="rounded-md bg-primary/15 px-2 py-0.5 font-mono text-caption text-primary">{t.ts}</span>
                      <span className="flex-1 text-small text-text-primary">{t.label}</span>
                      <ChevronUp className="size-4 text-text-secondary" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex gap-3">
                <button onClick={() => router.push("/train/deepfake")} className="flex-1 rounded-xl border border-border bg-bg-elevated py-3 text-small font-semibold text-text-primary">
                  Back to challenges
                </button>
                <button onClick={() => router.push(`/train/deepfake/${challenges[(challenges.findIndex(c=>c.id===id)+1) % challenges.length].id}`)} className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-primary py-3 text-small font-bold text-primary-foreground">
                  Next challenge <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
