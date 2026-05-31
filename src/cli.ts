import { readFileSync } from "node:fs";

import { analyze } from "./analyze.js";
import type { RevenueSystemRecord } from "./types.js";

const [, , filePath = "fixtures/revenue-infrastructure.json", format = "--format", output = "summary"] = process.argv;
const parsed = JSON.parse(readFileSync(filePath, "utf8")) as RevenueSystemRecord[];
const report = analyze(parsed);

if (format !== "--format") {
  console.error("usage: revenue-infrastructure-scorecard <file> --format <summary|json>");
  process.exit(1);
}

if (output === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`generatedAt: ${report.generatedAt}`);
  console.log(`systems: ${report.systems}`);
  console.log(`highRiskSystems: ${report.highRiskSystems}`);
  console.log(`brokenSystems: ${report.brokenSystems}`);
  console.log(`staleSystems: ${report.staleSystems}`);
  console.log(`integrityScore: ${report.integrityScore}`);
  console.log(`annualSpendUsd: ${report.annualSpendUsd}`);
  console.log(`revenueAtRiskUsd: ${report.revenueAtRiskUsd}`);
  console.log(`recoverableRevenueUsd: ${report.recoverableRevenueUsd}`);
  console.log(`highFindings: ${report.findingsList.filter((finding) => finding.severity === "high").length}`);
}
