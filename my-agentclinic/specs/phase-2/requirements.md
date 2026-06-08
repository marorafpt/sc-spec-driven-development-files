# Requirements — Phase 2: Full Application

## Scope

Build every user-facing feature on top of the Phase 1 scaffold: marketing landing page, agent portal (ailments, therapies, appointments), staff dashboard, and production polish.

## What is in scope

### Marketing landing page (`/`)
- Hero section: brand headline, tagline, two CTAs ("Browse Conditions" → `/ailments`, "Book a Session" → `/appointments/new`)
- "How it works" section: three numbered steps (identify → treat → book)
- Sample ailments teaser: three ailments from seed data, linking to detail pages

### Ailments portal (`/ailments`, `/ailments/[id]`)
- List page: card per ailment — name, severity badge, short description, link to detail
- Detail page: full description, severity badge, list of recommended therapies with links

### Therapies portal (`/therapies`, `/therapies/[id]`)
- List page: card per therapy — name, duration in minutes, description
- Detail page: full description, duration, list of ailments treated with links

### Appointment booking (`/appointments`, `/appointments/new`, `/appointments/confirmation`)
- List page: appointments grouped by status (upcoming / completed / cancelled), joined with agent and therapy names
- Booking form: dropdowns for agent and therapy, date input, server action on submit
- Confirmation page: summary of the booked appointment with a link back to the list

### Staff dashboard (`/dashboard`)
- Summary stats: total registered agents, open (upcoming) bookings, completed sessions
- Full appointments table: agent name, therapy name, date, status badge
- Client-side filter by status (All / Upcoming / Completed / Cancelled)

### Navigation
- Active link indicator: current route highlighted in the header nav

### Polish
- `notFound()` for missing ailment / therapy / appointment IDs
- Responsive at all breakpoints (inherited from Phase 1 shell)
- Semantic HTML and basic ARIA labels throughout

## What is out of scope

- SQLite / file-based persistence — data layer uses the Phase 1 in-memory seed store; new bookings persist only for the lifetime of the server process. Deferred to Phase 3.
- Authentication — no login or role gating; dashboard is publicly accessible for demo purposes
- Search and filtering on ailments/therapies list pages — deferred to Phase 3

## Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Persistence | In-memory `lib/store.ts` extending seed data | SQLite setup must be sequenced before write features; deferring avoids blocking Phase 2 UX work |
| Booking mutations | Next.js Server Action in `lib/actions.ts` | Keeps form logic server-side without a separate API route |
| Dashboard filter | Client component (`DashboardContent`) with local state | Filter is purely presentational; no server round-trip needed |
| Nav active state | `NavLinks` client component using `usePathname()` | `Header` stays a server component; only the nav links need client-side routing awareness |
| Severity colour mapping | mild → neutral, moderate → accent (amber), severe → primary (orange) | Reuses existing brand tokens; no new colour introduces needed |
