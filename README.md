# SHIELD — Frontend Design Prototype

Fully clickable Next.js 14 prototype of **SHIELD**, the cognitive warfare training platform.
No backend, no auth, no DB — all state lives in Zustand stores seeded from JSON in `/data`.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
```

## Deploy to Vercel

```bash
git add . && git commit -m "feat: SHIELD prototype" && git push
```

Then **Import** the repo at <https://vercel.com/new>. `vercel.json` pins framework, region (`bom1`), and security headers. CI in `.github/workflows/ci.yml` runs typecheck → lint → build.

## Routes (26 wired, every link reachable)

### Auth & onboarding
- `/` — splash with animated logo, redirects to `/login`
- `/login` — Service ID + password + lang toggle + animated submit
- `/onboarding` — placeholder (full carousel = Step 4)

### Main app (bottom tab bar)
- `/home` — dashboard: streak flame, animated XP count, Continue Learning hero, missions rail, hex pillar rail, badges rail, unit ranking with sparkline
- `/learn` — 6-pillar hex grid
- `/learn/[pillar]` — pillar hero, progress, Parts timeline with state indicators, pillar quiz CTA
- `/learn/[pillar]/[part]` — video block (scrub-to-progress), text + callout, knowledge check, Mark Complete with XP celebration overlay
- `/train` — training hub (Deepfake / Scenarios / Quiz)
- `/train/deepfake` — challenge list with difficulty pills
- `/train/deepfake/[id]` — **Spot-the-Fake (signature)**: two video tiles, confidence slider, reveal animation with shake on the fake, tells breakdown panel
- `/train/scenarios` — 12-scenario grid
- `/train/quiz` — quiz selector (Sense diagnostic + 6 pillar quizzes, locked until pillar complete)
- `/train/quiz/[id]` — question screen: MCQ + True/False, animated progress dots, confidence per question, sliding question transitions, instant explanation reveal
- `/train/quiz/[id]/results` — animated score count-up, confetti for ≥80%, stats grid (accuracy / avg time / calibration), retake / back CTAs
- `/profile` — hero, stats grid, badges grid
- `/profile/badges` — full badges grid, locked desaturated
- `/profile/certificates` — earned certificates with download
- `/more` — leaderboard / settings / faq / feedback / admin

### Support & admin
- `/leaderboard` — scope tabs + period filters + animated 3-podium + ranked list with current user pinned
- `/settings` — account, preferences, training, privacy, about, logout with confirmation modal
- `/faq` — search + category tabs + accordion
- `/feedback` — categorised form with success animation
- `/admin` — 4 stat cards, trendline chart, recent activity, content/user shortcuts
- `/admin/content` — sidebar pillar picker, parts list with status badges
- `/admin/users` — search + role filter + responsive table
- `/admin/analytics` — pillar completion funnel
- `*` — branded 404 "Out of position"

## Design system (locked)
- Dark mode only, `#0A0E1A` base, primary orange `#FF8F1F` reserved for CTAs/active/alerts
- Hexagonal motif for the six pillars (SVG progress rings, hex clip-path)
- All cards `rounded-2xl`, 1px borders, inner glows instead of heavy shadows
- Urbanist via `next/font/google` — weights 400–900
- Animations: Framer Motion, cubic-bezier `[0.22, 1, 0.36, 1]`, 50 ms stagger on lists

## Verified
- TypeScript strict typecheck — **clean across 26 routes**
- Tailwind compiles clean (sandbox-verified)
- npm install + Vercel-ready config in place
