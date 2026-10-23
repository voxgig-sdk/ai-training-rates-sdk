# Typed models for the AiTrainingRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Guidance(TypedDict):
    addedOn: str
    finding: str
    howToUse: str
    id: str
    lever: str
    readOn: str
    side: str
    sources: list
    strength: str


class GuidanceListMatch(TypedDict, total=False):
    addedOn: str
    finding: str
    howToUse: str
    id: str
    lever: str
    readOn: str
    side: str
    sources: list
    strength: str


class Legal(TypedDict):
    amountText: str
    amountUsd: int
    apiLimit: str
    apiRule: str
    appliesTo: list
    basis: str
    buyersAsk: str
    byPlan: str
    caseNumber: str
    claim: str
    contentType: str
    date: str
    defendantIds: list
    evidence: str
    exportAllowed: str
    exportRule: str
    gap: str
    good: str
    id: str
    inference: str
    jurisdiction: str
    kind: str
    name: str
    notes: str
    outcome: str
    parties: list
    partyIds: list
    perWorkText: str
    question: str
    quote: str
    redFlag: str
    risk: str
    sellerPosition: str
    severity: str
    source: str
    sourceDate: str
    sourceLabel: str
    sources: list
    status: str
    statusAsOf: str
    summary: str
    term: str
    title: str
    why: str


class LegalListMatch(TypedDict, total=False):
    amountText: str
    amountUsd: int
    apiLimit: str
    apiRule: str
    appliesTo: list
    basis: str
    buyersAsk: str
    byPlan: str
    caseNumber: str
    claim: str
    contentType: str
    date: str
    defendantIds: list
    evidence: str
    exportAllowed: str
    exportRule: str
    gap: str
    good: str
    id: str
    inference: str
    jurisdiction: str
    kind: str
    name: str
    notes: str
    outcome: str
    parties: list
    partyIds: list
    perWorkText: str
    question: str
    quote: str
    redFlag: str
    risk: str
    sellerPosition: str
    severity: str
    source: str
    sourceDate: str
    sourceLabel: str
    sources: list
    status: str
    statusAsOf: str
    summary: str
    term: str
    title: str
    why: str


class MarketRequired(TypedDict):
    acquirer: str
    addedOn: str
    amountText: str
    amountUsd: int
    annualUsd: int
    basis: str
    channel: str
    company: str
    companyId: str
    content: str
    counterparty: str
    dataType: str
    date: str
    event: str
    fact: str
    figure: str
    id: str
    kind: str
    leadInvestors: list
    licensee: str
    licenseeIds: list
    licensor: str
    licensorId: str
    licensorType: str
    metric: str
    party: str
    partyId: str
    period: str
    periodEnd: str
    quote: str
    readOn: str
    round: str
    segment: str
    source: str
    sourceDate: str
    sourceLabel: str
    status: str
    termYears: int
    termsText: str
    unit: str
    unitPriceText: str
    url: str
    use: str
    valuationText: str
    valuationUsd: int
    valueHighUsd: int
    valueLowUsd: int
    valueText: str
    valueUsd: int


class Market(MarketRequired, total=False):
    checkWith: str
    supersededBy: str


class MarketListMatch(TypedDict, total=False):
    acquirer: str
    addedOn: str
    amountText: str
    amountUsd: int
    annualUsd: int
    basis: str
    channel: str
    checkWith: str
    company: str
    companyId: str
    content: str
    counterparty: str
    dataType: str
    date: str
    event: str
    fact: str
    figure: str
    id: str
    kind: str
    leadInvestors: list
    licensee: str
    licenseeIds: list
    licensor: str
    licensorId: str
    licensorType: str
    metric: str
    party: str
    partyId: str
    period: str
    periodEnd: str
    quote: str
    readOn: str
    round: str
    segment: str
    source: str
    sourceDate: str
    sourceLabel: str
    status: str
    supersededBy: str
    termYears: int
    termsText: str
    unit: str
    unitPriceText: str
    url: str
    use: str
    valuationText: str
    valuationUsd: int
    valueHighUsd: int
    valueLowUsd: int
    valueText: str
    valueUsd: int


class OrganisationRequired(TypedDict):
    areas: list
    basis: str
    buysData: dict
    criteria: dict
    domain: str
    eligibility: str
    founded: int
    high: int
    hq: str
    id: str
    introducerFee: str
    kind: str
    low: int
    madeFrom: list
    name: str
    paidWhen: str
    pays: str
    proof: dict
    readOn: str
    record: dict
    says: dict
    scrub: str
    sells: list
    source: str
    sourceLabel: str
    takes: list
    wants: str
    website: str
    what: str
    whatSource: str


class Organisation(OrganisationRequired, total=False):
    aka: list
    deidentifiedBy: str
    introducerTerms: dict
    otherDomains: list
    paidInDays: int


class OrganisationListMatch(TypedDict, total=False):
    aka: list
    areas: list
    basis: str
    buysData: dict
    criteria: dict
    deidentifiedBy: str
    domain: str
    eligibility: str
    founded: int
    high: int
    hq: str
    id: str
    introducerFee: str
    introducerTerms: dict
    kind: str
    low: int
    madeFrom: list
    name: str
    otherDomains: list
    paidInDays: int
    paidWhen: str
    pays: str
    proof: dict
    readOn: str
    record: dict
    says: dict
    scrub: str
    sells: list
    source: str
    sourceLabel: str
    takes: list
    wants: str
    website: str
    what: str
    whatSource: str


PriceRequired = TypedDict('PriceRequired', {
    "addedOn": str,
    "basis": str,
    "date": str,
    "from": str,
    "group": str,
    "high": float,
    "id": str,
    "ids": list,
    "item": str,
    "low": float,
    "max": float,
    "median": float,
    "min": float,
    "n": int,
    "note": str,
    "open": int,
    "p25": float,
    "p75": float,
    "perUnitHigh": float,
    "perUnitLow": float,
    "price": str,
    "readOn": str,
    "segment": str,
    "side": str,
    "source": str,
    "sourceLabel": str,
    "to": str,
    "unit": str,
    "unitKey": str,
    "use": str,
})

PriceOptional = TypedDict('PriceOptional', {
    "checkWith": str,
    "closedOn": str,
    "currency": str,
    "feed": str,
    "orgIds": list,
    "orgNames": list,
    "perUnitNote": str,
    "quote": str,
}, total=False)


class Price(PriceRequired, PriceOptional):
    pass


PriceListMatch = TypedDict('PriceListMatch', {
    "addedOn": str,
    "basis": str,
    "checkWith": str,
    "closedOn": str,
    "currency": str,
    "date": str,
    "feed": str,
    "from": str,
    "group": str,
    "high": float,
    "id": str,
    "ids": list,
    "item": str,
    "low": float,
    "max": float,
    "median": float,
    "min": float,
    "n": int,
    "note": str,
    "open": int,
    "orgIds": list,
    "orgNames": list,
    "p25": float,
    "p75": float,
    "perUnitHigh": float,
    "perUnitLow": float,
    "perUnitNote": str,
    "price": str,
    "quote": str,
    "readOn": str,
    "segment": str,
    "side": str,
    "source": str,
    "sourceLabel": str,
    "to": str,
    "unit": str,
    "unitKey": str,
    "use": str,
}, total=False)
