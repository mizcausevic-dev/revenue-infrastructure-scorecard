export type RevenueDomain =
  | "CRM_HYGIENE"
  | "ATTRIBUTION"
  | "LEAD_ROUTING"
  | "REPORTING_TRUST"
  | "MARTECH_SPRAWL"
  | "DATA_WAREHOUSE"
  | "BILLING_HANDOFF"
  | "FORECASTING";

export type EvidenceState = "CURRENT" | "STALE" | "MISSING";
export type ReviewStatus = "VERIFIED" | "PARTIAL" | "BROKEN";

export interface RevenueSystemRecord {
  id: string;
  systemName: string;
  vendor: string;
  domain: RevenueDomain;
  owner: string;
  claim: string;
  observedState: string;
  evidenceState: EvidenceState;
  reviewStatus: ReviewStatus;
  lastVerifiedAt: string;
  annualSpendUsd: number;
  revenueAtRiskUsd: number;
  recoverableRevenueUsd: number;
  integrationCount: number;
  boardPriority: "NOW" | "NEXT" | "WATCH";
  notes: string[];
}

export interface RevenueInfrastructureExport {
  generatedAt: string;
  records: RevenueSystemRecord[];
}

export type FindingCode =
  | "crm-hygiene-drift"
  | "attribution-blind-spot"
  | "routing-delay"
  | "reporting-trust-gap"
  | "martech-sprawl-cost"
  | "warehouse-latency"
  | "billing-handoff-gap"
  | "forecast-confidence-gap"
  | "board-story-fracture";

export interface Finding {
  code: FindingCode;
  severity: "high" | "medium" | "low" | "info";
  message: string;
  domain: RevenueDomain;
  systemName: string;
  vendor: string;
}

export interface RevenuePostureReport {
  generatedAt: string;
  systems: number;
  highRiskSystems: number;
  brokenSystems: number;
  staleSystems: number;
  integrityScore: number;
  annualSpendUsd: number;
  revenueAtRiskUsd: number;
  recoverableRevenueUsd: number;
  findingsList: Finding[];
  ok: boolean;
}
