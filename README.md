# Revenue Infrastructure Scorecard

Board-ready executive intelligence surface for pipeline integrity, attribution trust, routing risk, reporting posture, and investment-priority scoring. Reads synthetic revenue-system review records, scores system integrity, highlights leakage paths, and packages board-ready memo outputs.

- Live: `https://revenue.kineticgain.com/`
- Routes: `/`, `/revenue-lane/`, `/system-risks/`, `/investment-priorities/`, `/board-memo/`, `/verification/`, `/docs/`
- APIs: `/api/dashboard/summary`, `/api/revenue-lane`, `/api/system-risks`, `/api/investment-priorities`, `/api/board-memo`, `/api/verification`, `/api/sample`

## Why it exists

Leadership keeps hearing confident claims about pipeline quality, attribution confidence, board reporting, and forecast discipline:

- revenue systems are clean
- attribution is trustworthy
- routing is fast enough
- dashboards are decision-safe
- growth plans are investable

This repo turns those claims into one executive scorecard that answers:

- where revenue trust is breaking
- where margin is leaking
- what to fund next
- what story the board should hear

## Local run

```powershell
cd revenue-infrastructure-scorecard
npm install
npm run verify
npm run prerender
npm run render:assets
node dist/app.js
```

Then open:

- `http://127.0.0.1:5560/`

## CLI

```powershell
npx revenue-infrastructure-scorecard fixtures/revenue-infrastructure.json --format summary
npx revenue-infrastructure-scorecard fixtures/revenue-infrastructure-clean.json --format json
```

## README proof assets

- `screenshots/01-overview-proof.png`
- `screenshots/02-revenue-lane-proof.png`
- `screenshots/03-system-risks-proof.png`
- `screenshots/04-investment-priorities-proof.png`

## Safety

- synthetic sample data only
- read-only executive surface
- no production CRM, billing, or warehouse credentials
- no live board packets or financial statements
