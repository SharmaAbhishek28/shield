"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Settings,
  HelpCircle,
  MessageSquare,
  Trophy,
  ShieldAlert,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { TopBar } from "@/components/shield/TopBar";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, stagger } from "@/lib/animations";

const items: Array<{ href: string; label: string; sub: string; Icon: LucideIcon }> = [
  { href: "/leaderboard", label: "Leaderboard", sub: "Unit, all units, global", Icon: Trophy },
  { href: "/settings", label: "Settings", sub: "Account, preferences, privacy", Icon: Settings },
  { href: "/faq", label: "FAQ", sub: "Account, training, security", Icon: HelpCircle },
  { href: "/feedback", label: "Feedback", sub: "Report an issue or suggest", Icon: MessageSquare },
  { href: "/admin", label: "Admin", sub: "Restricted — staff only", Icon: ShieldAlert },
];

export default function MorePage() {
  return (
    <main className="min-h-screen bg-bg pb-[96px]">
      <TopBar />

      <div className="mx-auto max-w-screen-sm px-5 pt-4">
        <h1 className="mb-4 text-h1 font-bold text-text-primary">More</h1>
        <motion.ul variants={stagger} initial="hidden" animate="visible" className="space-y-3">
          {items.map((it) => (
            <motion.li key={it.href} variants={cardEnter}>
              <Link
                href={it.href}
                className="surface flex items-center gap-4 p-4 transition hover:-translate-y-0.5"
              >
                <div className="grid size-10 place-items-center rounded-xl border border-border bg-bg-elevated text-primary">
                  <it.Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-body font-semibold text-text-primary">{it.label}</p>
                  <p className="text-small text-text-secondary">{it.sub}</p>
                </div>
                <ChevronRight className="size-4 text-text-secondary" />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <BottomTabBar />
    </main>
  );
}
