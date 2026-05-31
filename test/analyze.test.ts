import { describe, expect, it } from "vitest";

import { analyze } from "../src/analyze.js";
import { sampleRevenueInfrastructure } from "../src/data/sampleRevenueInfrastructure.js";

describe("analyze revenue infrastructure", () => {
  it("calculates the rollup totals", () => {
    const report = analyze(sampleRevenueInfrastructure, { now: "2026-05-31T09:30:00Z" });
    expect(report.systems).toBe(8);
    expect(report.annualSpendUsd).toBe(1648000);
    expect(report.revenueAtRiskUsd).toBe(1740000);
    expect(report.recoverableRevenueUsd).toBe(805000);
  });

  it("marks broken and stale systems", () => {
    const report = analyze(sampleRevenueInfrastructure, { now: "2026-05-31T09:30:00Z" });
    expect(report.brokenSystems).toBe(3);
    expect(report.staleSystems).toBeGreaterThanOrEqual(4);
  });

  it("produces high-severity findings for attribution and routing", () => {
    const report = analyze(sampleRevenueInfrastructure, { now: "2026-05-31T09:30:00Z" });
    const codes = report.findingsList.map((finding) => finding.code);
    expect(codes).toContain("attribution-blind-spot");
    expect(codes).toContain("routing-delay");
  });

  it("keeps the integrity score bounded", () => {
    const report = analyze(sampleRevenueInfrastructure, { now: "2026-05-31T09:30:00Z" });
    expect(report.integrityScore).toBeGreaterThan(0);
    expect(report.integrityScore).toBeLessThanOrEqual(100);
  });

  it("flags the posture as not okay with this sample", () => {
    const report = analyze(sampleRevenueInfrastructure, { now: "2026-05-31T09:30:00Z" });
    expect(report.ok).toBe(false);
  });
});
