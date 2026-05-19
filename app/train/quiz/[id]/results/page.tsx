"use client";

import Link from "next/link";
import { useSearchParams, useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, Trophy, Clock, Target, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QuizResultsPage() {
  const params = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const score = Number(params.get("score") ?? 0);
  const total = Number(params.get("total") ?? 10);
  const secs = Number(params.get("time") ?? 0);
  const calib = Number(params.get("calib") ?? 0);
  const pct = Math.round((score / total) * 100);

  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v));
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const unsub = display.on("change", setShown);
    const c = animate(mv, score, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return () => { unsub(); c.stop(); };
  }, [mv, display, score]);

  const grade = pct >= 90 ? "Excellent" : pct >= 75 ? "Strong" : pct >= 50 ? "Solid" : "Needs work";

  const confetti = useMemo(() => Array.from({ length: 36 }, () => ({
    x: Math.random() * 100, delay: Math.random() * 0.5, rotate: Math.random() * 360,
    travel: 50 + Math.random() * 60,
  })), []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg pb-24">
      {/* Confetti */}
      {pct >= 80 && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {confetti.map((c, i) => (
            <motion.span key={i}
              initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: `${c.travel}vh`, opacity: 0, rotate: c.rotate }}
              transition={{ duration: 2.4, delay: c.delay, ease: "easeOut" }}
              className="absolute size-2 rounded-sm bg-primary"
            />
          ))}
        </div>
      )}

      <header className="mx-auto flex max-w-screen-md items-center gap-3 px-5 pt-4">
        <Link href="/train/quiz" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h2 text-text-primary">Quiz results</h1>
      </header>

      <section className="mx-auto mt-8 max-w-screen-md px-5 text-center">
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-caption uppercase text-primary">{grade}</motion.p>
        <motion.p initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="mt-1 text-[64px] font-black leading-none text-gradient-primary tabular-nums">
          {shown} / {total}
        </motion.p>
        <p className="mt-1 text-h2 text-text-primary">{pct}%</p>
      </section>

      <section className="mx-auto mt-8 grid max-w-screen-md grid-cols-3 gap-3 px-5">
        <Stat label="Accuracy" value={`${pct}%`} icon={Target} />
        <Stat label="Avg time" value={`${(secs/total).toFixed(1)}s`} icon={Clock} />
        <Stat label="Calibration" value={`${calib}/${total*2}`} icon={Trophy} />
      </section>

      <section className="mx-auto mt-6 max-w-screen-md px-5">
        <div className="surface p-5 text-center">
          <p className="text-caption uppercase text-primary">XP earned</p>
          <p className="mt-1 text-display text-text-primary">+{score * 25 + calib * 10}</p>
          <p className="text-small text-text-secondary">{score * 25} for correct + {calib * 10} calibration bonus</p>
        </div>
      </section>

      <div className="mx-auto mt-6 flex max-w-screen-md gap-3 px-5">
        <Link href={`/train/quiz/${id}`} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-bg-elevated py-3 text-small font-semibold text-text-primary">
          <RefreshCw className="size-4" />
          Retake quiz
        </Link>
        <Link href={`/learn/${id}`} className="flex-1 rounded-xl bg-primary py-3 text-center text-small font-bold text-primary-foreground">
          Back to pillar
        </Link>
      </div>
    </main>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className={cn("surface flex flex-col items-start gap-2 p-4")}>
      <Icon className="size-4 text-primary" />
      <span className="text-caption uppercase text-text-secondary">{label}</span>
      <span className="text-h3 font-bold text-text-primary tabular-nums">{value}</span>
    </div>
  );
}
