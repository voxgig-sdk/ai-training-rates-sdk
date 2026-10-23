# AiTrainingRates Golang SDK



The Golang SDK for the AiTrainingRates API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Guidance(nil)` — each with the same small set of operations (`List`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/ai-training-rates-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/ai-training-rates-sdk/tags) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/ai-training-rates-sdk/go=../ai-training-rates-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/ai-training-rates-sdk/go"
)

func main() {
    client := sdk.New()

    // List guidance records — the value is a []any of entities, one per record.
    guidances, err := client.Guidance(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range guidances.([]any) {
        fmt.Println(item.(sdk.Entity).Data())
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
prices, err := client.Price(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = prices
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

prices, err := client.Price(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
// A []any of entities, one per mock record.
for _, item := range prices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewAiTrainingRatesSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AI_TRAINING_RATES_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewAiTrainingRatesSDK

```go
func NewAiTrainingRatesSDK(options map[string]any) *AiTrainingRatesSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *AiTrainingRatesSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AiTrainingRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Guidance` | `(data map[string]any) AiTrainingRatesEntity` | Create a Guidance entity instance. |
| `Legal` | `(data map[string]any) AiTrainingRatesEntity` | Create a Legal entity instance. |
| `Market` | `(data map[string]any) AiTrainingRatesEntity` | Create a Market entity instance. |
| `Organisation` | `(data map[string]any) AiTrainingRatesEntity` | Create an Organisation entity instance. |
| `Price` | `(data map[string]any) AiTrainingRatesEntity` | Create a Price entity instance. |

### Entity interface (AiTrainingRatesEntity)

All entities implement the `AiTrainingRatesEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    guidance, err := client.Guidance(nil).List(nil, nil)
    if err != nil { /* handle */ }
    // guidance is a []any of entities, one per record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Guidance

| Field | Description |
| --- | --- |
| `"addedOn"` |  |
| `"finding"` |  |
| `"howToUse"` |  |
| `"id"` |  |
| `"lever"` |  |
| `"readOn"` |  |
| `"side"` | Values seen: both, buyer, seller. |
| `"sources"` |  |
| `"strength"` | Values seen: indicative, strong. |

Operations: List.

API path: `/datasets/negotiation-levers.json`

#### Legal

| Field | Description |
| --- | --- |
| `"amountText"` |  |
| `"amountUsd"` |  |
| `"apiLimit"` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `"apiRule"` |  |
| `"appliesTo"` |  |
| `"basis"` | Values seen: reported, stated. |
| `"buyersAsk"` |  |
| `"byPlan"` |  |
| `"caseNumber"` |  |
| `"claim"` |  |
| `"contentType"` |  |
| `"date"` |  |
| `"defendantIds"` |  |
| `"evidence"` |  |
| `"exportAllowed"` | Values seen: limited, unclear, yes. |
| `"exportRule"` |  |
| `"gap"` |  |
| `"good"` |  |
| `"id"` |  |
| `"inference"` |  |
| `"jurisdiction"` |  |
| `"kind"` | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `"name"` |  |
| `"notes"` |  |
| `"outcome"` |  |
| `"parties"` |  |
| `"partyIds"` |  |
| `"perWorkText"` |  |
| `"question"` |  |
| `"quote"` |  |
| `"redFlag"` |  |
| `"risk"` | Values seen: high, low, medium. |
| `"sellerPosition"` |  |
| `"severity"` | Values seen: blocker, fixable, note. |
| `"source"` |  |
| `"sourceDate"` |  |
| `"sourceLabel"` |  |
| `"sources"` |  |
| `"status"` |  |
| `"statusAsOf"` |  |
| `"summary"` |  |
| `"term"` |  |
| `"title"` |  |
| `"why"` |  |

Operations: List.

API path: `/datasets/cases.json`

#### Market

| Field | Description |
| --- | --- |
| `"acquirer"` |  |
| `"addedOn"` |  |
| `"amountText"` |  |
| `"amountUsd"` |  |
| `"annualUsd"` |  |
| `"basis"` | Values seen: reported, stated. |
| `"channel"` |  |
| `"checkWith"` |  |
| `"company"` |  |
| `"companyId"` |  |
| `"content"` |  |
| `"counterparty"` |  |
| `"dataType"` |  |
| `"date"` |  |
| `"event"` | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `"fact"` |  |
| `"figure"` |  |
| `"id"` |  |
| `"kind"` | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `"leadInvestors"` |  |
| `"licensee"` |  |
| `"licenseeIds"` |  |
| `"licensor"` |  |
| `"licensorId"` |  |
| `"licensorType"` |  |
| `"metric"` |  |
| `"party"` |  |
| `"partyId"` |  |
| `"period"` |  |
| `"periodEnd"` |  |
| `"quote"` |  |
| `"readOn"` |  |
| `"round"` |  |
| `"segment"` |  |
| `"source"` |  |
| `"sourceDate"` |  |
| `"sourceLabel"` |  |
| `"status"` |  |
| `"supersededBy"` |  |
| `"termYears"` |  |
| `"termsText"` |  |
| `"unit"` |  |
| `"unitPriceText"` |  |
| `"url"` |  |
| `"use"` | Values seen: both, display/grounding, training, unstated. |
| `"valuationText"` |  |
| `"valuationUsd"` |  |
| `"valueHighUsd"` |  |
| `"valueLowUsd"` |  |
| `"valueText"` |  |
| `"valueUsd"` |  |

Operations: List.

API path: `/datasets/deals.json`

#### Organisation

| Field | Description |
| --- | --- |
| `"aka"` |  |
| `"areas"` |  |
| `"basis"` | Values seen: reported, stated. |
| `"buysData"` | The vendor's own words and the page they are on. |
| `"criteria"` | Eligibility criteria as published by the buyer; every key is optional. |
| `"deidentifiedBy"` |  |
| `"domain"` |  |
| `"eligibility"` |  |
| `"founded"` |  |
| `"high"` |  |
| `"hq"` |  |
| `"id"` |  |
| `"introducerFee"` |  |
| `"introducerTerms"` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `"kind"` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `"low"` |  |
| `"madeFrom"` |  |
| `"name"` |  |
| `"otherDomains"` |  |
| `"paidInDays"` |  |
| `"paidWhen"` |  |
| `"pays"` |  |
| `"proof"` |  |
| `"readOn"` |  |
| `"record"` |  |
| `"says"` | The vendor's own words and the page they are on. |
| `"scrub"` |  |
| `"sells"` |  |
| `"source"` |  |
| `"sourceLabel"` |  |
| `"takes"` |  |
| `"wants"` |  |
| `"website"` |  |
| `"what"` |  |
| `"whatSource"` |  |

Operations: List.

API path: `/datasets/buyers.json`

#### Price

| Field | Description |
| --- | --- |
| `"addedOn"` |  |
| `"basis"` | Values seen: docket, listing, reported, stated, vendor. |
| `"checkWith"` |  |
| `"closedOn"` |  |
| `"currency"` | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `"date"` |  |
| `"feed"` | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `"from"` |  |
| `"group"` |  |
| `"high"` |  |
| `"id"` |  |
| `"ids"` | Ids of the price observations (listPrices) behind this row. |
| `"item"` |  |
| `"low"` |  |
| `"max"` |  |
| `"median"` |  |
| `"min"` |  |
| `"n"` | Number of observations. |
| `"note"` |  |
| `"open"` | Number of open-ended observations (no upper bound). |
| `"orgIds"` |  |
| `"orgNames"` |  |
| `"p25"` |  |
| `"p75"` |  |
| `"perUnitHigh"` |  |
| `"perUnitLow"` |  |
| `"perUnitNote"` |  |
| `"price"` |  |
| `"quote"` |  |
| `"readOn"` |  |
| `"segment"` | Always null in the probe; type unverified. |
| `"side"` | Values seen: collection, cost, licence, listing, offer, pay. |
| `"source"` |  |
| `"sourceLabel"` |  |
| `"to"` |  |
| `"unit"` |  |
| `"unitKey"` |  |
| `"use"` |  |

Operations: List.

API path: `/datasets/market-rates.json`



## Entities


### Guidance

Create an instance: `guidance := client.Guidance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedOn` | `string` |  |
| `finding` | `string` |  |
| `howToUse` | `string` |  |
| `id` | `string` |  |
| `lever` | `string` |  |
| `readOn` | `string` |  |
| `side` | `string` | Values seen: both, buyer, seller. |
| `sources` | `[]any` |  |
| `strength` | `string` | Values seen: indicative, strong. |

#### Example: List

```go
guidances, err := client.Guidance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range guidances.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Legal

Create an instance: `legal := client.Legal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amountText` | `string` |  |
| `amountUsd` | `int` |  |
| `apiLimit` | `string` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` |  |
| `appliesTo` | `[]any` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buyersAsk` | `string` |  |
| `byPlan` | `string` |  |
| `caseNumber` | `string` |  |
| `claim` | `string` |  |
| `contentType` | `string` |  |
| `date` | `string` |  |
| `defendantIds` | `[]any` |  |
| `evidence` | `string` |  |
| `exportAllowed` | `string` | Values seen: limited, unclear, yes. |
| `exportRule` | `string` |  |
| `gap` | `string` |  |
| `good` | `string` |  |
| `id` | `string` |  |
| `inference` | `string` |  |
| `jurisdiction` | `string` |  |
| `kind` | `string` | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` | `string` |  |
| `notes` | `string` |  |
| `outcome` | `string` |  |
| `parties` | `[]any` |  |
| `partyIds` | `[]any` |  |
| `perWorkText` | `string` |  |
| `question` | `string` |  |
| `quote` | `string` |  |
| `redFlag` | `string` |  |
| `risk` | `string` | Values seen: high, low, medium. |
| `sellerPosition` | `string` |  |
| `severity` | `string` | Values seen: blocker, fixable, note. |
| `source` | `string` |  |
| `sourceDate` | `string` |  |
| `sourceLabel` | `string` |  |
| `sources` | `[]any` |  |
| `status` | `string` |  |
| `statusAsOf` | `string` |  |
| `summary` | `string` |  |
| `term` | `string` |  |
| `title` | `string` |  |
| `why` | `string` |  |

#### Example: List

```go
legals, err := client.Legal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range legals.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Market

Create an instance: `market := client.Market(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acquirer` | `string` |  |
| `addedOn` | `string` |  |
| `amountText` | `string` |  |
| `amountUsd` | `int` |  |
| `annualUsd` | `int` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `channel` | `string` |  |
| `checkWith` | `string` |  |
| `company` | `string` |  |
| `companyId` | `string` |  |
| `content` | `string` |  |
| `counterparty` | `string` |  |
| `dataType` | `string` |  |
| `date` | `string` |  |
| `event` | `string` | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` | `string` |  |
| `figure` | `string` |  |
| `id` | `string` |  |
| `kind` | `string` | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` | `[]any` |  |
| `licensee` | `string` |  |
| `licenseeIds` | `[]any` |  |
| `licensor` | `string` |  |
| `licensorId` | `string` |  |
| `licensorType` | `string` |  |
| `metric` | `string` |  |
| `party` | `string` |  |
| `partyId` | `string` |  |
| `period` | `string` |  |
| `periodEnd` | `string` |  |
| `quote` | `string` |  |
| `readOn` | `string` |  |
| `round` | `string` |  |
| `segment` | `string` |  |
| `source` | `string` |  |
| `sourceDate` | `string` |  |
| `sourceLabel` | `string` |  |
| `status` | `string` |  |
| `supersededBy` | `string` |  |
| `termYears` | `int` |  |
| `termsText` | `string` |  |
| `unit` | `string` |  |
| `unitPriceText` | `string` |  |
| `url` | `string` |  |
| `use` | `string` | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `string` |  |
| `valuationUsd` | `int` |  |
| `valueHighUsd` | `int` |  |
| `valueLowUsd` | `int` |  |
| `valueText` | `string` |  |
| `valueUsd` | `int` |  |

#### Example: List

```go
markets, err := client.Market(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range markets.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Organisation

Create an instance: `organisation := client.Organisation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aka` | `[]any` |  |
| `areas` | `[]any` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buysData` | `map[string]any` | The vendor's own words and the page they are on. |
| `criteria` | `map[string]any` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` |  |
| `domain` | `string` |  |
| `eligibility` | `string` |  |
| `founded` | `int` |  |
| `high` | `int` |  |
| `hq` | `string` |  |
| `id` | `string` |  |
| `introducerFee` | `string` |  |
| `introducerTerms` | `map[string]any` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `int` |  |
| `madeFrom` | `[]any` |  |
| `name` | `string` |  |
| `otherDomains` | `[]any` |  |
| `paidInDays` | `int` |  |
| `paidWhen` | `string` |  |
| `pays` | `string` |  |
| `proof` | `map[string]any` |  |
| `readOn` | `string` |  |
| `record` | `map[string]any` |  |
| `says` | `map[string]any` | The vendor's own words and the page they are on. |
| `scrub` | `string` |  |
| `sells` | `[]any` |  |
| `source` | `string` |  |
| `sourceLabel` | `string` |  |
| `takes` | `[]any` |  |
| `wants` | `string` |  |
| `website` | `string` |  |
| `what` | `string` |  |
| `whatSource` | `string` |  |

#### Example: List

```go
organisations, err := client.Organisation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range organisations.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### Price

Create an instance: `price := client.Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedOn` | `string` |  |
| `basis` | `string` | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` | `string` |  |
| `closedOn` | `string` |  |
| `currency` | `string` | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` | `string` |  |
| `feed` | `string` | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` | `string` |  |
| `group` | `string` |  |
| `high` | `float64` |  |
| `id` | `string` |  |
| `ids` | `[]any` | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` |  |
| `low` | `float64` |  |
| `max` | `float64` |  |
| `median` | `float64` |  |
| `min` | `float64` |  |
| `n` | `int` | Number of observations. |
| `note` | `string` |  |
| `open` | `int` | Number of open-ended observations (no upper bound). |
| `orgIds` | `[]any` |  |
| `orgNames` | `[]any` |  |
| `p25` | `float64` |  |
| `p75` | `float64` |  |
| `perUnitHigh` | `float64` |  |
| `perUnitLow` | `float64` |  |
| `perUnitNote` | `string` |  |
| `price` | `string` |  |
| `quote` | `string` |  |
| `readOn` | `string` |  |
| `segment` | `string` | Always null in the probe; type unverified. |
| `side` | `string` | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` | `string` |  |
| `sourceLabel` | `string` |  |
| `to` | `string` |  |
| `unit` | `string` |  |
| `unitKey` | `string` |  |
| `use` | `string` |  |

#### Example: List

```go
prices, err := client.Price(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range prices.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

### Package structure

```
github.com/voxgig-sdk/ai-training-rates-sdk/go/
├── ai-training-rates.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/ai-training-rates-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
price := client.Price(nil)
price.List(nil, nil)

// price.Data() now returns the price data from the last list
// price.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
