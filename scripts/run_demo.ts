import { summary } from "../src/services/revenueInfrastructureScorecardService.js";

const metrics = summary();

console.log(`generatedAt: 2026-05-31T09:30:00Z`);
console.log(`systems: ${metrics.systems}`);
console.log(`highRiskSystems: ${metrics.highRiskSystems}`);
console.log(`brokenSystems: ${metrics.brokenSystems}`);
console.log(`staleSystems: ${metrics.staleSystems}`);
console.log(`integrityScore: ${metrics.integrityScore}`);
console.log(`annualSpendUsd: ${metrics.annualSpendUsd}`);
console.log(`revenueAtRiskUsd: ${metrics.revenueAtRiskUsd}`);
console.log(`recoverableRevenueUsd: ${metrics.recoverableRevenueUsd}`);
console.log(`highFindings: ${metrics.highFindings}`);
