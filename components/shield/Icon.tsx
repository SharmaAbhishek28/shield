"use client";

import {
  Radar,
  Users,
  Eye,
  Shield,
  Compass,
  Crown,
  Flag,
  Flame,
  Target,
  Zap,
  Video,
  type LucideProps,
} from "lucide-react";
import type { LucideKey } from "@/lib/types";

const map = {
  radar: Radar,
  users: Users,
  eye: Eye,
  shield: Shield,
  compass: Compass,
  crown: Crown,
  flag: Flag,
  flame: Flame,
  target: Target,
  zap: Zap,
  video: Video,
} as const;

/**
 * Resolve a string key (from JSON) to a Lucide icon component.
 * Centralised here so JSON files stay readable and we never end up
 * with emoji as a fallback.
 */
export function Icon({
  name,
  ...rest
}: { name: LucideKey } & LucideProps) {
  const C = map[name] ?? Shield;
  return <C {...rest} />;
}
