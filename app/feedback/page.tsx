"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Send, UploadCloud } from "lucide-react";
import { BottomTabBar } from "@/components/shield/BottomTabBar";

const categories = ["Bug", "Idea", "Content", "Other"] as const;

export default function FeedbackPage() {
  const [category, setCategory] = useState<typeof categories[number]>("Bug");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2200);
    setSubject(""); setBody("");
  };

  return (
    <main className="min-h-screen bg-bg pb-[110px]">
      <header className="mx-auto flex max-w-screen-sm items-center gap-3 px-5 pt-4">
        <Link href="/more" className="grid size-10 place-items-center rounded-full border border-border bg-bg-elevated"><ArrowLeft className="size-4" /></Link>
        <h1 className="text-h1 text-text-primary">Feedback</h1>
      </header>

      <form onSubmit={submit} className="mx-auto mt-5 max-w-screen-sm space-y-4 px-5">
        <div>
          <p className="mb-1.5 text-caption uppercase text-text-secondary">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button type="button" key={c} onClick={() => setCategory(c)} className={`rounded-full border px-3 py-1.5 text-caption font-semibold transition ${category===c ? "border-primary bg-primary/15 text-primary" : "border-border bg-bg-elevated text-text-secondary"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="subj" className="mb-1.5 block text-caption uppercase text-text-secondary">Subject</label>
          <input id="subj" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Short summary" className="h-11 w-full rounded-xl border border-border bg-bg-elevated px-3 text-body text-text-primary outline-none transition-colors focus:border-primary/70" />
        </div>

        <div>
          <label htmlFor="msg" className="mb-1.5 block text-caption uppercase text-text-secondary">Message</label>
          <textarea id="msg" value={body} onChange={(e) => setBody(e.target.value)} placeholder="What happened? What did you expect?" rows={6} className="w-full rounded-xl border border-border bg-bg-elevated p-3 text-body text-text-primary outline-none transition-colors focus:border-primary/70" />
        </div>

        <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-bg-elevated/50 px-4 py-6 text-small text-text-secondary">
          <UploadCloud className="size-4" />
          Drag a screenshot here, or tap to attach
        </div>

        <motion.button whileTap={{ scale: 0.97 }} type="submit" className="relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary text-h3 font-bold text-primary-foreground">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.span key="ok" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-flex items-center gap-2">
                <Check className="size-5" /> Sent
              </motion.span>
            ) : (
              <motion.span key="send" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="inline-flex items-center gap-2">
                <Send className="size-5" /> Send feedback
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed inset-x-0 top-3 z-50 mx-auto w-fit rounded-full bg-success/15 px-4 py-2 text-small font-semibold text-success ring-1 ring-success/30 backdrop-blur">
            Feedback received. Thanks.
          </motion.div>
        )}
      </AnimatePresence>

      <BottomTabBar />
    </main>
  );
}
