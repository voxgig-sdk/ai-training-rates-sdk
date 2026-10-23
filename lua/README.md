# AiTrainingRates Lua SDK



The Lua SDK for the AiTrainingRates API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Guidance()` — each with the same small set of operations (`list`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/ai-training-rates-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("ai-training-rates_sdk")

local client = sdk.new()
```

### 2. List guidance records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local guidances, err = client:Guidance():list()
if err then error(err) end

for _, item in ipairs(guidances) do
  local rec = item:data_get()
  print(rec["id"])
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local prices, err = client:Price():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Price():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### AiTrainingRatesSDK

```lua
local sdk = require("ai-training-rates_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AiTrainingRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Guidance` | `(data) -> GuidanceEntity` | Create a Guidance entity instance. |
| `Legal` | `(data) -> LegalEntity` | Create a Legal entity instance. |
| `Market` | `(data) -> MarketEntity` | Create a Market entity instance. |
| `Organisation` | `(data) -> OrganisationEntity` | Create an Organisation entity instance. |
| `Price` | `(data) -> PriceEntity` | Create a Price entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local guidance, err = client:Guidance():list()
    if err then error(err) end
    -- guidance is an array of entities, one per record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local guidance = client:Guidance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
| `sources` | `table` |  |
| `strength` | `string` | Values seen: indicative, strong. |

#### Example: List

```lua
local guidances, err = client:Guidance():list()
```


### Legal

Create an instance: `local legal = client:Legal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amountText` | `string` |  |
| `amountUsd` | `number` |  |
| `apiLimit` | `string` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` |  |
| `appliesTo` | `table` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buyersAsk` | `string` |  |
| `byPlan` | `string` |  |
| `caseNumber` | `string` |  |
| `claim` | `string` |  |
| `contentType` | `string` |  |
| `date` | `string` |  |
| `defendantIds` | `table` |  |
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
| `parties` | `table` |  |
| `partyIds` | `table` |  |
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
| `sources` | `table` |  |
| `status` | `string` |  |
| `statusAsOf` | `string` |  |
| `summary` | `string` |  |
| `term` | `string` |  |
| `title` | `string` |  |
| `why` | `string` |  |

#### Example: List

```lua
local legals, err = client:Legal():list()
```


### Market

Create an instance: `local market = client:Market(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acquirer` | `string` |  |
| `addedOn` | `string` |  |
| `amountText` | `string` |  |
| `amountUsd` | `number` |  |
| `annualUsd` | `number` |  |
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
| `leadInvestors` | `table` |  |
| `licensee` | `string` |  |
| `licenseeIds` | `table` |  |
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
| `termYears` | `number` |  |
| `termsText` | `string` |  |
| `unit` | `string` |  |
| `unitPriceText` | `string` |  |
| `url` | `string` |  |
| `use` | `string` | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `string` |  |
| `valuationUsd` | `number` |  |
| `valueHighUsd` | `number` |  |
| `valueLowUsd` | `number` |  |
| `valueText` | `string` |  |
| `valueUsd` | `number` |  |

#### Example: List

```lua
local markets, err = client:Market():list()
```


### Organisation

Create an instance: `local organisation = client:Organisation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aka` | `table` |  |
| `areas` | `table` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buysData` | `table` | The vendor's own words and the page they are on. |
| `criteria` | `table` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` |  |
| `domain` | `string` |  |
| `eligibility` | `string` |  |
| `founded` | `number` |  |
| `high` | `number` |  |
| `hq` | `string` |  |
| `id` | `string` |  |
| `introducerFee` | `string` |  |
| `introducerTerms` | `table` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `number` |  |
| `madeFrom` | `table` |  |
| `name` | `string` |  |
| `otherDomains` | `table` |  |
| `paidInDays` | `number` |  |
| `paidWhen` | `string` |  |
| `pays` | `string` |  |
| `proof` | `table` |  |
| `readOn` | `string` |  |
| `record` | `table` |  |
| `says` | `table` | The vendor's own words and the page they are on. |
| `scrub` | `string` |  |
| `sells` | `table` |  |
| `source` | `string` |  |
| `sourceLabel` | `string` |  |
| `takes` | `table` |  |
| `wants` | `string` |  |
| `website` | `string` |  |
| `what` | `string` |  |
| `whatSource` | `string` |  |

#### Example: List

```lua
local organisations, err = client:Organisation():list()
```


### Price

Create an instance: `local price = client:Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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
| `high` | `number` |  |
| `id` | `string` |  |
| `ids` | `table` | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` |  |
| `low` | `number` |  |
| `max` | `number` |  |
| `median` | `number` |  |
| `min` | `number` |  |
| `n` | `number` | Number of observations. |
| `note` | `string` |  |
| `open` | `number` | Number of open-ended observations (no upper bound). |
| `orgIds` | `table` |  |
| `orgNames` | `table` |  |
| `p25` | `number` |  |
| `p75` | `number` |  |
| `perUnitHigh` | `number` |  |
| `perUnitLow` | `number` |  |
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

```lua
local prices, err = client:Price():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── ai-training-rates_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`ai-training-rates_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local price = client:Price()
price:list()

-- price:data_get() now returns the price data from the last list
-- price:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
