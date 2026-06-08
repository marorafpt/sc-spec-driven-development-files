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

## Phase 2 — Full application
*Marketing site, portal features, dashboard, and production polish.*

**Marketing landing page**
- [ ] Hero section with tagline and CTA
- [ ] "How it works" section (3 steps)
- [ ] Sample ailments teaser

**Ailments feature**
- [ ] Ailments list page: name, severity badge, short description
- [ ] Ailment detail page: full description, recommended therapies

**Therapies feature**
- [ ] Therapies list page: name, duration, ailments treated
- [ ] Therapy detail page

**Appointment booking**
- [ ] Booking form: select agent, therapy, date
- [ ] Confirmation page
- [ ] Appointments list: upcoming and past

**Staff dashboard**
- [ ] Summary stats: total agents, open bookings, completed sessions
- [ ] Appointments table with status, agent, and therapy info
- [ ] Filter by status

**Polish & persistence**
- [ ] Replace seed data with file-based JSON store or SQLite
- [ ] Loading states and error boundaries
- [ ] Responsive layout audit (cross-device QA pass — responsive design is built in from Phase 1, this is the formal sign-off)
- [ ] Accessibility pass (keyboard navigation, ARIA labels)
