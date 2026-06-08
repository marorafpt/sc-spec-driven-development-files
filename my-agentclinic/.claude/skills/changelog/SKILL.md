---
description: Maintain CHANGELOG.md — create it from git history on first run, prepend new entries on subsequent runs. Invoke manually before merging a branch.
---

When this skill is invoked, update `CHANGELOG.md` in the project root by following these steps exactly.

## Step 1 — collect commits

Run this command from the project root:

```bash
git log --format="%ad|%s" --date=short --no-merges -- .
```

The `-- .` flag scopes the log to commits that touched files in this directory, excluding unrelated commits from the wider repository. Each output line is `YYYY-MM-DD|subject`.

## Step 2 — check for an existing changelog

Read `CHANGELOG.md` if it exists.

- **File does not exist** → use all commits from Step 1.
- **File exists** → find the first `## YYYY-MM-DD` heading. Only use commits whose date is **strictly newer** than that date. If there are none, report "Changelog is already up to date." and stop.

## Step 3 — write or update the file

**Format:**

```
# Changelog

## YYYY-MM-DD
- Commit subject line
- Commit subject line

## YYYY-MM-DD
- Commit subject line
```

Rules:
- Date sections are ordered **newest first**.
- Each commit is a `- ` bullet using the subject line verbatim (strip trailing `.` for consistency).
- One blank line between each `##` section; no blank line between the `#` heading and the first `##`.
- Merge commits are already excluded by `--no-merges`.

**If creating:** write the full file.  
**If updating:** insert the new `##` sections immediately after the `# Changelog` line, before the first existing `##` section. Do not modify any existing content.

## Step 4 — confirm

Tell the user which dates were added and how many bullets are under each.
