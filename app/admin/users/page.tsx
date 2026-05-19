"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, MoreHorizontal } from "lucide-react";
import data from "@/data/leaderboard.json";
import type { LeaderRow } from "@/lib/types";
import { cardEnter, stagger } from "@/lib/animations";
import { cn, formatNumber } from "@/lib/utils";

const rows = data as LeaderRow[];

export default function AdminUsersPage() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState<"All" | "Operator" | "Admin">("All");

  const filtered = useMemo(() => rows.filter((r) =>
    (role === "All" || (role === "Admin" ? r.isMe : !r.isMe)) &&
    (q === "" || r.name.toLowerCase().includes(q.toLowerCase()) || r.unit.toLowerCase().includes(q.toLowerCase()))
  ), [q, role]);

  return (
    <main className="min-h-screen bg-bg pb-10">
      <header className="mx-auto flex max-w-screen-md items-center gap-3 px-5 pt-4">
        <Link href="/admin" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h1 text-text-primary">Users</h1>
      </header>

      <div className="mx-auto mt-4 max-w-screen-md px-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-border bg-bg-elevated px-2">
            <Search className="size-4 text-text-secondary" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or unit" className="flex-1 bg-transparent text-small text-text-primary outline-none placeholder:text-text-muted" />
          </div>
          <div className="flex rounded-full border border-border bg-bg-elevated p-1">
            {(["All", "Operator", "Admin"] as const).map((r) => (
              <button key={r} onClick={() => setRole(r)} className={cn("rounded-full px-3 py-1.5 text-caption font-semibold transition",
                role === r ? "bg-primary text-primary-foreground" : "text-text-secondary")}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible" className="surface mt-4 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 border-b border-border bg-bg-elevated px-4 py-2.5 text-caption uppercase text-text-secondary">
            <span>Name</span><span className="hidden sm:inline">Unit</span><span>XP</span><span className="w-6"></span>
          </div>
          <motion.ul>
            {filtered.map((u) => (
              <motion.li key={u.id} variants={cardEnter} className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-3 border-b border-border/70 px-4 py-3 last:border-b-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid size-8 place-items-center rounded-full bg-bg-elevated text-caption font-bold text-text-primary">
                    {u.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-small font-semibold text-text-primary">{u.name}</p>
                    <p className="truncate text-caption text-text-muted sm:hidden">{u.unit}</p>
                  </div>
                  {u.isMe && <span className="ml-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">Admin</span>}
                </div>
                <span className="hidden text-small text-text-secondary sm:inline">{u.unit}</span>
                <span className="text-small font-bold text-text-primary tabular-nums">{formatNumber(u.xp)}</span>
                <button aria-label="Row actions" className="grid size-8 place-items-center rounded-md text-text-secondary hover:bg-bg-elevated">
                  <MoreHorizontal className="size-4" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </main>
  );
}
