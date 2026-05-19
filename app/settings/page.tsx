"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Bell, Globe, Lock, Moon, Trash2, LogOut, Download, ShieldAlert, ChevronRight,
} from "lucide-react";
import { BottomTabBar } from "@/components/shield/BottomTabBar";
import { cardEnter, stagger } from "@/lib/animations";
import { cn } from "@/lib/utils";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)}
      className={cn("relative h-6 w-11 rounded-full transition-colors", value ? "bg-primary" : "bg-bg-elevated border border-border")}>
      <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn("absolute top-0.5 size-5 rounded-full bg-text-primary shadow", value ? "left-[22px]" : "left-0.5")} />
    </button>
  );
}

function Row({ icon: Icon, label, sub, right }: { icon: React.ComponentType<{ className?: string }>; label: string; sub?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-bg-elevated px-4 py-3">
      <Icon className="size-5 text-primary" />
      <div className="min-w-0 flex-1">
        <p className="text-small font-semibold text-text-primary">{label}</p>
        {sub && <p className="text-caption text-text-secondary">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export default function SettingsPage() {
  const [twofa, setTwofa] = useState(true);
  const [notif, setNotif] = useState(true);
  const [lowbw, setLowbw] = useState(false);
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [confirmLogout, setConfirmLogout] = useState(false);

  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/more" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h1 text-text-primary">Settings</h1>
      </header>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto mt-5 max-w-screen-sm space-y-6 px-5">
        <motion.section variants={cardEnter}>
          <h2 className="mb-2 text-caption uppercase text-text-secondary">Account</h2>
          <div className="space-y-2">
            <Row icon={Lock} label="Two-factor authentication" sub="Authenticator app + service token" right={<Toggle value={twofa} onChange={setTwofa} />} />
            <Row icon={ChevronRight} label="Change password" right={<ChevronRight className="size-4 text-text-secondary" />} />
          </div>
        </motion.section>

        <motion.section variants={cardEnter}>
          <h2 className="mb-2 text-caption uppercase text-text-secondary">Preferences</h2>
          <div className="space-y-2">
            <Row icon={Globe} label="Language" sub="Interface language"
              right={
                <div className="flex rounded-full border border-border bg-bg-surface p-0.5">
                  {(["EN", "HI"] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)} className={cn("relative rounded-full px-2.5 py-1 text-caption font-bold", lang===l ? "text-primary-foreground" : "text-text-secondary")}>
                      {lang===l && <motion.span layoutId="lang-set" className="absolute inset-0 z-[-1] rounded-full bg-primary" transition={{ type:"spring", stiffness:500, damping:32 }} />}
                      {l}
                    </button>
                  ))}
                </div>
              }
            />
            <Row icon={Moon} label="Dark mode" sub="Always on for SHIELD" right={<Toggle value={dark} onChange={setDark} />} />
            <Row icon={Bell} label="Notifications" sub="Streak, missions, comms" right={<Toggle value={notif} onChange={setNotif} />} />
          </div>
        </motion.section>

        <motion.section variants={cardEnter}>
          <h2 className="mb-2 text-caption uppercase text-text-secondary">Training</h2>
          <div className="space-y-2">
            <Row icon={Download} label="Low-bandwidth mode" sub="Pre-cache content overnight" right={<Toggle value={lowbw} onChange={setLowbw} />} />
            <Row icon={Download} label="Offline downloads" sub="Manage stored Parts" right={<ChevronRight className="size-4 text-text-secondary" />} />
          </div>
        </motion.section>

        <motion.section variants={cardEnter}>
          <h2 className="mb-2 text-caption uppercase text-text-secondary">Privacy</h2>
          <div className="space-y-2">
            <Row icon={Download} label="Download my data" right={<ChevronRight className="size-4 text-text-secondary" />} />
            <Row icon={Trash2} label="Delete account" sub="Permanent — requires verification" right={<ChevronRight className="size-4 text-danger" />} />
          </div>
        </motion.section>

        <motion.section variants={cardEnter}>
          <h2 className="mb-2 text-caption uppercase text-text-secondary">About</h2>
          <div className="space-y-2">
            <Row icon={ShieldAlert} label="Version" sub="SHIELD prototype v0.3.0" right={<span className="text-caption text-text-muted">build 2026.05</span>} />
            <Row icon={ShieldAlert} label="Classification" sub="For Official Use Only" right={<span className="text-caption text-warning">FOUO</span>} />
          </div>
        </motion.section>

        <motion.button variants={cardEnter} onClick={() => setConfirmLogout(true)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-danger/40 bg-danger/10 py-3 text-small font-bold text-danger">
          <LogOut className="size-4" /> Log out
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {confirmLogout && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-bg/70 px-5 backdrop-blur-md">
            <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }} className="w-full max-w-[380px] rounded-2xl border border-border bg-bg-surface p-5">
              <p className="text-caption uppercase text-danger">Confirm</p>
              <h3 className="mt-1 text-h2 text-text-primary">Log out of SHIELD?</h3>
              <p className="mt-1 text-small text-text-secondary">You&apos;ll need to authenticate again with your Service ID.</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => setConfirmLogout(false)} className="flex-1 rounded-xl border border-border bg-bg-elevated py-2.5 text-small font-semibold text-text-primary">Cancel</button>
                <Link href="/login" className="flex-1 rounded-xl bg-danger py-2.5 text-center text-small font-bold text-text-primary">Log out</Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTabBar />
    </main>
  );
}
