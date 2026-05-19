# SHIELD — Frontend Design Prototype

A fully clickable, animation-rich frontend prototype of **SHIELD**, the cognitive
warfare training platform for the Indian Armed Forces.

This repository is a **design and UX prototype** — no backend, no database, no real
auth. Mock data lives in `/data` and is loaded into Zustand stores on boot. Every
screen, every flow, every microinteraction is built to demonstrate exactly how the
final product will look, feel, and behave.

## Tech Stack

| Layer         | Choice                                |
| ------------- | ------------------------------------- |
| Framework     | Next.js 14 (App Router) + TypeScript  |
| Styling       | Tailwind CSS + locked design tokens   |
| UI primitives | shadcn/ui (Radix-based)               |
| Animation     | Framer Motion                         |
| Icons         | Lucide React (no emoji, ever)         |
| State         | Zustand (client-side)                 |
| Forms         | react-hook-form + zod                 |
| Charts        | recharts                              |
| Typography    | Urbanist via `next/font/google`       |

---

## Run locally (Windows / macOS / Linux)

Requires **Node.js 20 LTS** (or any 18.18+).

```bash
# 1. Install dependencies (first time only, takes ~1–2 min)
npm install

# 2. Start the dev server
npm run dev
```

Then open <http://localhost:3000> in your browser. You'll land on the splash, which
auto-redirects to `/login` after 1.5 seconds.

The dev server hot-reloads on every save — keep it running while you edit files.

### Other useful commands

```bash
npm run typecheck   # TypeScript strict check (no emit)
npm run lint        # ESLint via next lint
npm run build       # Production build (run before deploying)
npm run start       # Serve the production build locally on :3000
```

---

## Deploy to Vercel

### Option A — One-click via the Vercel dashboard (recommended)

1. **Push to GitHub.** From the project root:
   ```bash
   git init
   git add .
   git commit -m "feat: SHIELD prototype scaffold (Step 1)"
   git branch -M main
   git remote add origin https://github.com/<your-username>/shield-prototype.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>.
3. **Import** your `shield-prototype` repo. Vercel auto-detects Next.js — no config
   tweaks needed; the included `vercel.json` already specifies framework, regions
   (`bom1` — Mumbai), and security headers.
4. Click **Deploy**. The first build takes ~1–2 minutes.
5. Done — you'll get a `https://shield-prototype-<hash>.vercel.app` URL. Every
   subsequent push to `main` redeploys automatically; every PR gets a preview URL.

### Option B — CLI (good for ad-hoc deploys)

```bash
npm i -g vercel
vercel login
vercel              # preview deployment
vercel --prod       # production deployment
```

### Environment variables

The prototype runs entirely on the client — no env vars are required for the
current scaffold. `.env.example` lists optional public flags (`NEXT_PUBLIC_*`) you
can wire up in the **Vercel → Project → Settings → Environment Variables** panel
when needed.

### CI on GitHub

`.github/workflows/ci.yml` runs `typecheck → lint → build` on every push and PR to
`main`. This catches breakage before Vercel does. No secrets are required.

---

## Design system

- **Dark mode by default** — the entire app lives on `#0A0E1A`.
- **Primary orange** (`#FF8F1F`) is reserved for CTAs, active states, and alerts.
- **Hexagonal motif** for the six pillars: Sense, Harmonise, Interpret, Endure,
  Lead, Dominate.
- All cards use `rounded-2xl` (16px), 1px borders in `#2A3142`, subtle inner glows
  rather than heavy outer shadows.
- Type scale and colour tokens are defined in `tailwind.config.ts` and exposed as
  CSS variables in `app/globals.css`.

## Project structure

```
app/                   Next.js App Router routes
components/
  ui/                  shadcn primitives (Button, Card, Dialog, …)
  shield/              SHIELD-specific components (HexCard, XPBar, …)
  illustrations/       Custom SVGs
data/                  Mock JSON (user, pillars, parts, badges, …)
lib/
  stores/              Zustand stores
  animations.ts        Reusable Framer Motion variants
  utils.ts             cn() and helpers
public/                Static assets (videos, images)
```

## Status

**Step 1 — Setup ✅**

- Next.js 14 + TypeScript scaffolded (Next pinned to `14.2.35`, the latest patched 14.x)
- Tailwind config with full SHIELD palette and type scale
- Urbanist loaded globally via `next/font`
- Dark theme applied at the root
- Splash route (`/`) implemented with logo-draw animation as a smoke test
- TypeScript strict typecheck passes clean
- Tailwind compiles clean (verified in sandbox)
- `vercel.json` + GitHub Actions CI in place — Vercel-ready

Next: **Step 2 — Design-system component library** (`HexCard`, `XPBar`,
`StreakFlame`, `BottomTabBar`, `TopBar`, `BadgeIcon`) on an isolated
`/components-demo` route.
