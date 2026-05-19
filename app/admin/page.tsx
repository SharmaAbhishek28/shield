"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Activity, Target, ScanFace, BarChart3, ShieldCheck, FileEdit } from "lucide-react";
import { cardEnter, pressable, stagger } from "@/lib/animations";
import { formatNumber } from "@/lib/utils";

const stats = [
  { label: "Active users (DAU)", value: 412, delta: "+8%", Icon: Users },
  { label: "Completion rate", value: "73%", delta: "+2.1pt", Icon: Activity },
  { label: "Avg quiz score", value: "81%", delta: "+1.3pt", Icon: Target },
  { label: "Deepfake detect rate", value: "76%", delta: "+4pt", Icon: ScanFace },
];

const activity = [
  { user: "Cpt. V. Iyer", action: "Cleared Sense Capstone", time: "2m" },
  { user: "Lt. T. Patel", action: "Spotted 8/10 deepfakes", time: "11m" },
  { user: "Major K. Rao", action: "Earned Eagle Eye badge", time: "18m" },
  { user: "Cpt. N. Singh", action: "Quiz · 90% (Sense)", time: "26m" },
  { user: "Lt. M. Sahay", action: "Joined SHIELD", time: "44m" },
];

const trendline = [38, 41, 39, 44, 48, 52, 49, 55, 60, 58, 63, 67];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-bg pb-12">
      <header className="mx-auto flex max-w-screen-md items-center gap-3 px-5 pt-4">
        <Link href="/more" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-primary">Restricted</p>
          <h1 className="text-h1 text-text-primary">Admin Console</h1>
        </div>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-screen-md space-y-6 px-5">
        <motion.div variants={cardEnter} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="surface p-4">
              <s.Icon className="size-4 text-primary" />
              <p className="mt-2 text-caption uppercase text-text-secondary">{s.label}</p>
              <p className="text-h2 font-extrabold text-text-primary tabular-nums">{s.value}</p>
              <p className="text-caption text-success">{s.delta}</p>
            </div>
          ))}
        </motion.div>

        <motion.section variants={cardEnter} className="surface p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption uppercase text-text-secondary">Training activity</p>
              <p className="text-h3 text-text-primary">Last 12 days</p>
            </div>
            <BarChart3 className="size-5 text-primary" />
          </div>
          <svg viewBox="0 0 400 120" className="mt-3 w-full">
            <defs>
              <linearGradient id="ag" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#FF8F1F" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#FF8F1F" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const max = Math.max(...trendline);
              const step = 400 / (trendline.length - 1);
              const pts = trendline.map((v, i) => `${i*step},${110 - (v/max)*90}`).join(" ");
              return (
                <>
                  <motion.polygon points={`0,110 ${pts} 400,110`} fill="url(#ag)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />
                  <motion.polyline points={pts} fill="none" stroke="#FF8F1F" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
                </>
              );
            })()}
          </svg>
        </motion.section>

        <div className="grid gap-3 sm:grid-cols-2">
          <motion.div variants={cardEnter} {...pressable}>
            <Link href="/admin/content" className="surface flex items-center gap-4 p-5">
              <FileEdit className="size-6 text-primary" />
              <div className="flex-1">
                <p className="text-h3 text-text-primary">Manage content</p>
                <p className="text-small text-text-secondary">Pillars, Parts, blocks</p>
              </div>
            </Link>
          </motion.div>
          <motion.div variants={cardEnter} {...pressable}>
            <Link href="/admin/users" className="surface flex items-center gap-4 p-5">
              <ShieldCheck className="size-6 text-primary" />
              <div className="flex-1">
                <p className="text-h3 text-text-primary">Manage users</p>
                <p className="text-small text-text-secondary">Roles, status, audit</p>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.section variants={cardEnter} className="surface p-5">
          <p className="text-caption uppercase text-text-secondary">Recent activity</p>
          <ul className="mt-3 divide-y divide-border/70">
            {activity.map((a, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <div>
                  <p className="text-small font-semibold text-text-primary">{a.user}</p>
                  <p className="text-caption text-text-secondary">{a.action}</p>
                </div>
                <span className="text-caption text-text-muted">{a.time}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        <p className="pb-2 text-center text-caption text-text-muted">Total enrolment: {formatNumber(1428)} operators</p>
      </motion.div>
    </main>
  );
}
