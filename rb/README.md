# AiTrainingRates Ruby SDK



The Ruby SDK for the AiTrainingRates API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Guidance` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/ai-training-rates-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/ai-training-rates-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-ai-training-rates-sdk", path: "./ai-training-rates-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "AiTrainingRates_sdk"

client = AiTrainingRatesSDK.new
```

### 2. List guidance records

```ruby
begin
  # list returns an Array of Guidance entities, one per record; data_get reads the record.
  guidances = client.Guidance.list
  guidances.each do |item|
    record = item.data_get
    puts "#{record["id"]} #{record["addedOn"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  prices = client.Price.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = AiTrainingRatesSDK.test

# list returns an Array of Price entities, one per mock record (raises on
# error); data_get reads each record.
prices = client.Price.list()
prices.each { |item| puts item.data_get }
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = AiTrainingRatesSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### AiTrainingRatesSDK

```ruby
require_relative "AiTrainingRates_sdk"
client = AiTrainingRatesSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = AiTrainingRatesSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AiTrainingRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Guidance` | `(data) -> GuidanceEntity` | Create a Guidance entity instance. |
| `Legal` | `(data) -> LegalEntity` | Create a Legal entity instance. |
| `Market` | `(data) -> MarketEntity` | Create a Market entity instance. |
| `Organisation` | `(data) -> OrganisationEntity` | Create an Organisation entity instance. |
| `Price` | `(data) -> PriceEntity` | Create a Price entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`AiTrainingRatesError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Guidance

| Field | Description |
| --- | --- |
| `addedOn` |  |
| `finding` |  |
| `howToUse` |  |
| `id` |  |
| `lever` |  |
| `readOn` |  |
| `side` | Values seen: both, buyer, seller. |
| `sources` |  |
| `strength` | Values seen: indicative, strong. |

Operations: List.

API path: `/datasets/negotiation-levers.json`

#### Legal

| Field | Description |
| --- | --- |
| `amountText` |  |
| `amountUsd` |  |
| `apiLimit` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` |  |
| `appliesTo` |  |
| `basis` | Values seen: reported, stated. |
| `buyersAsk` |  |
| `byPlan` |  |
| `caseNumber` |  |
| `claim` |  |
| `contentType` |  |
| `date` |  |
| `defendantIds` |  |
| `evidence` |  |
| `exportAllowed` | Values seen: limited, unclear, yes. |
| `exportRule` |  |
| `gap` |  |
| `good` |  |
| `id` |  |
| `inference` |  |
| `jurisdiction` |  |
| `kind` | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` |  |
| `notes` |  |
| `outcome` |  |
| `parties` |  |
| `partyIds` |  |
| `perWorkText` |  |
| `question` |  |
| `quote` |  |
| `redFlag` |  |
| `risk` | Values seen: high, low, medium. |
| `sellerPosition` |  |
| `severity` | Values seen: blocker, fixable, note. |
| `source` |  |
| `sourceDate` |  |
| `sourceLabel` |  |
| `sources` |  |
| `status` |  |
| `statusAsOf` |  |
| `summary` |  |
| `term` |  |
| `title` |  |
| `why` |  |

Operations: List.

API path: `/datasets/cases.json`

#### Market

| Field | Description |
| --- | --- |
| `acquirer` |  |
| `addedOn` |  |
| `amountText` |  |
| `amountUsd` |  |
| `annualUsd` |  |
| `basis` | Values seen: reported, stated. |
| `channel` |  |
| `checkWith` |  |
| `company` |  |
| `companyId` |  |
| `content` |  |
| `counterparty` |  |
| `dataType` |  |
| `date` |  |
| `event` | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` |  |
| `figure` |  |
| `id` |  |
| `kind` | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` |  |
| `licensee` |  |
| `licenseeIds` |  |
| `licensor` |  |
| `licensorId` |  |
| `licensorType` |  |
| `metric` |  |
| `party` |  |
| `partyId` |  |
| `period` |  |
| `periodEnd` |  |
| `quote` |  |
| `readOn` |  |
| `round` |  |
| `segment` |  |
| `source` |  |
| `sourceDate` |  |
| `sourceLabel` |  |
| `status` |  |
| `supersededBy` |  |
| `termYears` |  |
| `termsText` |  |
| `unit` |  |
| `unitPriceText` |  |
| `url` |  |
| `use` | Values seen: both, display/grounding, training, unstated. |
| `valuationText` |  |
| `valuationUsd` |  |
| `valueHighUsd` |  |
| `valueLowUsd` |  |
| `valueText` |  |
| `valueUsd` |  |

Operations: List.

API path: `/datasets/deals.json`

#### Organisation

| Field | Description |
| --- | --- |
| `aka` |  |
| `areas` |  |
| `basis` | Values seen: reported, stated. |
| `buysData` | The vendor's own words and the page they are on. |
| `criteria` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` |  |
| `domain` |  |
| `eligibility` |  |
| `founded` |  |
| `high` |  |
| `hq` |  |
| `id` |  |
| `introducerFee` |  |
| `introducerTerms` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` |  |
| `madeFrom` |  |
| `name` |  |
| `otherDomains` |  |
| `paidInDays` |  |
| `paidWhen` |  |
| `pays` |  |
| `proof` |  |
| `readOn` |  |
| `record` |  |
| `says` | The vendor's own words and the page they are on. |
| `scrub` |  |
| `sells` |  |
| `source` |  |
| `sourceLabel` |  |
| `takes` |  |
| `wants` |  |
| `website` |  |
| `what` |  |
| `whatSource` |  |

Operations: List.

API path: `/datasets/buyers.json`

#### Price

| Field | Description |
| --- | --- |
| `addedOn` |  |
| `basis` | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` |  |
| `closedOn` |  |
| `currency` | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` |  |
| `feed` | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` |  |
| `group` |  |
| `high` |  |
| `id` |  |
| `ids` | Ids of the price observations (listPrices) behind this row. |
| `item` |  |
| `low` |  |
| `max` |  |
| `median` |  |
| `min` |  |
| `n` | Number of observations. |
| `note` |  |
| `open` | Number of open-ended observations (no upper bound). |
| `orgIds` |  |
| `orgNames` |  |
| `p25` |  |
| `p75` |  |
| `perUnitHigh` |  |
| `perUnitLow` |  |
| `perUnitNote` |  |
| `price` |  |
| `quote` |  |
| `readOn` |  |
| `segment` | Always null in the probe; type unverified. |
| `side` | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` |  |
| `sourceLabel` |  |
| `to` |  |
| `unit` |  |
| `unitKey` |  |
| `use` |  |

Operations: List.

API path: `/datasets/market-rates.json`



## Entities


### Guidance

Create an instance: `guidance = client.Guidance`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedOn` | `String` |  |
| `finding` | `String` |  |
| `howToUse` | `String` |  |
| `id` | `String` |  |
| `lever` | `String` |  |
| `readOn` | `String` |  |
| `side` | `String` | Values seen: both, buyer, seller. |
| `sources` | `Array` |  |
| `strength` | `String` | Values seen: indicative, strong. |

#### Example: List

```ruby
# list returns an Array of Guidance entities, one per record (raises on error).
guidances = client.Guidance.list
guidances.each { |item| puts item.data_get }
```


### Legal

Create an instance: `legal = client.Legal`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amountText` | `String` |  |
| `amountUsd` | `Integer` |  |
| `apiLimit` | `String` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `String` |  |
| `appliesTo` | `Array` |  |
| `basis` | `String` | Values seen: reported, stated. |
| `buyersAsk` | `String` |  |
| `byPlan` | `String` |  |
| `caseNumber` | `String` |  |
| `claim` | `String` |  |
| `contentType` | `String` |  |
| `date` | `String` |  |
| `defendantIds` | `Array` |  |
| `evidence` | `String` |  |
| `exportAllowed` | `String` | Values seen: limited, unclear, yes. |
| `exportRule` | `String` |  |
| `gap` | `String` |  |
| `good` | `String` |  |
| `id` | `String` |  |
| `inference` | `String` |  |
| `jurisdiction` | `String` |  |
| `kind` | `String` | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` | `String` |  |
| `notes` | `String` |  |
| `outcome` | `String` |  |
| `parties` | `Array` |  |
| `partyIds` | `Array` |  |
| `perWorkText` | `String` |  |
| `question` | `String` |  |
| `quote` | `String` |  |
| `redFlag` | `String` |  |
| `risk` | `String` | Values seen: high, low, medium. |
| `sellerPosition` | `String` |  |
| `severity` | `String` | Values seen: blocker, fixable, note. |
| `source` | `String` |  |
| `sourceDate` | `String` |  |
| `sourceLabel` | `String` |  |
| `sources` | `Array` |  |
| `status` | `String` |  |
| `statusAsOf` | `String` |  |
| `summary` | `String` |  |
| `term` | `String` |  |
| `title` | `String` |  |
| `why` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Legal entities, one per record (raises on error).
legals = client.Legal.list
legals.each { |item| puts item.data_get }
```


### Market

Create an instance: `market = client.Market`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acquirer` | `String` |  |
| `addedOn` | `String` |  |
| `amountText` | `String` |  |
| `amountUsd` | `Integer` |  |
| `annualUsd` | `Integer` |  |
| `basis` | `String` | Values seen: reported, stated. |
| `channel` | `String` |  |
| `checkWith` | `String` |  |
| `company` | `String` |  |
| `companyId` | `String` |  |
| `content` | `String` |  |
| `counterparty` | `String` |  |
| `dataType` | `String` |  |
| `date` | `String` |  |
| `event` | `String` | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` | `String` |  |
| `figure` | `String` |  |
| `id` | `String` |  |
| `kind` | `String` | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` | `Array` |  |
| `licensee` | `String` |  |
| `licenseeIds` | `Array` |  |
| `licensor` | `String` |  |
| `licensorId` | `String` |  |
| `licensorType` | `String` |  |
| `metric` | `String` |  |
| `party` | `String` |  |
| `partyId` | `String` |  |
| `period` | `String` |  |
| `periodEnd` | `String` |  |
| `quote` | `String` |  |
| `readOn` | `String` |  |
| `round` | `String` |  |
| `segment` | `String` |  |
| `source` | `String` |  |
| `sourceDate` | `String` |  |
| `sourceLabel` | `String` |  |
| `status` | `String` |  |
| `supersededBy` | `String` |  |
| `termYears` | `Integer` |  |
| `termsText` | `String` |  |
| `unit` | `String` |  |
| `unitPriceText` | `String` |  |
| `url` | `String` |  |
| `use` | `String` | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `String` |  |
| `valuationUsd` | `Integer` |  |
| `valueHighUsd` | `Integer` |  |
| `valueLowUsd` | `Integer` |  |
| `valueText` | `String` |  |
| `valueUsd` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Market entities, one per record (raises on error).
markets = client.Market.list
markets.each { |item| puts item.data_get }
```


### Organisation

Create an instance: `organisation = client.Organisation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aka` | `Array` |  |
| `areas` | `Array` |  |
| `basis` | `String` | Values seen: reported, stated. |
| `buysData` | `Hash` | The vendor's own words and the page they are on. |
| `criteria` | `Hash` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `String` |  |
| `domain` | `String` |  |
| `eligibility` | `String` |  |
| `founded` | `Integer` |  |
| `high` | `Integer` |  |
| `hq` | `String` |  |
| `id` | `String` |  |
| `introducerFee` | `String` |  |
| `introducerTerms` | `Hash` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `String` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `Integer` |  |
| `madeFrom` | `Array` |  |
| `name` | `String` |  |
| `otherDomains` | `Array` |  |
| `paidInDays` | `Integer` |  |
| `paidWhen` | `String` |  |
| `pays` | `String` |  |
| `proof` | `Hash` |  |
| `readOn` | `String` |  |
| `record` | `Hash` |  |
| `says` | `Hash` | The vendor's own words and the page they are on. |
| `scrub` | `String` |  |
| `sells` | `Array` |  |
| `source` | `String` |  |
| `sourceLabel` | `String` |  |
| `takes` | `Array` |  |
| `wants` | `String` |  |
| `website` | `String` |  |
| `what` | `String` |  |
| `whatSource` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Organisation entities, one per record (raises on error).
organisations = client.Organisation.list
organisations.each { |item| puts item.data_get }
```


### Price

Create an instance: `price = client.Price`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedOn` | `String` |  |
| `basis` | `String` | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` | `String` |  |
| `closedOn` | `String` |  |
| `currency` | `String` | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` | `String` |  |
| `feed` | `String` | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` | `String` |  |
| `group` | `String` |  |
| `high` | `Float` |  |
| `id` | `String` |  |
| `ids` | `Array` | Ids of the price observations (listPrices) behind this row. |
| `item` | `String` |  |
| `low` | `Float` |  |
| `max` | `Float` |  |
| `median` | `Float` |  |
| `min` | `Float` |  |
| `n` | `Integer` | Number of observations. |
| `note` | `String` |  |
| `open` | `Integer` | Number of open-ended observations (no upper bound). |
| `orgIds` | `Array` |  |
| `orgNames` | `Array` |  |
| `p25` | `Float` |  |
| `p75` | `Float` |  |
| `perUnitHigh` | `Float` |  |
| `perUnitLow` | `Float` |  |
| `perUnitNote` | `String` |  |
| `price` | `String` |  |
| `quote` | `String` |  |
| `readOn` | `String` |  |
| `segment` | `String` | Always null in the probe; type unverified. |
| `side` | `String` | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` | `String` |  |
| `sourceLabel` | `String` |  |
| `to` | `String` |  |
| `unit` | `String` |  |
| `unitKey` | `String` |  |
| `use` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Price entities, one per record (raises on error).
prices = client.Price.list
prices.each { |item| puts item.data_get }
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── AiTrainingRates_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`AiTrainingRates_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
price = client.Price
price.list()

# price.data_get now returns the price data from the last list
# price.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
