// Typed models for the AiTrainingRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Guidance {
  addedOn: string
  finding: string
  howToUse: string
  id: string
  lever: string
  readOn: string
  side: string
  sources: any[]
  strength: string
}

export interface GuidanceListMatch {
  addedOn?: string
  finding?: string
  howToUse?: string
  id?: string
  lever?: string
  readOn?: string
  side?: string
  sources?: any[]
  strength?: string
}

export interface Legal {
  amountText: string
  amountUsd: number
  apiLimit: string
  apiRule: string
  appliesTo: any[]
  basis: string
  buyersAsk: string
  byPlan: string
  caseNumber: string
  claim: string
  contentType: string
  date: string
  defendantIds: any[]
  evidence: string
  exportAllowed: string
  exportRule: string
  gap: string
  good: string
  id: string
  inference: string
  jurisdiction: string
  kind: string
  name: string
  notes: string
  outcome: string
  parties: any[]
  partyIds: any[]
  perWorkText: string
  question: string
  quote: string
  redFlag: string
  risk: string
  sellerPosition: string
  severity: string
  source: string
  sourceDate: string
  sourceLabel: string
  sources: any[]
  status: string
  statusAsOf: string
  summary: string
  term: string
  title: string
  why: string
}

export interface LegalListMatch {
  amountText?: string
  amountUsd?: number
  apiLimit?: string
  apiRule?: string
  appliesTo?: any[]
  basis?: string
  buyersAsk?: string
  byPlan?: string
  caseNumber?: string
  claim?: string
  contentType?: string
  date?: string
  defendantIds?: any[]
  evidence?: string
  exportAllowed?: string
  exportRule?: string
  gap?: string
  good?: string
  id?: string
  inference?: string
  jurisdiction?: string
  kind?: string
  name?: string
  notes?: string
  outcome?: string
  parties?: any[]
  partyIds?: any[]
  perWorkText?: string
  question?: string
  quote?: string
  redFlag?: string
  risk?: string
  sellerPosition?: string
  severity?: string
  source?: string
  sourceDate?: string
  sourceLabel?: string
  sources?: any[]
  status?: string
  statusAsOf?: string
  summary?: string
  term?: string
  title?: string
  why?: string
}

export interface Market {
  acquirer: string
  addedOn: string
  amountText: string
  amountUsd: number
  annualUsd: number
  basis: string
  channel: string
  checkWith?: string
  company: string
  companyId: string
  content: string
  counterparty: string
  dataType: string
  date: string
  event: string
  fact: string
  figure: string
  id: string
  kind: string
  leadInvestors: any[]
  licensee: string
  licenseeIds: any[]
  licensor: string
  licensorId: string
  licensorType: string
  metric: string
  party: string
  partyId: string
  period: string
  periodEnd: string
  quote: string
  readOn: string
  round: string
  segment: string
  source: string
  sourceDate: string
  sourceLabel: string
  status: string
  supersededBy?: string
  termYears: number
  termsText: string
  unit: string
  unitPriceText: string
  url: string
  use: string
  valuationText: string
  valuationUsd: number
  valueHighUsd: number
  valueLowUsd: number
  valueText: string
  valueUsd: number
}

export interface MarketListMatch {
  acquirer?: string
  addedOn?: string
  amountText?: string
  amountUsd?: number
  annualUsd?: number
  basis?: string
  channel?: string
  checkWith?: string
  company?: string
  companyId?: string
  content?: string
  counterparty?: string
  dataType?: string
  date?: string
  event?: string
  fact?: string
  figure?: string
  id?: string
  kind?: string
  leadInvestors?: any[]
  licensee?: string
  licenseeIds?: any[]
  licensor?: string
  licensorId?: string
  licensorType?: string
  metric?: string
  party?: string
  partyId?: string
  period?: string
  periodEnd?: string
  quote?: string
  readOn?: string
  round?: string
  segment?: string
  source?: string
  sourceDate?: string
  sourceLabel?: string
  status?: string
  supersededBy?: string
  termYears?: number
  termsText?: string
  unit?: string
  unitPriceText?: string
  url?: string
  use?: string
  valuationText?: string
  valuationUsd?: number
  valueHighUsd?: number
  valueLowUsd?: number
  valueText?: string
  valueUsd?: number
}

export interface Organisation {
  aka?: any[]
  areas: any[]
  basis: string
  buysData: Record<string, any>
  criteria: Record<string, any>
  deidentifiedBy?: string
  domain: string
  eligibility: string
  founded: number
  high: number
  hq: string
  id: string
  introducerFee: string
  introducerTerms?: Record<string, any>
  kind: string
  low: number
  madeFrom: any[]
  name: string
  otherDomains?: any[]
  paidInDays?: number
  paidWhen: string
  pays: string
  proof: Record<string, any>
  readOn: string
  record: Record<string, any>
  says: Record<string, any>
  scrub: string
  sells: any[]
  source: string
  sourceLabel: string
  takes: any[]
  wants: string
  website: string
  what: string
  whatSource: string
}

export interface OrganisationListMatch {
  aka?: any[]
  areas?: any[]
  basis?: string
  buysData?: Record<string, any>
  criteria?: Record<string, any>
  deidentifiedBy?: string
  domain?: string
  eligibility?: string
  founded?: number
  high?: number
  hq?: string
  id?: string
  introducerFee?: string
  introducerTerms?: Record<string, any>
  kind?: string
  low?: number
  madeFrom?: any[]
  name?: string
  otherDomains?: any[]
  paidInDays?: number
  paidWhen?: string
  pays?: string
  proof?: Record<string, any>
  readOn?: string
  record?: Record<string, any>
  says?: Record<string, any>
  scrub?: string
  sells?: any[]
  source?: string
  sourceLabel?: string
  takes?: any[]
  wants?: string
  website?: string
  what?: string
  whatSource?: string
}

export interface Price {
  addedOn: string
  basis: string
  checkWith?: string
  closedOn?: string
  currency?: string
  date: string
  feed?: string
  from: string
  group: string
  high: number
  id: string
  ids: any[]
  item: string
  low: number
  max: number
  median: number
  min: number
  n: number
  note: string
  open: number
  orgIds?: any[]
  orgNames?: any[]
  p25: number
  p75: number
  perUnitHigh: number
  perUnitLow: number
  perUnitNote?: string
  price: string
  quote?: string
  readOn: string
  segment: string
  side: string
  source: string
  sourceLabel: string
  to: string
  unit: string
  unitKey: string
  use: string
}

export interface PriceListMatch {
  addedOn?: string
  basis?: string
  checkWith?: string
  closedOn?: string
  currency?: string
  date?: string
  feed?: string
  from?: string
  group?: string
  high?: number
  id?: string
  ids?: any[]
  item?: string
  low?: number
  max?: number
  median?: number
  min?: number
  n?: number
  note?: string
  open?: number
  orgIds?: any[]
  orgNames?: any[]
  p25?: number
  p75?: number
  perUnitHigh?: number
  perUnitLow?: number
  perUnitNote?: string
  price?: string
  quote?: string
  readOn?: string
  segment?: string
  side?: string
  source?: string
  sourceLabel?: string
  to?: string
  unit?: string
  unitKey?: string
  use?: string
}

