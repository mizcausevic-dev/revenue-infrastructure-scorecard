import type { RevenuePostureReport } from "./types.js";

export function formatSummary(report: RevenuePostureReport) {
  return [
    `generatedAt: ${report.generatedAt}`,
    `systems: ${report.systems}`,
    `highRiskSystems: ${report.highRiskSystems}`,
    `brokenSystems: ${report.brokenSystems}`,
    `staleSystems: ${report.staleSystems}`,
    `integrityScore: ${report.integrityScore}`,
    `annualSpendUsd: ${report.annualSpendUsd}`,
    `revenueAtRiskUsd: ${report.revenueAtRiskUsd}`,
    `recoverableRevenueUsd: ${report.recoverableRevenueUsd}`
  ].join("\n");
}
