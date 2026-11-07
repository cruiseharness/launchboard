# Pass 10 notes

## Submitted to Codex

Add a local visitor-facing destination preview for the Featured Launch so the sponsorship demo shows what happens after someone clicks a placement. Inspect the existing sponsored card and give its product CTA a fictional product-detail dialog showing the currently applied product name and description; keep sponsorship inquiry access as a separate, clearly named action. Use a simple fictional destination with no external links or purchase controls. Opening this destination should add one simulated click and impression through the existing metrics logic, with clear simulated labeling. Preserve reviewed-snapshot apply/reset, stale-review blocking, dates, the $49 seven-day offer, the submission-to-preview shortcut, the revenue calculator, and free community features. Match the current design, support keyboard opening and dismissal, and check the new interaction locally. Use memory only; add no network requests, persistence, payments, outreach, deployment, or actual-revenue claims.

## Codex’s reply

Added a fictional product-detail dialog showing the currently applied placement. Opening it adds one simulated click and impression. Sponsorship inquiry remains a separate action.

Native dialog controls support keyboard opening, Escape dismissal, and focus return. Syntax and simulated interaction checks passed for metrics, applied details, stale-review blocking, and reset. No network or persistence added.

## Files changed

- `app.js` — updated
- `index.html` — updated
- `style.css` — updated

## Saved goal

Unchanged. See [Cruise.md](Cruise.md).

## Proposed follow-up

Extend the Featured Launch simulated performance panel with illustrative cost per click and cost per 1,000 impressions using the existing $49 seven-day offer. This gives a fictional sponsor a way to interpret the completed destination-click demo. Calculate $49 ÷ simulated clicks and $49 ÷ simulated impressions × 1,000, updating alongside the existing counters. Show “Not available yet” when the relevant count is zero and format valid results as currency. Clearly state that these are hypothetical calculations using the offer price, with no actual spend, audience, or results. Reuse the current metrics state and reset behavior. Preserve the completed destination dialog, inquiry/review/apply flow, dates, revenue calculator, and free community features. Match the current design and check zero counts, simulated destination clicks, and placement resets locally. Keep everything in memory; add no network requests, persistence, payments, outreach, deployment, or actual-revenue claims.
