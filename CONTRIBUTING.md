# Contributing — How to submit your checkpoints

You complete this program **one deliverable at a time**, each as its own pull request
against `main`. A PR is "done" when its checks are green and a mentor has signed off on
the checklist.

Because you are **not a collaborator** on this repo, you work from your **own fork** and
open PRs from the fork back to `ravnhq/frontend-nerdery-checkpoints`.

## Setup (once)

1. **Fork the repo** on GitHub — the **Fork** button on
   `https://github.com/ravnhq/frontend-nerdery-checkpoints`. This creates
   `https://github.com/<your-username>/frontend-nerdery-checkpoints`.
2. **Clone your fork** and add the original repo as `upstream`:
   ```bash
   git clone https://github.com/<your-username>/frontend-nerdery-checkpoints.git
   cd frontend-nerdery-checkpoints
   git remote add upstream https://github.com/ravnhq/frontend-nerdery-checkpoints.git
   npm install
   npm run dev      # open the dev server to see the deliverable demos
   ```

`origin` = your fork (you push here). `upstream` = the program repo (you open PRs here).

## The loop (once per deliverable)

1. **Start from an up-to-date `main`:**
   ```bash
   git switch main
   git pull upstream main          # sync with the program repo
   git switch -c week-1/contact-list
   ```
2. **Read the deliverable's `README.md`** (e.g. `deliverables/week-1/contact-list/README.md`).
   It lists the exact exports and behaviour the tests expect.
3. **Implement the files under that deliverable's `src/`.** Run the tests as you go:
   ```bash
   npm run test:watch                                   # all, in watch mode
   npx vitest run deliverables/week-1/contact-list      # just this deliverable
   ```
4. **Check it locally before pushing:**
   ```bash
   npm run typecheck
   npm run lint
   npx vitest run deliverables/week-1/contact-list
   ```
5. **Push the branch to your fork** and open the PR:
   ```bash
   git push -u origin week-1/contact-list
   ```
   Then on GitHub, open a pull request **from your fork's branch → `ravnhq/frontend-nerdery-checkpoints`'s `main`** (GitHub shows a "Compare & pull request" prompt). Request review from your mentor.
6. Your mentor reviews the PR: CI must be green and they tick the deliverable's
   `CHECKLIST.md`. When it's signed off, the mentor **closes the PR** — checkpoint PRs are
   **reviewed, not merged** (see below). Start your next deliverable from a fresh branch
   off `main`.

> Keep each PR to **one deliverable**. It keeps reviews focused and CI fast.

## Why PRs are closed, not merged

`main` is the shared **stub baseline** everyone forks from, and each deliverable is an
independent folder — so your work never needs to be merged in. Your PR exists purely so
CI can run and your mentor can review and grade it. Once it's signed off, the mentor
closes it; your solution stays on the branch in your fork as your record. Nothing you
submit changes `main`.

## What CI checks

The `Checkpoints` workflow runs automatically on every PR to `main` (including PRs from
forks):

| Check | Scope | Notes |
|---|---|---|
| `typecheck` | whole repo | Strict TypeScript. No `any`, no `@ts-ignore`. |
| `lint` | whole repo | ESLint. |
| acceptance tests | **only the deliverable(s) your PR changed** | Detected from the PR diff, so other unfinished deliverables don't block you. |
| coverage gate | `week-2/testing` only | That deliverable is graded on ≥85% coverage of `TodoApp` (see below). |

CI figures out which deliverable you touched from the PR diff and runs just those
tests — so your Contact List PR isn't held back by the still-stubbed Suspense checkpoint.

> **First PR:** GitHub requires a maintainer to approve the CI run the first time you
> contribute from a fork. Your mentor clicks **"Approve and run"** on the PR; after that,
> your later PRs run automatically.

## Rules

- **Only edit files inside the deliverable's `src/`.** Don't touch other deliverables in
  the same PR.
- **Don't edit the `*.test.tsx` files** — they are the spec you're building against, and
  CI will fail your PR if you change them. The **one exception** is the Testing
  deliverable (`deliverables/week-2/testing/TodoApp.test.tsx`), where *writing the tests
  is the task*.
- Don't touch root config (`package.json`, `tsconfig.json`, `vite.config.ts`,
  `eslint.config.js`) — if you think something's broken there, tell your mentor.

## The Testing deliverable is different

For `deliverables/week-2/testing`, the app (`TodoApp.tsx`) is provided and correct — **you
write the test suite**. It passes when your tests are green *and* meet the 85% coverage
gate:

```bash
npm run grade:testing
```
