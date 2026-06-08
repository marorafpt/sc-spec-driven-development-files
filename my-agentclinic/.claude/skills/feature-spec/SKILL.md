---
description: Start a new feature phase — find the next incomplete phase in specs/roadmap.md, create a branch, interview the user, and write plan.md / requirements.md / validation.md into a dated spec directory.
---

When this skill is invoked, follow these steps exactly. Do not write any files to disk until Step 4.

## Step 1 — read context

Read these files before doing anything else:

- `specs/roadmap.md` — find the first phase that does **not** have ✅ in its heading. That is the target phase. Extract:
  - The phase number and name (e.g. "Phase 3 — Persistence")
  - The bullet items listed under it (they describe the intended scope)
- `specs/mission.md` — understand the product purpose and tone
- `specs/tech-stack.md` — understand constraints and preferred patterns

## Step 2 — create the branch

Derive a short kebab-case slug from the phase name (e.g. "phase/3-persistence").

Run:
```bash
git checkout -b phase/<N>-<slug>
```

Tell the user which branch was created.

## Step 3 — interview the user

Call **AskUserQuestion** with exactly these three questions in a single call. Do not write any files until the user answers.

**Question 1 — Scope**
Header: "Scope"
Question: "What is in scope for this phase, and what should be explicitly deferred?"
Options drawn from the roadmap bullet items — offer each roadmap item as an "In" option plus at least one "Defer" option. Use multiSelect: true.

**Question 2 — Decisions**
Header: "Approach"
Question: "Are there any architectural or implementation decisions we should lock in before starting?"
Offer 3–4 sensible choices based on what the tech stack and roadmap imply for this phase (e.g. "Use SQLite via better-sqlite3", "Keep in-memory store", "Add Zod for validation"). Use multiSelect: true.

**Question 3 — Validation**
Header: "Done when"
Question: "How will we know this phase is complete and ready to merge?"
Offer 4 options covering automated checks, visual verification, and manual test scenarios relevant to this phase. Use multiSelect: true.

## Step 4 — create the spec directory and files

Use today's date (YYYY-MM-DD) and the phase slug to form the directory name:
`specs/YYYY-MM-DD-<slug>/`

Create three files inside it:

---

### `requirements.md`

```markdown
# Requirements — <Phase Name>

## Scope

<1–2 sentence summary of what this phase delivers, drawn from the user's scope answers>

## What is in scope

<Bullet list from the user's "in" selections, expanded with 1-line descriptions>

## What is out of scope

<Bullet list from the user's "defer" selections, each with a reason>

## Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
<One row per answer from the Approach question>
```

---

### `plan.md`

```markdown
# Implementation Plan — <Phase Name>

## New files

| File | Purpose |
|------|---------|
<Table of files that will be created, inferred from scope>

## Modified files

| File | Change |
|------|--------|
<Table of existing files that will need changes>

## Key decisions

<Bulleted summary of the Approach answers — same decisions as requirements.md but phrased as implementation constraints>

## Sequence

<Numbered list of task groups in dependency order, e.g.:
1. Data layer changes
2. Server actions / mutations
3. New pages
4. UI components
5. Tests>
```

---

### `validation.md`

```markdown
# Validation — <Phase Name>

## Automated checks

<From the user's "done when" answers — list test commands and what they verify>

## Manual checks

<Checklist of things to verify visually or interactively, one per line, drawn from the user's answers>

## Merge criteria

- [ ] `npm test` passes (all existing + new tests green)
- [ ] `npx tsc --noEmit` reports zero errors
- [ ] All manual checks above confirmed
<Any additional criteria the user specified>
```

---

## Step 5 — update the roadmap

In `specs/roadmap.md`, add a line below the phase heading marking it as **In Progress**:

```
## Phase N — Name 🚧 In Progress
```

(Replace the heading in-place; do not add a duplicate.)

## Step 6 — confirm

Tell the user:
- Branch name
- Spec directory created
- The three files written
- What to do next (start implementing, or refine the spec files further before committing)
