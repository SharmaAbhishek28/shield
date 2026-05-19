"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Download } from "lucide-react";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, stagger } from "@/lib/animations";

const certs = [
  { id: "c1", title: "Sense — Mastery Certificate", issued: "2025-10-22", expiresAt: "2026-10-22" },
  { id: "c2", title: "Deepfake Recognition · Specialist", issued: "2025-12-04", expiresAt: "2026-12-04" },
];

export default function CertificatesPage() {
  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/profile" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h1 text-text-primary">Certificates</h1>
      </header>

      <motion.ul variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-screen-sm space-y-3 px-5">
        {certs.map((c) => (
          <motion.li key={c.id} variants={cardEnter} className="surface flex items-center gap-4 p-4">
            <div className="grid size-12 place-items-center rounded-xl border border-primary/40 bg-primary/15 text-primary">
              <Award className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-h3 text-text-primary">{c.title}</p>
              <p className="text-small text-text-secondary">Issued {c.issued} · Expires {c.expiresAt}</p>
            </div>
            <button aria-label="Download" className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elevated text-text-secondary">
              <Download className="size-4" />
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <BottomTabBar />
    </main>
  );
}
