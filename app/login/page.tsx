"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  Fingerprint,
  KeyRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Login screen — `/login`
 *
 * Spec (Step 4 of the build plan, surfaced early to fix the splash 404):
 *  - Centered card, full-bleed dark with hex-grid pattern in the background.
 *  - SHIELD logo at top + tagline.
 *  - Service ID + Password (with eye toggle) + Remember this device.
 *  - Top-right language toggle EN / हिं.
 *  - Authenticate CTA — full-width orange, loading spinner on submit.
 *  - On submit: navigate to /onboarding (first-time) or /home (returning).
 *  - Classification banner at the bottom.
 *
 * Real validation comes in Step 4 when we wire react-hook-form + zod;
 * for now we skip validation and just route.
 */
export default function LoginPage() {
  const router = useRouter();

  const [serviceId, setServiceId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [firstTime, setFirstTime] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [loading, setLoading] = useState(false);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Skip real auth — just navigate after a short delay so the spinner is visible
    setTimeout(() => {
      router.push(firstTime ? "/onboarding" : "/home");
    }, 700);
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-bg px-5 py-10">
      {/* Soft orange halo at the top */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-hero-gradient"
      />

      {/* Language toggle — top right */}
      <div className="absolute right-5 top-5 z-10">
        <LangToggle value={lang} onChange={setLang} />
      </div>

      {/* Card */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative w-full max-w-[420px]",
          "rounded-2xl border border-border bg-bg-surface/80 backdrop-blur-md",
          "p-7 sm:p-8 glow-border"
        )}
      >
        {/* Logo + tagline */}
        <div className="mb-7 flex flex-col items-center text-center">
          <ShieldMark />
          <h1 className="mt-3 text-h2 font-extrabold tracking-[0.18em] text-text-primary">
            SHIELD
          </h1>
          <p className="mt-1 text-small text-text-secondary">
            {lang === "EN"
              ? "Cognitive Protection & Dominance"
              : "Sangyaanaatmak Suraksha aur Prabhutva"}
          </p>
        </div>

        <form onSubmit={handleAuthenticate} className="space-y-4">
          <Field
            id="serviceId"
            label={lang === "EN" ? "Service ID" : "Sewa Pehchaan"}
            value={serviceId}
            onChange={setServiceId}
            placeholder={
              lang === "EN" ? "Enter your Service ID" : "Apni Sewa ID daalein"
            }
            icon={<Fingerprint className="size-4" />}
            autoComplete="username"
          />

          <Field
            id="password"
            label={lang === "EN" ? "Password" : "Paasvard"}
            value={password}
            onChange={setPassword}
            placeholder={lang === "EN" ? "Enter password" : "Paasvard daalein"}
            type={showPwd ? "text" : "password"}
            icon={<KeyRound className="size-4" />}
            autoComplete="current-password"
            trailing={
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? "Hide password" : "Show password"}
                className="rounded-md p-1 text-text-secondary transition hover:text-text-primary"
              >
                {showPwd ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            }
          />

          {/* Remember + First-time toggle */}
          <div className="flex items-center justify-between pt-1">
            <Checkbox
              checked={remember}
              onChange={setRemember}
              label={
                lang === "EN" ? "Remember this device" : "Is device ko yaad rakhein"
              }
            />
            <Checkbox
              checked={firstTime}
              onChange={setFirstTime}
              label={lang === "EN" ? "First-time setup" : "Pehli baar"}
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className={cn(
              "mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl",
              "bg-primary text-primary-foreground text-h3 font-bold",
              "shadow-inner-glow-primary",
              "transition hover:bg-primary-dark",
              "disabled:cursor-not-allowed disabled:opacity-80"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>{lang === "EN" ? "Authenticating…" : "Pramaanit ho raha…"}</span>
              </>
            ) : (
              <>
                <ShieldCheck className="size-5" />
                <span>{lang === "EN" ? "Authenticate" : "Pramaanit karein"}</span>
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-between pt-2 text-small">
            <button
              type="button"
              className="text-secondary-light transition hover:text-info"
            >
              {lang === "EN" ? "Forgot password" : "Paasvard bhool gaye"}
            </button>
            <button
              type="button"
              className="text-secondary-light transition hover:text-info"
            >
              {lang === "EN" ? "First-time setup" : "Pehli baar setup"}
            </button>
          </div>
        </form>
      </motion.section>

      {/* Classification banner */}
      <div className="absolute inset-x-0 bottom-0 classification-banner">
        For Official Use Only
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Small local components — these will be replaced by shadcn in Step 2 */
/* ------------------------------------------------------------------ */

function ShieldMark() {
  return (
    <svg width="48" height="55" viewBox="0 0 120 138" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 4 L112 34 L112 94 L60 134 L8 94 L8 34 Z"
        stroke="#FF8F1F"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="#FF8F1F"
        fillOpacity="0.08"
      />
      <path
        d="M44 50 H76 M44 70 H76 M44 90 H76"
        stroke="#FF8F1F"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Field(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  autoComplete?: string;
}) {
  const {
    id,
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    icon,
    trailing,
    autoComplete,
  } = props;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-caption uppercase tracking-[0.5px] text-text-secondary"
      >
        {label}
      </label>
      <div
        className={cn(
          "group flex h-11 items-center gap-2 rounded-xl",
          "border border-border bg-bg-elevated px-3",
          "transition-colors focus-within:border-primary/70",
          "focus-within:shadow-inner-glow-primary"
        )}
      >
        {icon ? <span className="text-text-secondary">{icon}</span> : null}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cn(
            "flex-1 bg-transparent text-body text-text-primary outline-none",
            "placeholder:text-text-muted"
          )}
        />
        {trailing}
      </div>
    </div>
  );
}

function Checkbox(props: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  const { checked, onChange, label } = props;
  return (
    <label className="flex cursor-pointer select-none items-center gap-2 text-small text-text-secondary">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "grid size-[18px] place-items-center rounded-md border transition-colors",
          checked
            ? "border-primary bg-primary"
            : "border-border bg-bg-elevated hover:border-text-secondary"
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 12"
            width="10"
            height="10"
            className="text-primary-foreground"
          >
            <path
              d="M2 6.5 L5 9.5 L10 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        ) : null}
      </button>
      <span>{label}</span>
    </label>
  );
}

function LangToggle(props: {
  value: "EN" | "HI";
  onChange: (v: "EN" | "HI") => void;
}) {
  const { value, onChange } = props;
  const options: Array<{ id: "EN" | "HI"; label: string }> = [
    { id: "EN", label: "EN" },
    { id: "HI", label: "हिं" },
  ];
  return (
    <div className="relative flex rounded-full border border-border bg-bg-surface/80 p-1 backdrop-blur-md">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={cn(
              "relative z-10 rounded-full px-3 py-1 text-caption font-semibold transition-colors",
              active ? "text-primary-foreground" : "text-text-secondary"
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 z-[-1] rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
              />
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
