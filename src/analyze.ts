import type { Finding, RevenueInfrastructureExport, RevenuePostureReport, RevenueSystemRecord } from "./types.js";

function finding(
  record: RevenueSystemRecord,
  code: Finding["code"],
  severity: Finding["severity"],
  message: string
): Finding {
  return {
    code,
    severity,
    message,
    domain: record.domain,
    systemName: record.systemName,
    vendor: record.vendor
  };
}

function evaluateRecord(record: RevenueSystemRecord): Finding[] {
  const findings: Finding[] = [];
  const state = record.observedState.toLowerCase();

  if (record.reviewStatus === "BROKEN") {
    findings.push(finding(record, "board-story-fracture", "high", "This system is broken enough that the current board narrative cannot rely on it."));  
  }

  if (record.evidenceState === "STALE" || record.evidenceState === "MISSING") {
    if (record.domain === "REPORTING_TRUST") {
      findings.push(finding(record, "reporting-trust-gap", "high", "Executive reporting still depends on stale or missing evidence, so dashboards are not decision-safe."));
    } else if (record.domain === "ATTRIBUTION") {
      findings.push(finding(record, "attribution-blind-spot", "high", "Attribution confidence is overstated because the current proof is stale or missing."));
    } else if (record.domain === "FORECASTING") {
      findings.push(finding(record, "forecast-confidence-gap", "medium", "Forecast confidence is relying on stale proof and should be reset before board review."));
    }
  }

  if (record.domain === "CRM_HYGIENE" && state.includes("manual")) {
    findings.push(finding(record, "crm-hygiene-drift", "medium", "CRM ownership and lifecycle fields still require manual cleanup, which leaks trust and pipeline accuracy."));
  }

  if (record.domain === "ATTRIBUTION" && (state.includes("black box") || state.includes("partial"))) {
    findings.push(finding(record, "attribution-blind-spot", "high", "Attribution is still partial or black-boxed, so marketing efficiency claims overstate the real signal."));
  }

  if (record.domain === "LEAD_ROUTING" && (state.includes("delay") || state.includes("queue"))) {
    findings.push(finding(record, "routing-delay", "high", "Lead routing still has queue or delay behavior that pushes revenue risk into handoff gaps."));
  }

  if (record.domain === "MARTECH_SPRAWL" && (record.integrationCount > 18 || state.includes("duplicate"))) {
    findings.push(finding(record, "martech-sprawl-cost", "medium", "MarTech duplication and integration sprawl are burning budget without strengthening revenue signal."));
  }

  if (record.domain === "DATA_WAREHOUSE" && (state.includes("latency") || state.includes("backfill"))) {
    findings.push(finding(record, "warehouse-latency", "medium", "Revenue reporting still depends on warehouse latency or backfill work, which weakens board timing and trust."));
  }

  if (record.domain === "BILLING_HANDOFF" && (state.includes("reconciliation") || state.includes("manual"))) {
    findings.push(finding(record, "billing-handoff-gap", "medium", "Billing and revenue handoff still needs manual reconciliation, which obscures the real leakage path."));
  }

  if (record.domain === "FORECASTING" && (state.includes("shadow") || state.includes("spreadsheet"))) {
    findings.push(finding(record, "forecast-confidence-gap", "high", "Executive forecasting still leans on spreadsheet shadow systems, not one trusted operating layer."));
  }

  return findings;
}

export function analyze(
  records: RevenueSystemRecord[],
  options: { now?: string; staleAfterDays?: number } = {}
): RevenuePostureReport {
  const generatedAt = options.now ?? new Date().toISOString();
  const staleAfterDays = options.staleAfterDays ?? 30;
  const nowMs = new Date(generatedAt).getTime();

  const findingsList = records.flatMap(evaluateRecord);
  const highRiskSystems = records.filter((record) => record.revenueAtRiskUsd >= 150000 || record.reviewStatus === "BROKEN").length;
  const brokenSystems = records.filter((record) => record.reviewStatus === "BROKEN").length;
  const staleSystems = records.filter((record) => {
    const ageDays = (nowMs - new Date(record.lastVerifiedAt).getTime()) / (1000 * 60 * 60 * 24);
    return record.evidenceState !== "CURRENT" || ageDays > staleAfterDays;
  }).length;

  const annualSpendUsd = records.reduce((sum, record) => sum + record.annualSpendUsd, 0);
  const revenueAtRiskUsd = records.reduce((sum, record) => sum + record.revenueAtRiskUsd, 0);
  const recoverableRevenueUsd = records.reduce((sum, record) => sum + record.recoverableRevenueUsd, 0);
  const highFindings = findingsList.filter((finding) => finding.severity === "high").length;
  const mediumFindings = findingsList.filter((finding) => finding.severity === "medium").length;

  const penalty = brokenSystems * 10 + staleSystems * 4 + highFindings * 5 + mediumFindings * 2;
  const integrityScore = Math.max(8, 100 - penalty);

  return {
    generatedAt,
    systems: records.length,
    highRiskSystems,
    brokenSystems,
    staleSystems,
    integrityScore,
    annualSpendUsd,
    revenueAtRiskUsd,
    recoverableRevenueUsd,
    findingsList,
    ok: brokenSystems === 0 && staleSystems <= 1
  };
}

export function toExport(records: RevenueSystemRecord[], now?: string): RevenueInfrastructureExport {
  return {
    generatedAt: now ?? new Date().toISOString(),
    records
  };
}
