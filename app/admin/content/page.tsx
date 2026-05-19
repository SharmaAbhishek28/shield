"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, GripVertical, Plus, Search } from "lucide-react";
import pillarsJson from "@/data/pillars.json";
import partsJson from "@/data/parts.json";
import type { Pillar, Part } from "@/lib/types";
import { Icon } from "@/components/shield/Icon";
import { cn } from "@/lib/utils";

const pillars = pillarsJson as Pillar[];
const partsByPillar = partsJson as Record<string, Part[]>;

export default function AdminContentPage() {
  const [active, setActive] = useState(pillars[0].slug);
  const parts = partsByPillar[active] ?? [];

  return (
    <main className="min-h-screen bg-bg pb-10">
      <header className="mx-auto flex max-w-screen-md items-center gap-3 px-5 pt-4">
        <Link href="/admin" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <div>
          <p className="text-caption uppercase text-primary">Admin</p>
          <h1 className="text-h1 text-text-primary">Content</h1>
        </div>
      </header>

      <div className="mx-auto mt-5 grid max-w-screen-md gap-4 px-5 md:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="surface p-3">
          <p className="px-2 py-1 text-caption uppercase text-text-secondary">Pillars</p>
          <ul>
            {pillars.map((p) => (
              <li key={p.slug}>
                <button onClick={() => setActive(p.slug)} className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-small",
                  active === p.slug ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-bg-elevated")}>
                  <Icon name={p.icon} className="size-4" style={{ color: p.color }} />
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <section className="surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-border bg-bg-elevated px-2">
              <Search className="size-4 text-text-secondary" />
              <input placeholder="Search parts" className="flex-1 bg-transparent text-small text-text-primary outline-none placeholder:text-text-muted" />
            </div>
            <button className="inline-flex h-10 items-center gap-1 rounded-lg bg-primary px-3 text-small font-bold text-primary-foreground">
              <Plus className="size-4" /> Part
            </button>
          </div>

          <motion.ul layout className="space-y-2">
            {parts.map((part) => (
              <motion.li layout key={part.id} className="flex items-center gap-3 rounded-lg border border-border bg-bg-elevated px-3 py-2.5">
                <GripVertical className="size-4 text-text-muted" />
                <FileText className="size-4 text-text-secondary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-small font-semibold text-text-primary">{part.order}. {part.title}</p>
                  <p className="truncate text-caption text-text-secondary">{part.contentTypes.join(" · ")} · {part.durationMins} min</p>
                </div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                  part.status === "completed" && "bg-success/15 text-success",
                  part.status === "in-progress" && "bg-primary/15 text-primary",
                  part.status === "available" && "bg-info/15 text-info",
                  part.status === "locked" && "bg-bg-surface text-text-muted")}>
                  {part.status}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </div>
    </main>
  );
}
