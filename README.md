# Launchboard: what can your harness do in 10 prompts?

A shared starting point for trying self-learning coding harnesses. Start with a goal and a blank local prototype, let your harness choose useful follow-ups, and see what it can build in **ten completed work prompts**.

This repo accompanies [When we put Codex on cruise control for 10 prompts](https://cruiseharness.com/blog/when-we-put-codex-on-cruise-control-for-10-prompts). The article walks through a [Cruise Harness](https://cruiseharness.com/) experiment: ten Codex passes, the evolving `Cruise.md`, the resulting files, and a lesson about a planner turning an implementation choice into a lasting rule.

**Have a self-learning harness? Let’s see what it can do in 10 prompts.** Use the same starting point, keep a record of its decisions, and compare the result. This is an invitation to explore, not a scored benchmark or a claim that one run establishes which harness is best.

## What’s here

```text
launchboard/
  Cruise.md                 # Original goal, before prompt 1
challenge.json              # Seed conversation, first prompt, pass-5 correction
prompts/
  cruiseharness/
    prompt-01.md … prompt-10.md # Exact submitted work prompts
    before-prompt-05-owner-correction.md
results/
  cruiseharness/
    index.html              # Complete prototype after pass 10
    style.css
    app.js
    Cruise.md               # Saved goal after pass 10
    prompt-notes.md          # Tenth prompt, reply, and proposed next step
    run.json                # All ten submitted prompts/replies and run context
```

For Launchboard, our Product Hunt-style clone, **the only starter file is a Markdown goal file: [`launchboard/Cruise.md`](launchboard/Cruise.md), which you can find inside the `launchboard/` folder.** It describes the product idea, revenue goal, and boundaries. Your harness builds the application from that starting point, using the seed conversation and first prompt in `challenge.json`.

The starting prototype really was empty. There was no `src/` folder, `index.html`, `style.css`, or `app.js` before prompt 1; the application files were created during the first pass. `launchboard/Cruise.md` preserves the original goal exactly. The original runner stored that goal beside its empty `site/` directory; here it lives in `launchboard/` so another harness can find it. There is intentionally no runnable starter page.

## The goal

Make revenue from Launchboard, a Product Hunt-style website where people discover, submit, and upvote new products. Keep discovery, voting, and ordinary submissions free. Clearly label paid placements and keep them separate from organic rankings.

Work on a local prototype with fictional data. No deployment, real payments, outreach, or claims of actual revenue. The exact original wording is in [`launchboard/Cruise.md`](launchboard/Cruise.md).

Contents of `launchboard/Cruise.md`:

```markdown
# Goal

Make revenue from Launchboard, a Product Hunt clone website where people discover and upvote new products.

## Boundaries

- Keep discovery, voting, and ordinary submissions free. Clearly label any paid placement and keep it out of organic rankings.
- Work on a local prototype with fictional data. No deployment, real payments, outreach, or claims of actual revenue.
```

## Try your harness

1. Copy **only** `launchboard/` into a fresh working directory outside this repo. Give your harness that directory as its workspace; keep the reference result out of its context.
2. Supply the goal and the two seed messages in [`challenge.json`](challenge.json). If your harness uses a different memory-file name, adapt the filename without changing the starting goal and note the adaptation.
3. Submit the first work prompt below. Count it as pass 1.
4. After each completed response, let your harness inspect the work and choose the next useful prompt. It may update its guidance or memory. Save each submitted prompt, reply, file snapshot, checks, and memory change.
5. Immediately before pass 5, supply the owner correction below, as the reference run did. Treat it as steering for pass 5, not an extra work pass.
6. Stop after **ten completed work passes**. Planning calls are separate from work passes; record them rather than treating this as a ten-model-call limit. If the harness proposes an eleventh prompt, save it but do not execute it.
7. Save the submitted prompts under `prompts/<your-harness>/` and the finished prototype and run notes under `results/<your-harness>/`. Use the same folder name for both, then [open a pull request](#submit-your-run-with-a-pull-request). Keep the original starter and existing submissions unchanged.

Start from the seed, not from Cruise’s later prompts. Those prompts are part of its result; choosing the follow-ups is the challenge. If your harness needs help or cannot complete a pass, record that honestly rather than silently adding extra work turns.

### First prompt

> Build a small, usable local discovery page for Launchboard with fictional product launches, votes, and free submission access. Make it possible to add a clearly labelled monetization surface separately. Keep this to one concrete increment.

### Owner correction before pass 5

> New decision from the product owner: the only paid offer for this prototype is a clearly labelled Featured Launch at $49 for seven days. Do not introduce subscriptions or additional price tiers. Continue the useful part of the planned work within this scope.

## Read the submitted prompts

All ten prompts from the blog are in [`prompts/cruiseharness/`](prompts/cruiseharness/README.md), with one file per prompt and a separate file for the owner correction before pass 5. The prompt text is preserved verbatim.

## Submit your run with a pull request

We welcome results from other harnesses. Fork [this repository](https://github.com/cruiseharness/launchboard), create a branch for your run, and submit **one PR containing both folders**:

```text
prompts/<harness>/
  README.md                 # Run context, prompt order, and steering
  prompt-01.md
  ...
  prompt-10.md               # Exact text actually submitted, not proposed prompts
  before-prompt-05-owner-correction.md
results/<harness>/
  README.md                 # How to run it, what happened, and checks performed
  ...                       # Complete final prototype source
  ...                       # Final guidance/memory files, if your harness uses them
```

Use a short lowercase folder name such as `my-harness`, identical in both locations. For another run of an existing harness, use a distinct name such as `my-harness-v2` in both folders so the previous result remains available.

In your run notes, include:

- Harness name, version or commit, model(s), run date, and relevant settings.
- Completed work-pass count, separate planning-call count, and usage/cost when available. Write “not recorded” for anything you did not capture.
- The owner correction before pass 5, any other human input, and any deviations from the starting context or challenge procedure.
- How guidance or memory changed, with replies or a transcript that explains the follow-ups. Link these notes between your two folders; a `run.json` is welcome but not required.
- Exact local setup/run commands, the checks you performed, what works, and known limitations. Include required source and dependency manifests, rather than installed dependencies or build caches.

Keep the result faithful to the end of pass 10. Disclose any manual or post-run edits separately. If the run stops early, share the actual prompts and outcome and label it an incomplete run; do not invent missing passes. Remove credentials or private data from shared logs and mark any redactions.

Commit your two folders to your fork and open a pull request against `main` in `cruiseharness/launchboard`, titled **“Add <harness>: 10-prompt Launchboard run”** (or note the actual pass count). The [PR template](.github/pull_request_template.md) asks for paths, run details, and verification. Leave `launchboard/`, `challenge.json`, and other harnesses’ submissions unchanged.

## See Cruise’s tenth-pass result

Open [`results/cruiseharness/index.html`](results/cruiseharness/index.html) in a browser. It is a static HTML/CSS/JavaScript prototype with no dependency installation or build step. Alternatively, from this repo’s root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory results/cruiseharness
```

Then visit `http://127.0.0.1:8000`. Stop the server with Ctrl+C.

The result includes free submissions and voting, a separate fictional Featured Launch offer, sponsorship review and placement previews, illustrative dates, simulated performance, a revenue-scenario calculator, and a product-detail dialog. State resets on refresh; there are no real purchases or revenue.

The three application files and final `Cruise.md` are copied unchanged from pass 10 and checked against the snapshots used by the blog. [`prompt-notes.md`](results/cruiseharness/prompt-notes.md) includes a proposed follow-up that was **not executed**. [`run.json`](results/cruiseharness/run.json) records all ten prompts and replies, the owner correction, and how the run was executed.

The reference used an isolated fixture with real Codex CLI work turns and Cruise’s actual Swift conversation reader and planning/validation code. Separate read-only planning calls chose follow-ups and optional goal edits. It did not drive the desktop app’s live watcher or queue. It also received the explicit owner correction before pass 5, so it should not be described as a run with no human steering.

## Compare what happened

Look at what works, not only how much code was written:

- Did the prototype advance the goal while keeping the community features free?
- Does the main flow work, including keyboard use and error recovery?
- Did each follow-up respond to the previous result, or repeat already completed work?
- What useful knowledge survived between passes? Did memory also accumulate unsupported assumptions?
- What changed after the owner correction, and what did the harness decide to do next?

In Cruise’s run, the planner preserved the $49, seven-day offer but also promoted “no persistence” from an automated instruction into a saved boundary. That is a useful outcome to study, not something to hide. Share the artifacts and the limitations alongside the finished page.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) to submit a harness run or improve the documentation.

This repository is available under the [MIT license](LICENSE).
