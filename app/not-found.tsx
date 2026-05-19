import Link from "next/link";
import { Compass, Home } from "lucide-react";

/**
 * Branded 404 — replaces Next's default.
 * Routes that haven't been built yet (Steps 2–12) will land here until they
 * exist, instead of showing the unstyled framework default.
 */
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6">
      <div className="w-full max-w-[440px] rounded-2xl border border-border bg-bg-surface/80 p-8 text-center backdrop-blur-md glow-border">
        <div className="mx-auto grid size-14 place-items-center rounded-xl border border-border bg-bg-elevated text-primary">
          <Compass className="size-7" />
        </div>

        <p className="mt-5 text-caption uppercase tracking-[0.5px] text-primary">
          Error 404
        </p>
        <h1 className="mt-1 text-h1 font-extrabold text-text-primary">
          Out of position
        </h1>
        <p className="mt-2 text-body text-text-secondary">
          This screen hasn&apos;t been built yet, or the route doesn&apos;t
          exist. The prototype is being assembled in stages — check back as new
          modules ship.
        </p>

        <Link
          href="/home"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-small font-semibold text-primary-foreground transition hover:bg-primary-dark"
        >
          <Home className="size-4" />
          Return to base
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 classification-banner">
        For Official Use Only
      </div>
    </main>
  );
}
