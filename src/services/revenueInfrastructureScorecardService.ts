import { analyze } from "../analyze.js";
import { sampleRevenueInfrastructure } from "../data/sampleRevenueInfrastructure.js";

const report = analyze(sampleRevenueInfrastructure, { now: "2026-05-31T09:30:00Z" });

export function summary() {
  const highFindings = report.findingsList.filter((item) => item.severity === "high").length;
  return {
    systems: report.systems,
    highRiskSystems: report.highRiskSystems,
    brokenSystems: report.brokenSystems,
    staleSystems: report.staleSystems,
    integrityScore: report.integrityScore,
    annualSpendUsd: report.annualSpendUsd,
    revenueAtRiskUsd: report.revenueAtRiskUsd,
    recoverableRevenueUsd: report.recoverableRevenueUsd,
    highFindings,
    recommendation:
      "Prioritize attribution proof, routing latency, forecasting shadow systems, and dashboard trust before repeating growth-efficiency claims to the board."
  };
}

export function revenueLane() {
  return [
    {
      lane: "Capture and routing lane",
      owner: "Revenue systems",
      status: "red",
      relatedFindings: 3,
      focus: "Repair the handoff path from inbound capture into routed ownership before more qualified demand disappears into queue delay.",
      nextAction: "Fund routing policy cleanup and named-account exception removal before the next board growth update.",
      note: "This is where pipeline leakage moves fastest and becomes most visible."
    },
    {
      lane: "Attribution and measurement lane",
      owner: "Growth analytics",
      status: "red",
      relatedFindings: 3,
      focus: "Replace black-box attribution language with one current proof packet that can survive CFO scrutiny.",
      nextAction: "Rebuild the paid, organic, and partner attribution readout with named assumptions and dated evidence.",
      note: "Budget reallocation claims are ahead of proof."
    },
    {
      lane: "Reporting and warehouse lane",
      owner: "Finance analytics",
      status: "yellow",
      relatedFindings: 2,
      focus: "Reduce dashboard stitching and warehouse timing caveats so the monthly board pack stops leaning on manual narrative glue.",
      nextAction: "Consolidate export freshness and metric-dictionary ownership into one current reporting packet.",
      note: "This lane is close to decision-safe but still too manual."
    },
    {
      lane: "Forecast and board lane",
      owner: "CRO office",
      status: "red",
      relatedFindings: 2,
      focus: "Eliminate spreadsheet shadow forecasting before growth confidence hardens into the wrong board story.",
      nextAction: "Move scenario overrides into one governed planning layer and retire shadow commit logic.",
      note: "This lane determines whether leadership can defend the growth plan as investable."
    }
  ];
}

export function systemRisks() {
  const order = { high: 0, medium: 1, low: 2, info: 3 } as const;
  return report.findingsList
    .map((finding) => ({
      ...finding,
      owner:
        finding.domain === "CRM_HYGIENE"
          ? "RevOps"
          : finding.domain === "ATTRIBUTION"
            ? "Growth analytics"
            : finding.domain === "LEAD_ROUTING"
              ? "Revenue systems"
              : finding.domain === "REPORTING_TRUST" || finding.domain === "DATA_WAREHOUSE"
                ? "Finance analytics"
                : finding.domain === "FORECASTING"
                  ? "CRO office"
                  : "Finance systems"
    }))
    .sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
}

export function investmentPriorities() {
  return [
    {
      packetId: "RIS-14",
      lane: "Attribution reset",
      completenessScore: 39,
      status: "red",
      blocker: "Growth spend decisions still depend on partial and black-box attribution assumptions.",
      owner: "Growth analytics",
      decisionNote: "This is the cleanest near-term way to improve CFO trust and stop spend arguments from turning political.",
      launchWindowHours: 72
    },
    {
      packetId: "RIS-22",
      lane: "Routing and handoff repair",
      completenessScore: 44,
      status: "red",
      blocker: "Enterprise leads still hit queue delay and named-account routing exceptions.",
      owner: "Revenue systems",
      decisionNote: "Fund this when the board asks where qualified demand is leaking after marketing capture.",
      launchWindowHours: 48
    },
    {
      packetId: "RIS-31",
      lane: "Dashboard trust and warehouse freshness",
      completenessScore: 63,
      status: "yellow",
      blocker: "Board reporting still needs manual narrative stitching and freshness caveats.",
      owner: "Finance analytics",
      decisionNote: "This is the bridge between operator dashboards and executive confidence.",
      launchWindowHours: 96
    },
    {
      packetId: "RIS-41",
      lane: "Forecast operating layer",
      completenessScore: 36,
      status: "red",
      blocker: "Spreadsheet shadow systems still determine the final growth story.",
      owner: "CRO office",
      decisionNote: "This is the investment to make when leadership wants a board-ready growth plan instead of a heroic spreadsheet process.",
      launchWindowHours: 84
    }
  ];
}

export function boardMemo() {
  return [
    "Revenue infrastructure is usable, but not yet board-safe across attribution, routing, and forecast confidence.",
    "The largest recoverable value sits inside attribution reset, routing repair, and forecast operating-layer consolidation.",
    "Dashboard and warehouse trust are improving, but still depend on manual stitching that weakens executive confidence.",
    "The investment story is not headcount reduction. It is credibility, timing, and revenue signal integrity."
  ];
}

export function verification() {
  return [
    "Synthetic sample data only - no production CRM, billing, or warehouse credentials are shipped.",
    "All integrity scores and risk findings are derived from modeled revenue-system reviews inside this repo.",
    "The scorecard is read-only and built for board discussion, RevOps prioritization, and investor diligence framing.",
    "Revenue-at-risk and recoverable-value numbers are synthetic modeling aids, not audited financial statements.",
    "Every route, memo, and score is reproducible from the sample export included in the repo."
  ];
}

export function payload() {
  return {
    generatedAt: report.generatedAt,
    summary: summary(),
    revenueLane: revenueLane(),
    systemRisks: systemRisks(),
    investmentPriorities: investmentPriorities(),
    boardMemo: boardMemo(),
    verification: verification(),
    sample: sampleRevenueInfrastructure
  };
}
