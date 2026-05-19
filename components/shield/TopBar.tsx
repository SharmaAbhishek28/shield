"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useUser } from "@/lib/stores/useUser";
import { cn } from "@/lib/utils";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function TopBar({ className }: { className?: string }) {
  const { rank, fullName } = useUser();
  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between gap-3 px-5 py-4",
        "bg-bg/85 backdrop-blur-md border-b border-border/60",
        className
      )}
    >
      <div className="min-w-0">
        <p className="text-small text-text-secondary">{greeting()},</p>
        <h1 className="truncate text-h3 font-bold text-text-primary">
          {rank} {fullName}
        </h1>
      </div>

      <motion.button
        whileTap={{ scale: 0.92 }}
        aria-label="Notifications"
        className="relative grid size-10 place-items-center rounded-full border border-border bg-bg-elevated text-text-primary transition hover:bg-bg-elevated/70"
      >
        <Bell className="size-5" />
        <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-bg" />
      </motion.button>
    </header>
  );
}
