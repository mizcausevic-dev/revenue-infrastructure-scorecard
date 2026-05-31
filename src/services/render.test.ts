import { describe, expect, it } from "vitest";

import {
  renderBoardMemo,
  renderDocs,
  renderInvestmentPriorities,
  renderOverview,
  renderRevenueLane,
  renderSystemRisks,
  renderVerification
} from "./render.js";

describe("revenue infrastructure renderers", () => {
  it("renders the overview hero", () => {
    expect(renderOverview()).toContain("Revenue Infrastructure Scorecard");
    expect(renderOverview()).toContain("integrity score");
  });

  it("renders each detail page", () => {
    expect(renderRevenueLane()).toContain("Revenue Lane");
    expect(renderSystemRisks()).toContain("System Risks");
    expect(renderInvestmentPriorities()).toContain("Investment Priorities");
    expect(renderBoardMemo()).toContain("Board Memo");
    expect(renderVerification()).toContain("Verification");
    expect(renderDocs()).toContain("Public control surface");
  });

  it("keeps the standard footer trio", () => {
    expect(renderDocs()).toContain("github.com/mizcausevic-dev");
    expect(renderDocs()).toContain("linkedin.com/in/mirzacausevic");
    expect(renderDocs()).toContain("kineticgain.com");
  });
});
