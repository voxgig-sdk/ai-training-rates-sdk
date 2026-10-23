# frozen_string_literal: true

# Typed models for the AiTrainingRates SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Guidance entity data model.
#
# @!attribute [rw] addedOn
#   @return [String]
#
# @!attribute [rw] finding
#   @return [String]
#
# @!attribute [rw] howToUse
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] lever
#   @return [String]
#
# @!attribute [rw] readOn
#   @return [String]
#
# @!attribute [rw] side
#   @return [String]
#
# @!attribute [rw] sources
#   @return [Array]
#
# @!attribute [rw] strength
#   @return [String]
Guidance = Struct.new(
  :addedOn,
  :finding,
  :howToUse,
  :id,
  :lever,
  :readOn,
  :side,
  :sources,
  :strength,
  keyword_init: true
)

# Request payload for Guidance#list.
#
# @!attribute [rw] addedOn
#   @return [String, nil]
#
# @!attribute [rw] finding
#   @return [String, nil]
#
# @!attribute [rw] howToUse
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] lever
#   @return [String, nil]
#
# @!attribute [rw] readOn
#   @return [String, nil]
#
# @!attribute [rw] side
#   @return [String, nil]
#
# @!attribute [rw] sources
#   @return [Array, nil]
#
# @!attribute [rw] strength
#   @return [String, nil]
GuidanceListMatch = Struct.new(
  :addedOn,
  :finding,
  :howToUse,
  :id,
  :lever,
  :readOn,
  :side,
  :sources,
  :strength,
  keyword_init: true
)

# Legal entity data model.
#
# @!attribute [rw] amountText
#   @return [String]
#
# @!attribute [rw] amountUsd
#   @return [Integer]
#
# @!attribute [rw] apiLimit
#   @return [String]
#
# @!attribute [rw] apiRule
#   @return [String]
#
# @!attribute [rw] appliesTo
#   @return [Array]
#
# @!attribute [rw] basis
#   @return [String]
#
# @!attribute [rw] buyersAsk
#   @return [String]
#
# @!attribute [rw] byPlan
#   @return [String]
#
# @!attribute [rw] caseNumber
#   @return [String]
#
# @!attribute [rw] claim
#   @return [String]
#
# @!attribute [rw] contentType
#   @return [String]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] defendantIds
#   @return [Array]
#
# @!attribute [rw] evidence
#   @return [String]
#
# @!attribute [rw] exportAllowed
#   @return [String]
#
# @!attribute [rw] exportRule
#   @return [String]
#
# @!attribute [rw] gap
#   @return [String]
#
# @!attribute [rw] good
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inference
#   @return [String]
#
# @!attribute [rw] jurisdiction
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] notes
#   @return [String]
#
# @!attribute [rw] outcome
#   @return [String]
#
# @!attribute [rw] parties
#   @return [Array]
#
# @!attribute [rw] partyIds
#   @return [Array]
#
# @!attribute [rw] perWorkText
#   @return [String]
#
# @!attribute [rw] question
#   @return [String]
#
# @!attribute [rw] quote
#   @return [String]
#
# @!attribute [rw] redFlag
#   @return [String]
#
# @!attribute [rw] risk
#   @return [String]
#
# @!attribute [rw] sellerPosition
#   @return [String]
#
# @!attribute [rw] severity
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] sourceDate
#   @return [String]
#
# @!attribute [rw] sourceLabel
#   @return [String]
#
# @!attribute [rw] sources
#   @return [Array]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] statusAsOf
#   @return [String]
#
# @!attribute [rw] summary
#   @return [String]
#
# @!attribute [rw] term
#   @return [String]
#
# @!attribute [rw] title
#   @return [String]
#
# @!attribute [rw] why
#   @return [String]
Legal = Struct.new(
  :amountText,
  :amountUsd,
  :apiLimit,
  :apiRule,
  :appliesTo,
  :basis,
  :buyersAsk,
  :byPlan,
  :caseNumber,
  :claim,
  :contentType,
  :date,
  :defendantIds,
  :evidence,
  :exportAllowed,
  :exportRule,
  :gap,
  :good,
  :id,
  :inference,
  :jurisdiction,
  :kind,
  :name,
  :notes,
  :outcome,
  :parties,
  :partyIds,
  :perWorkText,
  :question,
  :quote,
  :redFlag,
  :risk,
  :sellerPosition,
  :severity,
  :source,
  :sourceDate,
  :sourceLabel,
  :sources,
  :status,
  :statusAsOf,
  :summary,
  :term,
  :title,
  :why,
  keyword_init: true
)

# Request payload for Legal#list.
#
# @!attribute [rw] amountText
#   @return [String, nil]
#
# @!attribute [rw] amountUsd
#   @return [Integer, nil]
#
# @!attribute [rw] apiLimit
#   @return [String, nil]
#
# @!attribute [rw] apiRule
#   @return [String, nil]
#
# @!attribute [rw] appliesTo
#   @return [Array, nil]
#
# @!attribute [rw] basis
#   @return [String, nil]
#
# @!attribute [rw] buyersAsk
#   @return [String, nil]
#
# @!attribute [rw] byPlan
#   @return [String, nil]
#
# @!attribute [rw] caseNumber
#   @return [String, nil]
#
# @!attribute [rw] claim
#   @return [String, nil]
#
# @!attribute [rw] contentType
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] defendantIds
#   @return [Array, nil]
#
# @!attribute [rw] evidence
#   @return [String, nil]
#
# @!attribute [rw] exportAllowed
#   @return [String, nil]
#
# @!attribute [rw] exportRule
#   @return [String, nil]
#
# @!attribute [rw] gap
#   @return [String, nil]
#
# @!attribute [rw] good
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inference
#   @return [String, nil]
#
# @!attribute [rw] jurisdiction
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] notes
#   @return [String, nil]
#
# @!attribute [rw] outcome
#   @return [String, nil]
#
# @!attribute [rw] parties
#   @return [Array, nil]
#
# @!attribute [rw] partyIds
#   @return [Array, nil]
#
# @!attribute [rw] perWorkText
#   @return [String, nil]
#
# @!attribute [rw] question
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [String, nil]
#
# @!attribute [rw] redFlag
#   @return [String, nil]
#
# @!attribute [rw] risk
#   @return [String, nil]
#
# @!attribute [rw] sellerPosition
#   @return [String, nil]
#
# @!attribute [rw] severity
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] sourceDate
#   @return [String, nil]
#
# @!attribute [rw] sourceLabel
#   @return [String, nil]
#
# @!attribute [rw] sources
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] statusAsOf
#   @return [String, nil]
#
# @!attribute [rw] summary
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
#
# @!attribute [rw] why
#   @return [String, nil]
LegalListMatch = Struct.new(
  :amountText,
  :amountUsd,
  :apiLimit,
  :apiRule,
  :appliesTo,
  :basis,
  :buyersAsk,
  :byPlan,
  :caseNumber,
  :claim,
  :contentType,
  :date,
  :defendantIds,
  :evidence,
  :exportAllowed,
  :exportRule,
  :gap,
  :good,
  :id,
  :inference,
  :jurisdiction,
  :kind,
  :name,
  :notes,
  :outcome,
  :parties,
  :partyIds,
  :perWorkText,
  :question,
  :quote,
  :redFlag,
  :risk,
  :sellerPosition,
  :severity,
  :source,
  :sourceDate,
  :sourceLabel,
  :sources,
  :status,
  :statusAsOf,
  :summary,
  :term,
  :title,
  :why,
  keyword_init: true
)

# Market entity data model.
#
# @!attribute [rw] acquirer
#   @return [String]
#
# @!attribute [rw] addedOn
#   @return [String]
#
# @!attribute [rw] amountText
#   @return [String]
#
# @!attribute [rw] amountUsd
#   @return [Integer]
#
# @!attribute [rw] annualUsd
#   @return [Integer]
#
# @!attribute [rw] basis
#   @return [String]
#
# @!attribute [rw] channel
#   @return [String]
#
# @!attribute [rw] checkWith
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String]
#
# @!attribute [rw] companyId
#   @return [String]
#
# @!attribute [rw] content
#   @return [String]
#
# @!attribute [rw] counterparty
#   @return [String]
#
# @!attribute [rw] dataType
#   @return [String]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] event
#   @return [String]
#
# @!attribute [rw] fact
#   @return [String]
#
# @!attribute [rw] figure
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] leadInvestors
#   @return [Array]
#
# @!attribute [rw] licensee
#   @return [String]
#
# @!attribute [rw] licenseeIds
#   @return [Array]
#
# @!attribute [rw] licensor
#   @return [String]
#
# @!attribute [rw] licensorId
#   @return [String]
#
# @!attribute [rw] licensorType
#   @return [String]
#
# @!attribute [rw] metric
#   @return [String]
#
# @!attribute [rw] party
#   @return [String]
#
# @!attribute [rw] partyId
#   @return [String]
#
# @!attribute [rw] period
#   @return [String]
#
# @!attribute [rw] periodEnd
#   @return [String]
#
# @!attribute [rw] quote
#   @return [String]
#
# @!attribute [rw] readOn
#   @return [String]
#
# @!attribute [rw] round
#   @return [String]
#
# @!attribute [rw] segment
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] sourceDate
#   @return [String]
#
# @!attribute [rw] sourceLabel
#   @return [String]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] supersededBy
#   @return [String, nil]
#
# @!attribute [rw] termYears
#   @return [Integer]
#
# @!attribute [rw] termsText
#   @return [String]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] unitPriceText
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
#
# @!attribute [rw] use
#   @return [String]
#
# @!attribute [rw] valuationText
#   @return [String]
#
# @!attribute [rw] valuationUsd
#   @return [Integer]
#
# @!attribute [rw] valueHighUsd
#   @return [Integer]
#
# @!attribute [rw] valueLowUsd
#   @return [Integer]
#
# @!attribute [rw] valueText
#   @return [String]
#
# @!attribute [rw] valueUsd
#   @return [Integer]
Market = Struct.new(
  :acquirer,
  :addedOn,
  :amountText,
  :amountUsd,
  :annualUsd,
  :basis,
  :channel,
  :checkWith,
  :company,
  :companyId,
  :content,
  :counterparty,
  :dataType,
  :date,
  :event,
  :fact,
  :figure,
  :id,
  :kind,
  :leadInvestors,
  :licensee,
  :licenseeIds,
  :licensor,
  :licensorId,
  :licensorType,
  :metric,
  :party,
  :partyId,
  :period,
  :periodEnd,
  :quote,
  :readOn,
  :round,
  :segment,
  :source,
  :sourceDate,
  :sourceLabel,
  :status,
  :supersededBy,
  :termYears,
  :termsText,
  :unit,
  :unitPriceText,
  :url,
  :use,
  :valuationText,
  :valuationUsd,
  :valueHighUsd,
  :valueLowUsd,
  :valueText,
  :valueUsd,
  keyword_init: true
)

# Request payload for Market#list.
#
# @!attribute [rw] acquirer
#   @return [String, nil]
#
# @!attribute [rw] addedOn
#   @return [String, nil]
#
# @!attribute [rw] amountText
#   @return [String, nil]
#
# @!attribute [rw] amountUsd
#   @return [Integer, nil]
#
# @!attribute [rw] annualUsd
#   @return [Integer, nil]
#
# @!attribute [rw] basis
#   @return [String, nil]
#
# @!attribute [rw] channel
#   @return [String, nil]
#
# @!attribute [rw] checkWith
#   @return [String, nil]
#
# @!attribute [rw] company
#   @return [String, nil]
#
# @!attribute [rw] companyId
#   @return [String, nil]
#
# @!attribute [rw] content
#   @return [String, nil]
#
# @!attribute [rw] counterparty
#   @return [String, nil]
#
# @!attribute [rw] dataType
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] event
#   @return [String, nil]
#
# @!attribute [rw] fact
#   @return [String, nil]
#
# @!attribute [rw] figure
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] leadInvestors
#   @return [Array, nil]
#
# @!attribute [rw] licensee
#   @return [String, nil]
#
# @!attribute [rw] licenseeIds
#   @return [Array, nil]
#
# @!attribute [rw] licensor
#   @return [String, nil]
#
# @!attribute [rw] licensorId
#   @return [String, nil]
#
# @!attribute [rw] licensorType
#   @return [String, nil]
#
# @!attribute [rw] metric
#   @return [String, nil]
#
# @!attribute [rw] party
#   @return [String, nil]
#
# @!attribute [rw] partyId
#   @return [String, nil]
#
# @!attribute [rw] period
#   @return [String, nil]
#
# @!attribute [rw] periodEnd
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [String, nil]
#
# @!attribute [rw] readOn
#   @return [String, nil]
#
# @!attribute [rw] round
#   @return [String, nil]
#
# @!attribute [rw] segment
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] sourceDate
#   @return [String, nil]
#
# @!attribute [rw] sourceLabel
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] supersededBy
#   @return [String, nil]
#
# @!attribute [rw] termYears
#   @return [Integer, nil]
#
# @!attribute [rw] termsText
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
#
# @!attribute [rw] unitPriceText
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] use
#   @return [String, nil]
#
# @!attribute [rw] valuationText
#   @return [String, nil]
#
# @!attribute [rw] valuationUsd
#   @return [Integer, nil]
#
# @!attribute [rw] valueHighUsd
#   @return [Integer, nil]
#
# @!attribute [rw] valueLowUsd
#   @return [Integer, nil]
#
# @!attribute [rw] valueText
#   @return [String, nil]
#
# @!attribute [rw] valueUsd
#   @return [Integer, nil]
MarketListMatch = Struct.new(
  :acquirer,
  :addedOn,
  :amountText,
  :amountUsd,
  :annualUsd,
  :basis,
  :channel,
  :checkWith,
  :company,
  :companyId,
  :content,
  :counterparty,
  :dataType,
  :date,
  :event,
  :fact,
  :figure,
  :id,
  :kind,
  :leadInvestors,
  :licensee,
  :licenseeIds,
  :licensor,
  :licensorId,
  :licensorType,
  :metric,
  :party,
  :partyId,
  :period,
  :periodEnd,
  :quote,
  :readOn,
  :round,
  :segment,
  :source,
  :sourceDate,
  :sourceLabel,
  :status,
  :supersededBy,
  :termYears,
  :termsText,
  :unit,
  :unitPriceText,
  :url,
  :use,
  :valuationText,
  :valuationUsd,
  :valueHighUsd,
  :valueLowUsd,
  :valueText,
  :valueUsd,
  keyword_init: true
)

# Organisation entity data model.
#
# @!attribute [rw] aka
#   @return [Array, nil]
#
# @!attribute [rw] areas
#   @return [Array]
#
# @!attribute [rw] basis
#   @return [String]
#
# @!attribute [rw] buysData
#   @return [Hash]
#
# @!attribute [rw] criteria
#   @return [Hash]
#
# @!attribute [rw] deidentifiedBy
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] eligibility
#   @return [String]
#
# @!attribute [rw] founded
#   @return [Integer]
#
# @!attribute [rw] high
#   @return [Integer]
#
# @!attribute [rw] hq
#   @return [String]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] introducerFee
#   @return [String]
#
# @!attribute [rw] introducerTerms
#   @return [Hash, nil]
#
# @!attribute [rw] kind
#   @return [String]
#
# @!attribute [rw] low
#   @return [Integer]
#
# @!attribute [rw] madeFrom
#   @return [Array]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] otherDomains
#   @return [Array, nil]
#
# @!attribute [rw] paidInDays
#   @return [Integer, nil]
#
# @!attribute [rw] paidWhen
#   @return [String]
#
# @!attribute [rw] pays
#   @return [String]
#
# @!attribute [rw] proof
#   @return [Hash]
#
# @!attribute [rw] readOn
#   @return [String]
#
# @!attribute [rw] record
#   @return [Hash]
#
# @!attribute [rw] says
#   @return [Hash]
#
# @!attribute [rw] scrub
#   @return [String]
#
# @!attribute [rw] sells
#   @return [Array]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] sourceLabel
#   @return [String]
#
# @!attribute [rw] takes
#   @return [Array]
#
# @!attribute [rw] wants
#   @return [String]
#
# @!attribute [rw] website
#   @return [String]
#
# @!attribute [rw] what
#   @return [String]
#
# @!attribute [rw] whatSource
#   @return [String]
Organisation = Struct.new(
  :aka,
  :areas,
  :basis,
  :buysData,
  :criteria,
  :deidentifiedBy,
  :domain,
  :eligibility,
  :founded,
  :high,
  :hq,
  :id,
  :introducerFee,
  :introducerTerms,
  :kind,
  :low,
  :madeFrom,
  :name,
  :otherDomains,
  :paidInDays,
  :paidWhen,
  :pays,
  :proof,
  :readOn,
  :record,
  :says,
  :scrub,
  :sells,
  :source,
  :sourceLabel,
  :takes,
  :wants,
  :website,
  :what,
  :whatSource,
  keyword_init: true
)

# Request payload for Organisation#list.
#
# @!attribute [rw] aka
#   @return [Array, nil]
#
# @!attribute [rw] areas
#   @return [Array, nil]
#
# @!attribute [rw] basis
#   @return [String, nil]
#
# @!attribute [rw] buysData
#   @return [Hash, nil]
#
# @!attribute [rw] criteria
#   @return [Hash, nil]
#
# @!attribute [rw] deidentifiedBy
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] eligibility
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [Integer, nil]
#
# @!attribute [rw] high
#   @return [Integer, nil]
#
# @!attribute [rw] hq
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] introducerFee
#   @return [String, nil]
#
# @!attribute [rw] introducerTerms
#   @return [Hash, nil]
#
# @!attribute [rw] kind
#   @return [String, nil]
#
# @!attribute [rw] low
#   @return [Integer, nil]
#
# @!attribute [rw] madeFrom
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] otherDomains
#   @return [Array, nil]
#
# @!attribute [rw] paidInDays
#   @return [Integer, nil]
#
# @!attribute [rw] paidWhen
#   @return [String, nil]
#
# @!attribute [rw] pays
#   @return [String, nil]
#
# @!attribute [rw] proof
#   @return [Hash, nil]
#
# @!attribute [rw] readOn
#   @return [String, nil]
#
# @!attribute [rw] record
#   @return [Hash, nil]
#
# @!attribute [rw] says
#   @return [Hash, nil]
#
# @!attribute [rw] scrub
#   @return [String, nil]
#
# @!attribute [rw] sells
#   @return [Array, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] sourceLabel
#   @return [String, nil]
#
# @!attribute [rw] takes
#   @return [Array, nil]
#
# @!attribute [rw] wants
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
#
# @!attribute [rw] what
#   @return [String, nil]
#
# @!attribute [rw] whatSource
#   @return [String, nil]
OrganisationListMatch = Struct.new(
  :aka,
  :areas,
  :basis,
  :buysData,
  :criteria,
  :deidentifiedBy,
  :domain,
  :eligibility,
  :founded,
  :high,
  :hq,
  :id,
  :introducerFee,
  :introducerTerms,
  :kind,
  :low,
  :madeFrom,
  :name,
  :otherDomains,
  :paidInDays,
  :paidWhen,
  :pays,
  :proof,
  :readOn,
  :record,
  :says,
  :scrub,
  :sells,
  :source,
  :sourceLabel,
  :takes,
  :wants,
  :website,
  :what,
  :whatSource,
  keyword_init: true
)

# Price entity data model.
#
# @!attribute [rw] addedOn
#   @return [String]
#
# @!attribute [rw] basis
#   @return [String]
#
# @!attribute [rw] checkWith
#   @return [String, nil]
#
# @!attribute [rw] closedOn
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] feed
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String]
#
# @!attribute [rw] group
#   @return [String]
#
# @!attribute [rw] high
#   @return [Float]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] ids
#   @return [Array]
#
# @!attribute [rw] item
#   @return [String]
#
# @!attribute [rw] low
#   @return [Float]
#
# @!attribute [rw] max
#   @return [Float]
#
# @!attribute [rw] median
#   @return [Float]
#
# @!attribute [rw] min
#   @return [Float]
#
# @!attribute [rw] n
#   @return [Integer]
#
# @!attribute [rw] note
#   @return [String]
#
# @!attribute [rw] open
#   @return [Integer]
#
# @!attribute [rw] orgIds
#   @return [Array, nil]
#
# @!attribute [rw] orgNames
#   @return [Array, nil]
#
# @!attribute [rw] p25
#   @return [Float]
#
# @!attribute [rw] p75
#   @return [Float]
#
# @!attribute [rw] perUnitHigh
#   @return [Float]
#
# @!attribute [rw] perUnitLow
#   @return [Float]
#
# @!attribute [rw] perUnitNote
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [String]
#
# @!attribute [rw] quote
#   @return [String, nil]
#
# @!attribute [rw] readOn
#   @return [String]
#
# @!attribute [rw] segment
#   @return [String]
#
# @!attribute [rw] side
#   @return [String]
#
# @!attribute [rw] source
#   @return [String]
#
# @!attribute [rw] sourceLabel
#   @return [String]
#
# @!attribute [rw] to
#   @return [String]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] unitKey
#   @return [String]
#
# @!attribute [rw] use
#   @return [String]
Price = Struct.new(
  :addedOn,
  :basis,
  :checkWith,
  :closedOn,
  :currency,
  :date,
  :feed,
  :from,
  :group,
  :high,
  :id,
  :ids,
  :item,
  :low,
  :max,
  :median,
  :min,
  :n,
  :note,
  :open,
  :orgIds,
  :orgNames,
  :p25,
  :p75,
  :perUnitHigh,
  :perUnitLow,
  :perUnitNote,
  :price,
  :quote,
  :readOn,
  :segment,
  :side,
  :source,
  :sourceLabel,
  :to,
  :unit,
  :unitKey,
  :use,
  keyword_init: true
)

# Request payload for Price#list.
#
# @!attribute [rw] addedOn
#   @return [String, nil]
#
# @!attribute [rw] basis
#   @return [String, nil]
#
# @!attribute [rw] checkWith
#   @return [String, nil]
#
# @!attribute [rw] closedOn
#   @return [String, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] feed
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] group
#   @return [String, nil]
#
# @!attribute [rw] high
#   @return [Float, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] ids
#   @return [Array, nil]
#
# @!attribute [rw] item
#   @return [String, nil]
#
# @!attribute [rw] low
#   @return [Float, nil]
#
# @!attribute [rw] max
#   @return [Float, nil]
#
# @!attribute [rw] median
#   @return [Float, nil]
#
# @!attribute [rw] min
#   @return [Float, nil]
#
# @!attribute [rw] n
#   @return [Integer, nil]
#
# @!attribute [rw] note
#   @return [String, nil]
#
# @!attribute [rw] open
#   @return [Integer, nil]
#
# @!attribute [rw] orgIds
#   @return [Array, nil]
#
# @!attribute [rw] orgNames
#   @return [Array, nil]
#
# @!attribute [rw] p25
#   @return [Float, nil]
#
# @!attribute [rw] p75
#   @return [Float, nil]
#
# @!attribute [rw] perUnitHigh
#   @return [Float, nil]
#
# @!attribute [rw] perUnitLow
#   @return [Float, nil]
#
# @!attribute [rw] perUnitNote
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [String, nil]
#
# @!attribute [rw] readOn
#   @return [String, nil]
#
# @!attribute [rw] segment
#   @return [String, nil]
#
# @!attribute [rw] side
#   @return [String, nil]
#
# @!attribute [rw] source
#   @return [String, nil]
#
# @!attribute [rw] sourceLabel
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
#
# @!attribute [rw] unitKey
#   @return [String, nil]
#
# @!attribute [rw] use
#   @return [String, nil]
PriceListMatch = Struct.new(
  :addedOn,
  :basis,
  :checkWith,
  :closedOn,
  :currency,
  :date,
  :feed,
  :from,
  :group,
  :high,
  :id,
  :ids,
  :item,
  :low,
  :max,
  :median,
  :min,
  :n,
  :note,
  :open,
  :orgIds,
  :orgNames,
  :p25,
  :p75,
  :perUnitHigh,
  :perUnitLow,
  :perUnitNote,
  :price,
  :quote,
  :readOn,
  :segment,
  :side,
  :source,
  :sourceLabel,
  :to,
  :unit,
  :unitKey,
  :use,
  keyword_init: true
)

