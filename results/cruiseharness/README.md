# Cruise Harness: ten-prompt Launchboard result

This is the unchanged application output after pass 10 of the [Cruise Harness experiment](https://cruiseharness.com/blog/when-we-put-codex-on-cruise-control-for-10-prompts). The [submitted prompts](../../prompts/cruiseharness/README.md) and this results folder form one example harness submission.

## Run context

- Harness: Cruise Harness, using its Swift conversation reader, planner input, schema, and plan validation in an isolated fixture. The exact harness commit/version was not recorded in the exported run.
- Run date: November 7, 2026.
- Worker and planner: Codex CLI. The exact underlying model identifier was not recorded in this export. The runner requested low reasoning effort, ephemeral sessions, workspace-write access for work, and read-only access for planning.
- Completed work passes: **10**. Separate planning calls: **10**, one after each work pass. The final proposed follow-up was saved but never submitted.
- Usage and cost: not recorded in this export.
- Starting point: an empty prototype, the original goal, and the seed conversation in [challenge.json](../../challenge.json).
- Human steering: the owner correction supplied with pass 5 fixed the sole offer at $49 for seven days. See the [exact correction](../../prompts/cruiseharness/before-prompt-05-owner-correction.md).

The fixture replayed the conversation into separate CLI calls and used Codex-shaped SQLite tables and a rollout log. It did not operate the desktop app’s live watcher or queue. The application files and final `Cruise.md` were copied without edits from the saved tenth-pass export; documentation and `run.json` package that existing evidence for this repository.

## Run locally

Open `index.html` in a browser. No dependency installation or build step is needed. Alternatively, from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory results/cruiseharness
```

Visit `http://127.0.0.1:8000` and stop the server with Ctrl+C. The prototype uses fictional data and in-memory state that resets on refresh.

## What it built

Free product submissions and reversible voting; a separately labelled Featured Launch offer; editable sponsorship previews, review/apply/reset flows, and illustrative dates; simulated impressions and clicks; a hypothetical revenue calculator; and a product-detail dialog for the sponsored placement.

The run also exposes a memory problem: the planner saved “no persistence” as a durable boundary even though the owner had not made that a requirement. The final [Cruise.md](Cruise.md) preserves that decision rather than correcting it after the experiment.

## Evidence and checks

- [run.json](run.json) records all ten submitted prompts and replies, the owner correction, and the review note.
- [prompt-notes.md](prompt-notes.md) contains pass 10’s prompt, reply, changed-file list, and unexecuted proposed follow-up.
- The article includes the intermediate snapshots and goal-file diffs.
- For this submission, the three application files and final goal were compared byte-for-byte with the saved pass-10 export and checked against the blog snapshots. All ten prompt files were compared with the blog’s source.
- `node --check results/cruiseharness/app.js` passes. The original replies report per-pass syntax and simulated interaction checks; those full interaction checks were not rerun while packaging this submission.

The prototype has no real payment processing, deployment, persistence, or actual revenue. This is one documented run, not a performance score or proof of general reliability.
