"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, XCircle, Timer } from "lucide-react";
import quizSample from "@/data/quiz-sample.json";
import type { Quiz } from "@/lib/types";
import { cn } from "@/lib/utils";

const quiz = quizSample as Quiz;

export default function QuizPlayPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const total = quiz.questions.length;

  const [idx, setIdx] = useState(0);
  const [picks, setPicks] = useState<Array<number | null>>(() => Array(total).fill(null));
  const [conf, setConf] = useState<Array<"Low"|"Medium"|"High">>(() => Array(total).fill("Medium"));
  const [revealed, setRevealed] = useState(false);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const q = quiz.questions[idx];
  const options = useMemo(() => q.type === "mcq" ? q.options : ["True", "False"], [q]);
  const correct = q.correct;
  const picked = picks[idx];

  const select = (i: number) => {
    if (revealed) return;
    const next = [...picks]; next[idx] = i; setPicks(next);
  };

  const submitOrNext = () => {
    if (!revealed) { setRevealed(true); return; }
    if (idx + 1 < total) {
      setIdx(idx + 1); setRevealed(false);
    } else {
      // Stash results in URL params for the results screen (no real DB)
      const score = picks.reduce<number>((s, p, i) => s + (p === quiz.questions[i].correct ? 1 : 0), 0);
      const calib = picks.reduce<number>((s, p, i) => {
        const c = conf[i]; const right = p === quiz.questions[i].correct;
        return s + (right && c === "High" ? 2 : right && c === "Medium" ? 1 : !right && c === "Low" ? 1 : 0);
      }, 0);
      router.push(`/train/quiz/${id}/results?score=${score}&total=${total}&time=${secs}&calib=${calib}`);
    }
  };

  return (
    <main className="min-h-screen bg-bg pb-32">
      <header className="mx-auto flex max-w-screen-md items-center justify-between gap-3 px-5 pt-4">
        <div className="flex items-center gap-3">
          <Link href="/train/quiz" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
          <div>
            <p className="text-caption uppercase text-primary">{quiz.title}</p>
            <p className="text-small text-text-secondary">Question {idx+1} of {total}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-small tabular-nums text-text-primary">
          <Timer className="size-4 text-primary" />
          {Math.floor(secs/60).toString().padStart(2,"0")}:{(secs%60).toString().padStart(2,"0")}
        </span>
      </header>

      {/* progress dots */}
      <div className="mx-auto mt-4 flex max-w-screen-md gap-1.5 px-5">
        {quiz.questions.map((_, i) => (
          <div key={i} className={cn("h-1.5 flex-1 rounded-full", i < idx ? "bg-primary" : i === idx ? "bg-primary/50" : "bg-bg-elevated")} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={q.id}
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -30, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-screen-md space-y-5 px-5"
        >
          <h2 className="text-h2 text-text-primary">{q.prompt}</h2>

          <ul className="space-y-2">
            {options.map((opt, i) => {
              const isPicked = picked === i;
              const isCorrect = i === correct;
              return (
                <li key={opt}>
                  <motion.button
                    whileTap={!revealed ? { scale: 0.98 } : undefined}
                    onClick={() => select(i)}
                    className={cn("flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-body transition",
                      !revealed && isPicked && "border-primary bg-primary/10 text-text-primary",
                      !revealed && !isPicked && "border-border bg-bg-elevated text-text-primary hover:border-text-secondary",
                      revealed && isCorrect && "border-success/60 bg-success/10 text-success",
                      revealed && !isCorrect && isPicked && "border-danger/60 bg-danger/10 text-danger",
                      revealed && !isCorrect && !isPicked && "border-border bg-bg-elevated text-text-muted")}
                  >
                    <span>{opt}</span>
                    {revealed && isCorrect && <CheckCircle2 className="size-4" />}
                    {revealed && !isCorrect && isPicked && <XCircle className="size-4" />}
                  </motion.button>
                </li>
              );
            })}
          </ul>

          {!revealed && (
            <div className="surface p-4">
              <p className="text-caption uppercase text-text-secondary">Confidence</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {(["Low","Medium","High"] as const).map((c) => (
                  <button key={c} onClick={() => { const arr=[...conf]; arr[idx]=c; setConf(arr); }} className={cn("rounded-xl border px-3 py-2.5 text-small font-semibold transition",
                    conf[idx]===c ? "border-primary bg-primary/10 text-primary" : "border-border bg-bg-elevated text-text-secondary")}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {revealed && (
              <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} className="rounded-xl border border-info/30 bg-info/5 p-4 text-small text-text-secondary">
                <p className="text-caption uppercase text-info">Explanation</p>
                <p className="mt-1 text-text-primary">{q.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto max-w-screen-md p-4">
          <motion.button
            whileTap={picked !== null ? { scale: 0.97 } : undefined}
            disabled={picked === null}
            onClick={submitOrNext}
            className={cn("flex h-12 w-full items-center justify-center rounded-xl text-h3 font-bold transition",
              picked === null ? "bg-bg-elevated text-text-muted" : "bg-primary text-primary-foreground")}
          >
            {revealed ? (idx+1 === total ? "See results" : "Next question") : "Submit"}
          </motion.button>
        </div>
      </div>
    </main>
  );
}
