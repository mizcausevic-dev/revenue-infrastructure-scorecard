# Architecture

Revenue Infrastructure Scorecard is a static-friendly TypeScript executive-intelligence surface.

## Layers

1. `src/data/sampleRevenueInfrastructure.ts`
   Synthetic revenue-system review records covering CRM, attribution, routing, reporting, warehouse, billing, and forecasting.
2. `src/analyze.ts`
   Computes integrity score, revenue-at-risk totals, recoverable-value totals, and board-readable findings.
3. `src/services/revenueInfrastructureScorecardService.ts`
   Shapes the analysis into overview metrics, revenue lanes, system risks, investment-priority packets, and board memo outputs.
4. `src/services/render.ts`
   Produces the executive HTML surfaces.
5. `scripts/prerender.ts`
   Exports the static site and JSON payloads for GitHub Pages.
