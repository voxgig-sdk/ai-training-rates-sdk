<?php
declare(strict_types=1);

// Typed models for the AiTrainingRates SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Guidance entity data model. */
class Guidance
{
    public string $addedOn;
    public string $finding;
    public string $howToUse;
    public string $id;
    public string $lever;
    public string $readOn;
    public string $side;
    public array $sources;
    public string $strength;
}

/** Request payload for Guidance#list. */
class GuidanceListMatch
{
    public ?string $addedOn = null;
    public ?string $finding = null;
    public ?string $howToUse = null;
    public ?string $id = null;
    public ?string $lever = null;
    public ?string $readOn = null;
    public ?string $side = null;
    public ?array $sources = null;
    public ?string $strength = null;
}

/** Legal entity data model. */
class Legal
{
    public string $amountText;
    public int $amountUsd;
    public string $apiLimit;
    public string $apiRule;
    public array $appliesTo;
    public string $basis;
    public string $buyersAsk;
    public string $byPlan;
    public string $caseNumber;
    public string $claim;
    public string $contentType;
    public string $date;
    public array $defendantIds;
    public string $evidence;
    public string $exportAllowed;
    public string $exportRule;
    public string $gap;
    public string $good;
    public string $id;
    public string $inference;
    public string $jurisdiction;
    public string $kind;
    public string $name;
    public string $notes;
    public string $outcome;
    public array $parties;
    public array $partyIds;
    public string $perWorkText;
    public string $question;
    public string $quote;
    public string $redFlag;
    public string $risk;
    public string $sellerPosition;
    public string $severity;
    public string $source;
    public string $sourceDate;
    public string $sourceLabel;
    public array $sources;
    public string $status;
    public string $statusAsOf;
    public string $summary;
    public string $term;
    public string $title;
    public string $why;
}

/** Request payload for Legal#list. */
class LegalListMatch
{
    public ?string $amountText = null;
    public ?int $amountUsd = null;
    public ?string $apiLimit = null;
    public ?string $apiRule = null;
    public ?array $appliesTo = null;
    public ?string $basis = null;
    public ?string $buyersAsk = null;
    public ?string $byPlan = null;
    public ?string $caseNumber = null;
    public ?string $claim = null;
    public ?string $contentType = null;
    public ?string $date = null;
    public ?array $defendantIds = null;
    public ?string $evidence = null;
    public ?string $exportAllowed = null;
    public ?string $exportRule = null;
    public ?string $gap = null;
    public ?string $good = null;
    public ?string $id = null;
    public ?string $inference = null;
    public ?string $jurisdiction = null;
    public ?string $kind = null;
    public ?string $name = null;
    public ?string $notes = null;
    public ?string $outcome = null;
    public ?array $parties = null;
    public ?array $partyIds = null;
    public ?string $perWorkText = null;
    public ?string $question = null;
    public ?string $quote = null;
    public ?string $redFlag = null;
    public ?string $risk = null;
    public ?string $sellerPosition = null;
    public ?string $severity = null;
    public ?string $source = null;
    public ?string $sourceDate = null;
    public ?string $sourceLabel = null;
    public ?array $sources = null;
    public ?string $status = null;
    public ?string $statusAsOf = null;
    public ?string $summary = null;
    public ?string $term = null;
    public ?string $title = null;
    public ?string $why = null;
}

/** Market entity data model. */
class Market
{
    public string $acquirer;
    public string $addedOn;
    public string $amountText;
    public int $amountUsd;
    public int $annualUsd;
    public string $basis;
    public string $channel;
    public ?string $checkWith = null;
    public string $company;
    public string $companyId;
    public string $content;
    public string $counterparty;
    public string $dataType;
    public string $date;
    public string $event;
    public string $fact;
    public string $figure;
    public string $id;
    public string $kind;
    public array $leadInvestors;
    public string $licensee;
    public array $licenseeIds;
    public string $licensor;
    public string $licensorId;
    public string $licensorType;
    public string $metric;
    public string $party;
    public string $partyId;
    public string $period;
    public string $periodEnd;
    public string $quote;
    public string $readOn;
    public string $round;
    public string $segment;
    public string $source;
    public string $sourceDate;
    public string $sourceLabel;
    public string $status;
    public ?string $supersededBy = null;
    public int $termYears;
    public string $termsText;
    public string $unit;
    public string $unitPriceText;
    public string $url;
    public string $use;
    public string $valuationText;
    public int $valuationUsd;
    public int $valueHighUsd;
    public int $valueLowUsd;
    public string $valueText;
    public int $valueUsd;
}

/** Request payload for Market#list. */
class MarketListMatch
{
    public ?string $acquirer = null;
    public ?string $addedOn = null;
    public ?string $amountText = null;
    public ?int $amountUsd = null;
    public ?int $annualUsd = null;
    public ?string $basis = null;
    public ?string $channel = null;
    public ?string $checkWith = null;
    public ?string $company = null;
    public ?string $companyId = null;
    public ?string $content = null;
    public ?string $counterparty = null;
    public ?string $dataType = null;
    public ?string $date = null;
    public ?string $event = null;
    public ?string $fact = null;
    public ?string $figure = null;
    public ?string $id = null;
    public ?string $kind = null;
    public ?array $leadInvestors = null;
    public ?string $licensee = null;
    public ?array $licenseeIds = null;
    public ?string $licensor = null;
    public ?string $licensorId = null;
    public ?string $licensorType = null;
    public ?string $metric = null;
    public ?string $party = null;
    public ?string $partyId = null;
    public ?string $period = null;
    public ?string $periodEnd = null;
    public ?string $quote = null;
    public ?string $readOn = null;
    public ?string $round = null;
    public ?string $segment = null;
    public ?string $source = null;
    public ?string $sourceDate = null;
    public ?string $sourceLabel = null;
    public ?string $status = null;
    public ?string $supersededBy = null;
    public ?int $termYears = null;
    public ?string $termsText = null;
    public ?string $unit = null;
    public ?string $unitPriceText = null;
    public ?string $url = null;
    public ?string $use = null;
    public ?string $valuationText = null;
    public ?int $valuationUsd = null;
    public ?int $valueHighUsd = null;
    public ?int $valueLowUsd = null;
    public ?string $valueText = null;
    public ?int $valueUsd = null;
}

/** Organisation entity data model. */
class Organisation
{
    public ?array $aka = null;
    public array $areas;
    public string $basis;
    public array $buysData;
    public array $criteria;
    public ?string $deidentifiedBy = null;
    public string $domain;
    public string $eligibility;
    public int $founded;
    public int $high;
    public string $hq;
    public string $id;
    public string $introducerFee;
    public ?array $introducerTerms = null;
    public string $kind;
    public int $low;
    public array $madeFrom;
    public string $name;
    public ?array $otherDomains = null;
    public ?int $paidInDays = null;
    public string $paidWhen;
    public string $pays;
    public array $proof;
    public string $readOn;
    public array $record;
    public array $says;
    public string $scrub;
    public array $sells;
    public string $source;
    public string $sourceLabel;
    public array $takes;
    public string $wants;
    public string $website;
    public string $what;
    public string $whatSource;
}

/** Request payload for Organisation#list. */
class OrganisationListMatch
{
    public ?array $aka = null;
    public ?array $areas = null;
    public ?string $basis = null;
    public ?array $buysData = null;
    public ?array $criteria = null;
    public ?string $deidentifiedBy = null;
    public ?string $domain = null;
    public ?string $eligibility = null;
    public ?int $founded = null;
    public ?int $high = null;
    public ?string $hq = null;
    public ?string $id = null;
    public ?string $introducerFee = null;
    public ?array $introducerTerms = null;
    public ?string $kind = null;
    public ?int $low = null;
    public ?array $madeFrom = null;
    public ?string $name = null;
    public ?array $otherDomains = null;
    public ?int $paidInDays = null;
    public ?string $paidWhen = null;
    public ?string $pays = null;
    public ?array $proof = null;
    public ?string $readOn = null;
    public ?array $record = null;
    public ?array $says = null;
    public ?string $scrub = null;
    public ?array $sells = null;
    public ?string $source = null;
    public ?string $sourceLabel = null;
    public ?array $takes = null;
    public ?string $wants = null;
    public ?string $website = null;
    public ?string $what = null;
    public ?string $whatSource = null;
}

/** Price entity data model. */
class Price
{
    public string $addedOn;
    public string $basis;
    public ?string $checkWith = null;
    public ?string $closedOn = null;
    public ?string $currency = null;
    public string $date;
    public ?string $feed = null;
    public string $from;
    public string $group;
    public float $high;
    public string $id;
    public array $ids;
    public string $item;
    public float $low;
    public float $max;
    public float $median;
    public float $min;
    public int $n;
    public string $note;
    public int $open;
    public ?array $orgIds = null;
    public ?array $orgNames = null;
    public float $p25;
    public float $p75;
    public float $perUnitHigh;
    public float $perUnitLow;
    public ?string $perUnitNote = null;
    public string $price;
    public ?string $quote = null;
    public string $readOn;
    public string $segment;
    public string $side;
    public string $source;
    public string $sourceLabel;
    public string $to;
    public string $unit;
    public string $unitKey;
    public string $use;
}

/** Request payload for Price#list. */
class PriceListMatch
{
    public ?string $addedOn = null;
    public ?string $basis = null;
    public ?string $checkWith = null;
    public ?string $closedOn = null;
    public ?string $currency = null;
    public ?string $date = null;
    public ?string $feed = null;
    public ?string $from = null;
    public ?string $group = null;
    public ?float $high = null;
    public ?string $id = null;
    public ?array $ids = null;
    public ?string $item = null;
    public ?float $low = null;
    public ?float $max = null;
    public ?float $median = null;
    public ?float $min = null;
    public ?int $n = null;
    public ?string $note = null;
    public ?int $open = null;
    public ?array $orgIds = null;
    public ?array $orgNames = null;
    public ?float $p25 = null;
    public ?float $p75 = null;
    public ?float $perUnitHigh = null;
    public ?float $perUnitLow = null;
    public ?string $perUnitNote = null;
    public ?string $price = null;
    public ?string $quote = null;
    public ?string $readOn = null;
    public ?string $segment = null;
    public ?string $side = null;
    public ?string $source = null;
    public ?string $sourceLabel = null;
    public ?string $to = null;
    public ?string $unit = null;
    public ?string $unitKey = null;
    public ?string $use = null;
}

