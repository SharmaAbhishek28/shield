# SHIELD — Frontend Design Prototype

A fully clickable, animation-rich frontend prototype of **SHIELD**, the cognitive
warfare training platform for the Indian Armed Forces.

This repository is a **design and UX prototype** — no backend, no database, no real
auth. Mock data lives in `/data` and is loaded into Zustand stores on boot.

## Tech Stack

| Layer         | Choice                                |
| ------------- | ------------------------------------- |
| Framework     | Next.js 14 (App Router) + TypeScript  |
| Styling       | Tailwind CSS + locked design tokens   |
| Animation     | Framer Motion                         |
| Icons         | Lucide React (no emoji, ever)         |
| State         | Zustand (client-side)                 |
| Forms         | react-hook-form + zod                 |
| Charts        | recharts                              |
| Typography    | Urbanist via `next/font/google`       |

---

## Run locally

Requires Node 20 LTS (or any 18.18+).

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Splash → `/login` → submit → `/home`.

Other scripts:

```bash
npm run typecheck   # strict TypeScript check
npm run lint        # eslint via next lint
npm run build       # production build
npm run start       # serve the production build
```

---

## Deploy to Vercel

Push to GitHub, then **Import** the repo at <https://vercel.com/new>. Vercel
auto-detects Next.js; the included `vercel.json` pins the framework, region
(`bom1`), and adds security headers. First build ~1–2 minutes. Every push to
`main` redeploys.

```bash
git init && git add . && git commit -m "feat: SHIELD prototype"
git branch -M main
git remote add origin https://github.com/<you>/shield-prototype.git
git push -u origin main
```

CI on push/PR runs typecheck → lint → build (`.github/workflows/ci.yml`).

---

## Routes wired so far

| Route          | Status                                                              |
| -------------- | ------------------------------------------------------------------- |
| `/`            | Splash — animated SHIELD logo, redirects to `/login` at 1.5 s       |
| `/login`       | Real login — Service ID + password (eye toggle) + lang toggle + CTA |
| `/onboarding`  | Lightweight placeholder (full carousel = Step 4)                    |
| `/home`        | **Real dashboard** — see below                                      |
| `/learn`       | 6-pillar hex grid                                                   |
| `/train`       | Training hub — Deepfake, Scenarios, Quizzes                         |
| `/profile`     | Hero card, stats grid, badges grid                                  |
| `/more`        | Navigation hub for Leaderboard, Settings, FAQ, Feedback, Admin      |
| `*` (404)      | Branded "Out of position" page                                      |

### `/home` — Dashboard contents

- TopBar: time-aware greeting + notification bell with red dot
- StreakCard: 23-day streak, flickering flame icon, shimmer aura
- XPLevelCard: Level 8 badge, XP count animating 4000 → 4250 on mount,
  animated bar fill, "to LVL 9" remainder
- ContinueLearningCard: hero card with thumbnail, pulsing play badge, progress bar
- Today's Missions: 3 horizontal-scroll cards with progress bars + claim states
- Your Pillars: 6 hexagonal pillar tiles with SVG progress rings, animated
  stroke-dashoffset, tilt on hover, % chip
- Recent Badges: hex-clipped badge icons, locked badges desaturated
- UnitRankingCard: #7 in 2 PARA SF + animated sparkline of rank trend
- BottomTabBar: 5 tabs (Home / Learn / Train / Profile / More), animated
  active-tab indicator using `layoutId`

All cards stagger-fade-and-slide-up on mount (50 ms apart).

---

## Status

**Step 1 — Setup ✅**
**Step 2 — Component library ✅** (HexCard via PillarHex, XPBar via XPLevelCard,
StreakFlame via StreakCard, BottomTabBar, TopBar, BadgeIcon)
**Step 5 — Home dashboard ✅** (brought forward to unblock Vercel deploy)

Next up:
- Step 4 — full onboarding carousel
- Step 6 — pillar detail + part content
- Step 8 — deepfake module (signature feature)
