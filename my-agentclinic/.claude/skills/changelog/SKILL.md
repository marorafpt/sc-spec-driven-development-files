---
description: Maintain CHANGELOG.md — create from git history on first run, prepend new commits on subsequent runs. Invoke manually before merging a branch.
---

When this skill is invoked, update `CHANGELOG.md` in the project root by following these steps exactly.

## Step 1 — collect commits

Run from the project root:

```bash
git log --format="%H|%ad|%s" --date=short --no-merges -- .
```

The `-- .` scopes the log to commits touching files in this directory. Each line is `hash|YYYY-MM-DD|subject`.

## Step 2 — determine the starting point

Read `CHANGELOG.md` if it exists and look for a sync marker on the **second line**:

```
<!-- last-sync: <hash> -->
```

- **Marker found** → run `git log <hash>..HEAD --format="%H|%ad|%s" --date=short --no-merges -- .` to get only commits after the marker. If empty, report "Changelog is already up to date." and stop.
- **No marker / file does not exist** → use all commits from Step 1.

## Step 3 — write or update the file

**Format:**

```
# Changelog
<!-- last-sync: <most-recent-commit-hash> -->

## YYYY-MM-DD
- Commit subject line
- Commit subject line

## YYYY-MM-DD
- Commit subject line
```

Rules:
- The sync marker is always the second line, immediately after `# Changelog`.
- Date sections are ordered **newest first**; within a date, commits are newest first.
- Each commit is a `- ` bullet using the subject line verbatim (strip trailing `.` for consistency).
- One blank line between each `##` section; one blank line between the sync marker and the first `##`.
- Merge commits are excluded by `--no-merges`.
- The `<most-recent-commit-hash>` in the marker is always the hash of the newest commit included in this run.

**If creating:** write the full file with marker.  
**If updating:** replace the existing sync marker with the new hash, then insert new `##` sections immediately after the blank line that follows the marker, before the first existing `##`. Do not modify any existing content below the insertion point.

## Step 4 — confirm

Tell the user which dates were added, how many bullets are under each, and the new sync hash.
