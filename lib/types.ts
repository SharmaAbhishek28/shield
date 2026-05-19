export type LucideKey =
  | "radar"
  | "users"
  | "eye"
  | "shield"
  | "compass"
  | "crown"
  | "flag"
  | "flame"
  | "target"
  | "zap"
  | "video";

export interface User {
  id: string;
  serviceId: string;
  rank: string;
  fullName: string;
  unit: string;
  xp: number;
  level: number;
  nextLevelXp: number;
  streakCount: number;
  streakFreezes: number;
  joinedAt: string;
  unitRank: number;
  unitRankTrend: number[];
}

export interface Pillar {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  icon: LucideKey;
  progress: number;
}

export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  xp: number;
  icon: LucideKey;
  progress: number;
  target: number;
  claimed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: LucideKey;
  unlockedAt: string | null;
}

export interface ContinueLearning {
  pillarSlug: string;
  pillarName: string;
  partTitle: string;
  progress: number;
  durationMins: number;
  thumbnailHue: number;
}
