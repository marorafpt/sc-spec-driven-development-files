# Implementation Plan — Phase 2: Full Application

## New files

| File | Purpose |
|------|---------|
| `lib/store.ts` | Mutable in-memory appointments store seeded from `lib/data.ts` |
| `lib/actions.ts` | `bookAppointment` server action — appends to store, redirects to confirmation |
| `components/ui/SeverityBadge.tsx` | Displays mild/moderate/severe with brand colour tokens |
| `components/ui/StatusBadge.tsx` | Displays upcoming/completed/cancelled with brand colour tokens |
| `components/layout/NavLinks.tsx` | Client component using `usePathname()` for active nav highlight |
| `components/dashboard/DashboardContent.tsx` | Client component with status filter state and appointments table |
| `app/page.tsx` | Landing page: hero, how-it-works, ailments teaser |
| `app/(portal)/ailments/page.tsx` | Ailments list: severity badge, short description, detail link |
| `app/(portal)/ailments/[id]/page.tsx` | Ailment detail: description, severity, recommended therapies |
| `app/(portal)/therapies/page.tsx` | Therapies list: name, duration, description |
| `app/(portal)/therapies/[id]/page.tsx` | Therapy detail: description, ailments treated |
| `app/(portal)/appointments/page.tsx` | Appointments list grouped by upcoming / past |
| `app/(portal)/appointments/new/page.tsx` | Booking form using server action |
| `app/(portal)/appointments/confirmation/page.tsx` | Booking confirmation summary |
| `app/dashboard/page.tsx` | Staff dashboard: stats + DashboardContent |

## Modified files

| File | Change |
|------|--------|
| `components/layout/Header.tsx` | Import NavLinks, remove inline nav markup |
| `components/layout/layout.css` | Add `.site-nav__link--active` rule |

## Key decisions

- `lib/store.ts` module is a singleton array; Next.js module caching makes new appointments visible on subsequent requests within the same server process.
- Pages that read from the mutable store (`appointments`, `confirmation`, `dashboard`) opt out of static generation with `export const dynamic = 'force-dynamic'`.
- `NavLinks` is a `'use client'` component so `usePathname()` works; `Header` stays a server component.
- Dashboard filter uses `useState` in `DashboardContent` — no server round-trip.
- `notFound()` guards every dynamic route (`/ailments/[id]`, `/therapies/[id]`, `/appointments/confirmation`).

## Sequence

1. Core data layer: `store.ts`, `actions.ts`
2. Shared UI atoms: `SeverityBadge`, `StatusBadge`
3. Nav active state: `NavLinks`, update `Header`, update `layout.css`
4. Content pages (all can be written in parallel after step 1–3)
5. `DashboardContent` client component
6. TypeScript check + test run
