"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3 } from "lucide-react";

const completionByPillar = [
  { name: "Sense", value: 100, color: "#FF8F1F" },
  { name: "Harmonise", value: 75, color: "#3B82F6" },
  { name: "Interpret", value: 50, color: "#10B981" },
  { name: "Endure", value: 25, color: "#F59E0B" },
  { name: "Lead", value: 0, color: "#8B5CF6" },
  { name: "Dominate", value: 0, color: "#EF4444" },
];

export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen bg-bg pb-10">
      <header className="mx-auto flex max-w-screen-md items-center gap-3 px-5 pt-4">
        <Link href="/admin" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h1 text-text-primary">Analytics</h1>
      </header>

      <section className="mx-auto mt-5 max-w-screen-md space-y-3 px-5">
        <div className="surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-h3 text-text-primary">Pillar completion funnel</p>
            <BarChart3 className="size-5 text-primary" />
          </div>
          <ul className="mt-4 space-y-3">
            {completionByPillar.map((p, i) => (
              <li key={p.name}>
                <div className="flex items-center justify-between text-small">
                  <span className="text-text-primary">{p.name}</span>
                  <span className="text-text-secondary tabular-nums">{p.value}%</span>
                </div>
                <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-bg-elevated">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.value}%` }} transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full" style={{ background: p.color }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
