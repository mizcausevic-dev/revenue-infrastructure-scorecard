import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  boardMemo,
  investmentPriorities,
  payload,
  revenueLane,
  summary,
  systemRisks,
  verification
} from "../src/services/revenueInfrastructureScorecardService.js";
import {
  renderBoardMemo,
  renderDocs,
  renderInvestmentPriorities,
  renderOverview,
  renderRevenueLane,
  renderSystemRisks,
  renderVerification
} from "../src/services/render.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const site = path.join(root, "site");

rmSync(site, { recursive: true, force: true });

const files: Record<string, string> = {
  "index.html": renderOverview(),
  [path.join("revenue-lane", "index.html")]: renderRevenueLane(),
  [path.join("system-risks", "index.html")]: renderSystemRisks(),
  [path.join("investment-priorities", "index.html")]: renderInvestmentPriorities(),
  [path.join("board-memo", "index.html")]: renderBoardMemo(),
  [path.join("verification", "index.html")]: renderVerification(),
  [path.join("docs", "index.html")]: renderDocs(),
  "robots.txt": "User-agent: *\nAllow: /\nSitemap: https://revenue.kineticgain.com/sitemap.xml\n",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://revenue.kineticgain.com/</loc></url>
  <url><loc>https://revenue.kineticgain.com/revenue-lane/</loc></url>
  <url><loc>https://revenue.kineticgain.com/system-risks/</loc></url>
  <url><loc>https://revenue.kineticgain.com/investment-priorities/</loc></url>
  <url><loc>https://revenue.kineticgain.com/board-memo/</loc></url>
  <url><loc>https://revenue.kineticgain.com/verification/</loc></url>
  <url><loc>https://revenue.kineticgain.com/docs/</loc></url>
</urlset>`,
  [path.join("api", "dashboard", "summary.json")]: JSON.stringify(summary(), null, 2),
  [path.join("api", "revenue-lane.json")]: JSON.stringify(revenueLane(), null, 2),
  [path.join("api", "system-risks.json")]: JSON.stringify(systemRisks(), null, 2),
  [path.join("api", "investment-priorities.json")]: JSON.stringify(investmentPriorities(), null, 2),
  [path.join("api", "board-memo.json")]: JSON.stringify(boardMemo(), null, 2),
  [path.join("api", "verification.json")]: JSON.stringify(verification(), null, 2),
  [path.join("api", "sample.json")]: JSON.stringify(payload(), null, 2)
};

for (const [relativePath, contents] of Object.entries(files)) {
  const fullPath = path.join(site, relativePath);
  mkdirSync(path.dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents);
}
