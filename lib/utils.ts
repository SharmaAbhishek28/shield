import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 * The canonical helper used by every shadcn-style component.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an integer with thousand separators, e.g. 4250 → "4,250". */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-IN").format(n);
}

/** Clamp a value between min and max (inclusive). */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Pluralise helper — `1 day`, `23 days`. */
export function plural(n: number, singular: string, pluralForm?: string): string {
  return `${n} ${n === 1 ? singular : pluralForm ?? `${singular}s`}`;
}
