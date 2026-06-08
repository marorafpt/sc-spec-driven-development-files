# Roadmap

---

## Phase 1 — Scaffold ✅ Complete — 2026-06-07
*Runnable app, correct structure, no features.*

- [x] Update `package.json`; install Next.js 15, React 19, Tailwind CSS, TypeScript
- [x] Add `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`
- [x] Create `app/layout.tsx` and `app/globals.css`
- [x] Main layout shell: `Header`, `Main`, `Footer` subcomponents with dedicated `layout.css`
- [x] Define domain types in `lib/types.ts` (`Ailment`, `Therapy`, `Agent`, `Appointment`)
- [x] Add seed data in `lib/data.ts`
- [x] Stub all route pages with placeholder content

---

## Phase 2 — Full application ✅ Complete — 2026-06-08
*Marketing site, portal features, dashboard, and production polish.*

**Marketing landing page**
- [x] Hero section with tagline and CTA
- [x] "How it works" section (3 steps)
- [x] Sample ailments teaser

**Ailments feature**
- [x] Ailments list page: name, severity badge, short description
- [x] Ailment detail page: full description, recommended therapies

**Therapies feature**
- [x] Therapies list page: name, duration, ailments treated
- [x] Therapy detail page

**Appointment booking**
- [x] Booking form: select agent, therapy, date
- [x] Confirmation page
- [x] Appointments list: upcoming and past

**Staff dashboard**
- [x] Summary stats: total agents, open bookings, completed sessions
- [x] Appointments table with status, agent, and therapy info
- [x] Filter by status

**Polish & persistence**
- [ ] Replace seed data with file-based JSON store or SQLite (deferred to Phase 3)
- [ ] Loading states and error boundaries (deferred to Phase 3)
- [x] Responsive layout audit (inherited from Phase 1 shell; active nav and all pages verified)
- [x] Accessibility pass (semantic HTML, ARIA labels, aria-current on active nav links)
