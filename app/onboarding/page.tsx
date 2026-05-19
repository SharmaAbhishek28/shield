"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

/**
 * `/onboarding` placeholder.
 *
 * The full 4-slide swipeable carousel (Welcome → Six Pillars hex reveal →
 * Train/Test/Dominate → personalised greeting + CTA) is **Step 4** of the
 * build plan. This stub keeps the navigation chain unbroken on Vercel
 * until then.
 */
export default function OnboardingPlaceholder() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[480px] rounded-2xl border border-border bg-bg-surface/80 p-8 text-center backdrop-blur-md glow-border"
      >
        <div className="mx-auto grid size-14 place-items-center rounded-xl border border-border bg-bg-elevated text-primary">
          <Sparkles className="size-7" />
        </div>
        <h1 className="mt-5 text-h1 font-bold text-text-primary">Onboarding</h1>
        <p className="mt-2 text-body text-text-secondary">
          The full 4-slide carousel — Welcome, Six Pillars hex reveal, Train ·
          Test · Dominate, personalised greeting — is{" "}
          <span className="text-text-primary">Step 4</span> in the build plan.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-elevated px-4 py-2.5 text-small font-semibold text-text-primary transition hover:bg-bg-elevated/70"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <Link
            href="/home"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-small font-semibold text-primary-foreground transition hover:bg-primary-dark"
          >
            Begin Training
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
