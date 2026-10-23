// Typed models for the AiTrainingRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/ai-training-rates-sdk/go/core"
)

// Guidance is the typed data model for the guidance entity.
type Guidance struct {
}

// GuidanceListMatch is the typed request payload for Guidance.ListTyped.
type GuidanceListMatch struct {
	AddedOn *string `json:"addedOn,omitempty"`
	Finding *string `json:"finding,omitempty"`
	HowToUse *string `json:"howToUse,omitempty"`
	Id *string `json:"id,omitempty"`
	Lever *string `json:"lever,omitempty"`
	ReadOn *string `json:"readOn,omitempty"`
	Side *string `json:"side,omitempty"`
	Sources *[]any `json:"sources,omitempty"`
	Strength *string `json:"strength,omitempty"`
}

// Legal is the typed data model for the legal entity.
type Legal struct {
}

// LegalListMatch is the typed request payload for Legal.ListTyped.
type LegalListMatch struct {
	AmountText *string `json:"amountText,omitempty"`
	AmountUsd *int `json:"amountUsd,omitempty"`
	ApiLimit *string `json:"apiLimit,omitempty"`
	ApiRule *string `json:"apiRule,omitempty"`
	AppliesTo *[]any `json:"appliesTo,omitempty"`
	Basis *string `json:"basis,omitempty"`
	BuyersAsk *string `json:"buyersAsk,omitempty"`
	ByPlan *string `json:"byPlan,omitempty"`
	CaseNumber *string `json:"caseNumber,omitempty"`
	Claim *string `json:"claim,omitempty"`
	ContentType *string `json:"contentType,omitempty"`
	Date *string `json:"date,omitempty"`
	DefendantIds *[]any `json:"defendantIds,omitempty"`
	Evidence *string `json:"evidence,omitempty"`
	ExportAllowed *string `json:"exportAllowed,omitempty"`
	ExportRule *string `json:"exportRule,omitempty"`
	Gap *string `json:"gap,omitempty"`
	Good *string `json:"good,omitempty"`
	Id *string `json:"id,omitempty"`
	Inference *string `json:"inference,omitempty"`
	Jurisdiction *string `json:"jurisdiction,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Name *string `json:"name,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Outcome *string `json:"outcome,omitempty"`
	Parties *[]any `json:"parties,omitempty"`
	PartyIds *[]any `json:"partyIds,omitempty"`
	PerWorkText *string `json:"perWorkText,omitempty"`
	Question *string `json:"question,omitempty"`
	Quote *string `json:"quote,omitempty"`
	RedFlag *string `json:"redFlag,omitempty"`
	Risk *string `json:"risk,omitempty"`
	SellerPosition *string `json:"sellerPosition,omitempty"`
	Severity *string `json:"severity,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceDate *string `json:"sourceDate,omitempty"`
	SourceLabel *string `json:"sourceLabel,omitempty"`
	Sources *[]any `json:"sources,omitempty"`
	Status *string `json:"status,omitempty"`
	StatusAsOf *string `json:"statusAsOf,omitempty"`
	Summary *string `json:"summary,omitempty"`
	Term *string `json:"term,omitempty"`
	Title *string `json:"title,omitempty"`
	Why *string `json:"why,omitempty"`
}

// Market is the typed data model for the market entity.
type Market struct {
}

// MarketListMatch is the typed request payload for Market.ListTyped.
type MarketListMatch struct {
	Acquirer *string `json:"acquirer,omitempty"`
	AddedOn *string `json:"addedOn,omitempty"`
	AmountText *string `json:"amountText,omitempty"`
	AmountUsd *int `json:"amountUsd,omitempty"`
	AnnualUsd *int `json:"annualUsd,omitempty"`
	Basis *string `json:"basis,omitempty"`
	Channel *string `json:"channel,omitempty"`
	CheckWith *string `json:"checkWith,omitempty"`
	Company *string `json:"company,omitempty"`
	CompanyId *string `json:"companyId,omitempty"`
	Content *string `json:"content,omitempty"`
	Counterparty *string `json:"counterparty,omitempty"`
	DataType *string `json:"dataType,omitempty"`
	Date *string `json:"date,omitempty"`
	Event *string `json:"event,omitempty"`
	Fact *string `json:"fact,omitempty"`
	Figure *string `json:"figure,omitempty"`
	Id *string `json:"id,omitempty"`
	Kind *string `json:"kind,omitempty"`
	LeadInvestors *[]any `json:"leadInvestors,omitempty"`
	Licensee *string `json:"licensee,omitempty"`
	LicenseeIds *[]any `json:"licenseeIds,omitempty"`
	Licensor *string `json:"licensor,omitempty"`
	LicensorId *string `json:"licensorId,omitempty"`
	LicensorType *string `json:"licensorType,omitempty"`
	Metric *string `json:"metric,omitempty"`
	Party *string `json:"party,omitempty"`
	PartyId *string `json:"partyId,omitempty"`
	Period *string `json:"period,omitempty"`
	PeriodEnd *string `json:"periodEnd,omitempty"`
	Quote *string `json:"quote,omitempty"`
	ReadOn *string `json:"readOn,omitempty"`
	Round *string `json:"round,omitempty"`
	Segment *string `json:"segment,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceDate *string `json:"sourceDate,omitempty"`
	SourceLabel *string `json:"sourceLabel,omitempty"`
	Status *string `json:"status,omitempty"`
	SupersededBy *string `json:"supersededBy,omitempty"`
	TermYears *int `json:"termYears,omitempty"`
	TermsText *string `json:"termsText,omitempty"`
	Unit *string `json:"unit,omitempty"`
	UnitPriceText *string `json:"unitPriceText,omitempty"`
	Url *string `json:"url,omitempty"`
	Use *string `json:"use,omitempty"`
	ValuationText *string `json:"valuationText,omitempty"`
	ValuationUsd *int `json:"valuationUsd,omitempty"`
	ValueHighUsd *int `json:"valueHighUsd,omitempty"`
	ValueLowUsd *int `json:"valueLowUsd,omitempty"`
	ValueText *string `json:"valueText,omitempty"`
	ValueUsd *int `json:"valueUsd,omitempty"`
}

// Organisation is the typed data model for the organisation entity.
type Organisation struct {
}

// OrganisationListMatch is the typed request payload for Organisation.ListTyped.
type OrganisationListMatch struct {
	Aka *[]any `json:"aka,omitempty"`
	Areas *[]any `json:"areas,omitempty"`
	Basis *string `json:"basis,omitempty"`
	BuysData *map[string]any `json:"buysData,omitempty"`
	Criteria *map[string]any `json:"criteria,omitempty"`
	DeidentifiedBy *string `json:"deidentifiedBy,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Eligibility *string `json:"eligibility,omitempty"`
	Founded *int `json:"founded,omitempty"`
	High *int `json:"high,omitempty"`
	Hq *string `json:"hq,omitempty"`
	Id *string `json:"id,omitempty"`
	IntroducerFee *string `json:"introducerFee,omitempty"`
	IntroducerTerms *map[string]any `json:"introducerTerms,omitempty"`
	Kind *string `json:"kind,omitempty"`
	Low *int `json:"low,omitempty"`
	MadeFrom *[]any `json:"madeFrom,omitempty"`
	Name *string `json:"name,omitempty"`
	OtherDomains *[]any `json:"otherDomains,omitempty"`
	PaidInDays *int `json:"paidInDays,omitempty"`
	PaidWhen *string `json:"paidWhen,omitempty"`
	Pays *string `json:"pays,omitempty"`
	Proof *map[string]any `json:"proof,omitempty"`
	ReadOn *string `json:"readOn,omitempty"`
	Record *map[string]any `json:"record,omitempty"`
	Says *map[string]any `json:"says,omitempty"`
	Scrub *string `json:"scrub,omitempty"`
	Sells *[]any `json:"sells,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceLabel *string `json:"sourceLabel,omitempty"`
	Takes *[]any `json:"takes,omitempty"`
	Wants *string `json:"wants,omitempty"`
	Website *string `json:"website,omitempty"`
	What *string `json:"what,omitempty"`
	WhatSource *string `json:"whatSource,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
}

// PriceListMatch is the typed request payload for Price.ListTyped.
type PriceListMatch struct {
	AddedOn *string `json:"addedOn,omitempty"`
	Basis *string `json:"basis,omitempty"`
	CheckWith *string `json:"checkWith,omitempty"`
	ClosedOn *string `json:"closedOn,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Date *string `json:"date,omitempty"`
	Feed *string `json:"feed,omitempty"`
	From *string `json:"from,omitempty"`
	Group *string `json:"group,omitempty"`
	High *float64 `json:"high,omitempty"`
	Id *string `json:"id,omitempty"`
	Ids *[]any `json:"ids,omitempty"`
	Item *string `json:"item,omitempty"`
	Low *float64 `json:"low,omitempty"`
	Max *float64 `json:"max,omitempty"`
	Median *float64 `json:"median,omitempty"`
	Min *float64 `json:"min,omitempty"`
	N *int `json:"n,omitempty"`
	Note *string `json:"note,omitempty"`
	Open *int `json:"open,omitempty"`
	OrgIds *[]any `json:"orgIds,omitempty"`
	OrgNames *[]any `json:"orgNames,omitempty"`
	P25 *float64 `json:"p25,omitempty"`
	P75 *float64 `json:"p75,omitempty"`
	PerUnitHigh *float64 `json:"perUnitHigh,omitempty"`
	PerUnitLow *float64 `json:"perUnitLow,omitempty"`
	PerUnitNote *string `json:"perUnitNote,omitempty"`
	Price *string `json:"price,omitempty"`
	Quote *string `json:"quote,omitempty"`
	ReadOn *string `json:"readOn,omitempty"`
	Segment *string `json:"segment,omitempty"`
	Side *string `json:"side,omitempty"`
	Source *string `json:"source,omitempty"`
	SourceLabel *string `json:"sourceLabel,omitempty"`
	To *string `json:"to,omitempty"`
	Unit *string `json:"unit,omitempty"`
	UnitKey *string `json:"unitKey,omitempty"`
	Use *string `json:"use,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
