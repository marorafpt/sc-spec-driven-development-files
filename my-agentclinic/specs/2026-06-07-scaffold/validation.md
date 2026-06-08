# Validation — Phase 1: Scaffold

Phase 1 is complete and mergeable when every check below passes.

Automated checks (sections 3–5 below) are covered by `validation.test.ts`. Run them with:

```bash
npm test
```

---

## 1. Production build is clean

```bash
npm run build
```

- Exit code 0
- Zero TypeScript errors in build output
- Zero ESLint errors (if lint is wired into the build)
- No `any` type suppressions added to pass the build

## 2. All routes resolve

Start `npm run dev` and confirm each URL returns a page (not a 404 or crash):

| URL | Expected stub content |
|-----|-----------------------|
| `/` | Marketing landing stub |
| `/ailments` | Ailments list stub |
| `/ailments/[any-id]` | Ailment detail stub |
| `/therapies` | Therapies list stub |
| `/therapies/[any-id]` | Therapy detail stub |
| `/appointments` | Appointments list stub |
| `/appointments/new` | Booking form stub |
| `/dashboard` | Staff dashboard stub |

## 3. Domain types and seed data — automated (`npm test`)

`validation.test.ts` asserts:

- `lib/types.ts` and `lib/data.ts` exist
- All four arrays (`ailments`, `therapies`, `agents`, `appointments`) have 3–5 items
- Every item has all required fields with correct types and valid union values
- Referential integrity: `ailment.therapyIds`, `therapy.ailmentIds`, `appointment.agentId`, `appointment.therapyId` all resolve to known records
- No `any`, no `// @ts-ignore`, no missing required fields in seed data

## 4. Config files — automated (`npm test`)

`validation.test.ts` asserts:

- `tsconfig.json`, `next.config.ts`, `postcss.config.js` exist
- `tsconfig.json` has `"strict": true`

Manual checks:
- `app/globals.css` `@theme` block defines clinic color tokens (`primary`, `accent`, `neutral`)
- `postcss.config.js` includes `@tailwindcss/postcss`

## 5. Brand tokens are defined

- At least one Google Font is wired through the root layout
- Tailwind theme extends `colors` with at least: `primary`, `accent`, `neutral` tokens
- `app/globals.css` uses Tailwind directives (not raw CSS resets)

## 6. Responsive layout

Resize the browser or use DevTools device emulation to confirm:

| Viewport | Expected behaviour |
|---|---|
| Mobile (≤ 767 px) | Header brand and nav stack vertically; nav links wrap to a second line |
| Tablet / Desktop (≥ 768 px) | Header is a single horizontal bar: brand left, nav right |
| All widths | Main content area has visible padding; footer stays at the bottom |

## Merge checklist

- [ ] `npm test` passes (all automated assertions green)
- [ ] `npm run build` exits 0 with no type errors
- [ ] All 8 stub routes resolve in `npm run dev`
- [ ] Tailwind color tokens defined in theme
- [ ] Google Font applied in root layout
- [ ] No placeholder `any` types left in the codebase
- [ ] Header stacks on mobile (≤ 767 px) and goes horizontal on tablet/desktop (≥ 768 px)

## What is NOT a blocker

- Stub pages look unstyled — Phase 2 owns the landing page, Phase 3 owns ailments UI
- Seed data copy is rough/placeholder — content is not validated at this phase
