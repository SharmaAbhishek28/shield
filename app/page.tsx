"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/**
 * Splash screen — `/`
 *
 * Animated hexagonal SHIELD logo draws itself, the wordmark fades in
 * letter-by-letter, then auto-redirects to /login after 1.5s.
 *
 * Built in Step 1 mostly so setup is visually verifiable. The full
 * component library and route tree comes in Steps 2+.
 */
export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.push("/login"), 1500);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-bg">
      {/* Soft orange halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-gradient"
      />

      <div className="relative flex flex-col items-center gap-6 px-6 text-center">
        {/* Hexagonal shield logo — drawn stroke-by-stroke, then filled */}
        <motion.svg
          width="120"
          height="138"
          viewBox="0 0 120 138"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M60 4 L112 34 L112 94 L60 134 L8 94 L8 34 Z"
            stroke="#FF8F1F"
            strokeWidth="2.5"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, fillOpacity: 0 },
              visible: {
                pathLength: 1,
                fillOpacity: 0.08,
                transition: {
                  pathLength: { duration: 1.1, ease: "easeInOut" },
                  fillOpacity: { delay: 1.0, duration: 0.5 },
                },
              },
            }}
            fill="#FF8F1F"
          />
          {/* Inner mark — abstract "S" hex */}
          <motion.path
            d="M44 50 H76 M44 70 H76 M44 90 H76"
            stroke="#FF8F1F"
            strokeWidth="3"
            strokeLinecap="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { delay: 0.4, duration: 0.8, ease: "easeOut" },
              },
            }}
          />
        </motion.svg>

        {/* Wordmark — letter-by-letter fade-in */}
        <div className="flex gap-[2px] text-display font-black tracking-[0.18em] text-text-primary">
          {"SHIELD".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.06, duration: 0.3 }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.4 }}
          className="text-small text-text-secondary"
        >
          Cognitive Protection &amp; Dominance
        </motion.p>
      </div>

      {/* Classification banner */}
      <div className="absolute inset-x-0 bottom-0 classification-banner">
        For Official Use Only
      </div>
    </main>
  );
}
