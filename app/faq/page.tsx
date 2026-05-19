"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Search } from "lucide-react";
import data from "@/data/faq.json";
import type { FaqItem } from "@/lib/types";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cn } from "@/lib/utils";

const items = data as FaqItem[];
const categories = ["All", "Account", "Training", "Technical", "Security"] as const;
type Category = typeof categories[number];

export default function FaqPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category>("All");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const inCat = cat === "All" || it.category === cat;
      const text = (it.q + " " + it.a).toLowerCase();
      return inCat && text.includes(q.toLowerCase());
    });
  }, [q, cat]);

  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/more" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h1 text-text-primary">FAQ</h1>
      </header>

      <div className="mx-auto mt-5 max-w-screen-sm px-5">
        <div className="flex h-11 items-center gap-2 rounded-xl border border-border bg-bg-elevated px-3 transition-colors focus-within:border-primary/70">
          <Search className="size-4 text-text-secondary" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-muted" />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cn("rounded-full border px-3 py-1.5 text-caption font-semibold whitespace-nowrap transition",
              cat === c ? "border-primary bg-primary/15 text-primary" : "border-border bg-bg-elevated text-text-secondary")}>
              {c}
            </button>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          {filtered.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="surface overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left">
                  <div className="min-w-0 flex-1">
                    <p className="text-caption uppercase text-text-secondary">{it.category}</p>
                    <p className="text-small font-semibold text-text-primary">{it.q}</p>
                  </div>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown className="size-4 text-text-secondary" /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-border">
                      <p className="px-4 py-3 text-small text-text-secondary">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
          {filtered.length === 0 && <li className="text-center text-small text-text-muted">No matches.</li>}
        </ul>
      </div>

      <BottomTabBar />
    </main>
  );
}
