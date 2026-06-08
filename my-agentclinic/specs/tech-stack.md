# Tech Stack

## Framework recommendation: Next.js 15

**Next.js 15 with the App Router** is the recommended framework for AgentClinic.

It is the dominant TypeScript full-stack framework in 2025 and satisfies all three stakeholder requirements:

| Stakeholder | Requirement | How Next.js delivers it |
|-------------|-------------|-------------------------|
| Mary (Eng) | Reliable, popular TypeScript stack | #1 TypeScript web framework; strong community and Vercel backing |
| Mary (Eng) | Staff + agent dashboard | App Router layouts make dashboard/portal split clean with zero extra routing config |
| Steve (Marketing) | Attractive, modern-browser site | Server components ship zero JS by default; fast paint, great Lighthouse scores |

### Why server-side TypeScript matters here

The App Router runs page and layout components **on the server by default**. This means:

- Domain logic (`lib/types.ts`, `lib/data.ts`) stays server-only — never exposed to the browser.
- Pages are TypeScript end-to-end: types defined once, used in server components, passed as props to client components.
- Server components query SQLite directly via `lib/db.ts` — no separate API layer needed for reads.
- API Routes (`app/api/`) handle writes (booking, cancellation) so mutations are a single server-side call.

## Full stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 15** (App Router, server components) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS** — utility-first, no runtime overhead |
| UI components | Hand-rolled with Tailwind (no component library) |
| Database | **SQLite** — file-based, zero infra, full SQL; accessed via `better-sqlite3` |
| Data (Phase 1) | Seed data in `lib/data.ts` loaded into SQLite on startup |
| Testing | **Vitest** — spec validation tests live in `specs/` next to their requirements |
| Package manager | npm |

## Responsive design

The UI is **mobile-first**: base styles target small screens and `@media (min-width: N)` overrides scale up. Breakpoints mirror Tailwind's defaults so utility classes and component CSS stay in sync:

| Breakpoint | Min-width | Typical use |
|---|---|---|
| (base) | 0 | Mobile — single column, stacked navigation |
| `sm` | 640 px | Wide mobile / small tablet |
| `md` | 768 px | Tablet — horizontal nav, multi-column content begins |
| `lg` | 1024 px | Desktop |
| `xl` | 1280 px | Wide desktop — max-width containers cap out |

All component CSS in `components/**/*.css` follows the same mobile-first convention. No layout or feature is desktop-only.

## Testing and validation

Validation tests use **Vitest** and live alongside each spec milestone:

```
specs/
└── 2026-06-07-scaffold/
    ├── requirements.md
    ├── plan.md
    ├── validation.md       # human-readable checklist
    └── validation.test.ts  # Vitest: machine-verifiable assertions
```

Run all validation tests with:

```bash
npm test
```

### What goes in a validation test

Each `validation.test.ts` covers assertions that can be checked programmatically — file existence, TypeScript types, seed data shape, HTTP route responses. Anything that requires visual or manual review stays in `validation.md`.

## Folder structure

```
my-agentclinic/
├── app/
│   ├── layout.tsx            # Root layout (font, global styles)
│   ├── page.tsx              # Marketing landing page
│   ├── (portal)/             # Agent-facing portal (no URL prefix)
│   │   ├── ailments/
│   │   ├── therapies/
│   │   └── appointments/
│   ├── dashboard/            # Staff dashboard
│   └── api/                  # API routes (Phase 2+)
├── components/               # Shared UI components
├── lib/
│   ├── types.ts              # Domain types
│   ├── db.ts                 # SQLite connection + query helpers
│   └── data.ts               # Seed data (loaded into SQLite on startup)
└── specs/                    # This constitution
```
