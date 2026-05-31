import { describe, expect, it } from "vitest";

import { boardMemo, investmentPriorities, revenueLane, summary, systemRisks } from "./revenueInfrastructureScorecardService.js";

describe("revenue infrastructure scorecard service", () => {
  it("returns a summary with score and value fields", () => {
    const result = summary();
    expect(result.systems).toBe(8);
    expect(result.integrityScore).toBeGreaterThan(0);
    expect(result.revenueAtRiskUsd).toBeGreaterThan(0);
    expect(result.recoverableRevenueUsd).toBeGreaterThan(0);
  });

  it("returns four revenue lanes", () => {
    const lanes = revenueLane();
    expect(lanes).toHaveLength(4);
    expect(lanes.some((lane) => lane.status === "red")).toBe(true);
  });

  it("sorts high-severity system risks first", () => {
    const risks = systemRisks();
    expect(risks[0]?.severity).toBe("high");
  });

  it("returns board-ready investment packets", () => {
    const packets = investmentPriorities();
    expect(packets).toHaveLength(4);
    expect(packets[0]?.packetId).toMatch(/^RIS-/);
  });

  it("returns concise board memo lines", () => {
    const memo = boardMemo();
    expect(memo).toHaveLength(4);
  });
});
