"use client";

import { create } from "zustand";
import type { User } from "@/lib/types";
import seed from "@/data/user.json";

interface UserState extends User {
  setXp: (xp: number) => void;
  bumpStreak: () => void;
}

export const useUser = create<UserState>((set) => ({
  ...(seed as User),
  setXp: (xp) => set({ xp }),
  bumpStreak: () => set((s) => ({ streakCount: s.streakCount + 1 })),
}));
