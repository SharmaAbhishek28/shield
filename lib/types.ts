export type LucideKey =
  | "radar" | "users" | "eye" | "shield" | "compass" | "crown"
  | "flag" | "flame" | "target" | "zap" | "video";

export interface User {
  id: string; serviceId: string; rank: string; fullName: string;
  unit: string; xp: number; level: number; nextLevelXp: number;
  streakCount: number; streakFreezes: number; joinedAt: string;
  unitRank: number; unitRankTrend: number[];
}

export interface Pillar {
  slug: string; name: string; tagline: string; color: string;
  icon: LucideKey; progress: number;
}

export interface Mission {
  id: string; title: string; subtitle: string; xp: number;
  icon: LucideKey; progress: number; target: number; claimed: boolean;
}

export interface Badge {
  id: string; name: string; description: string;
  icon: LucideKey; unlockedAt: string | null;
}

export interface ContinueLearning {
  pillarSlug: string; pillarName: string; partTitle: string;
  progress: number; durationMins: number; thumbnailHue: number;
}

export type PartStatus = "locked" | "available" | "in-progress" | "completed";

export interface Part {
  id: string; order: number; title: string; description: string;
  durationMins: number; status: PartStatus;
  contentTypes: Array<"video" | "text" | "quiz" | "interactive">;
}

export interface LeaderRow {
  id: string; name: string; unit: string; xp: number;
  rank: number; trend: "up" | "down" | "same"; isMe?: boolean;
}

export type DeepfakeFormat = "compare" | "frame" | "realtime";

export interface DeepfakeChallenge {
  id: string; title: string; format: DeepfakeFormat;
  difficulty: string; durationSecs: number; reward: number;
}

export interface QuizQuestionMCQ {
  id: string; type: "mcq";
  prompt: string; options: string[]; correct: number; explanation: string;
}
export interface QuizQuestionTF {
  id: string; type: "tf";
  prompt: string; correct: 0 | 1; explanation: string;
}
export type QuizQuestion = QuizQuestionMCQ | QuizQuestionTF;

export interface Quiz {
  id: string; pillar: string; title: string; questions: QuizQuestion[];
}

export interface FaqItem { category: string; q: string; a: string; }
