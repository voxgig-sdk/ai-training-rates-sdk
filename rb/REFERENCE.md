# AiTrainingRates Ruby SDK Reference

Complete API reference for the AiTrainingRates Ruby SDK.


## AiTrainingRatesSDK

### Constructor

```ruby
require_relative 'AiTrainingRates_sdk'

client = AiTrainingRatesSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiTrainingRatesSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AiTrainingRatesSDK.test
```


### Instance Methods

#### `Guidance(data = nil)`

Create a new `Guidance` entity instance. Pass `nil` for no initial data.

#### `Legal(data = nil)`

Create a new `Legal` entity instance. Pass `nil` for no initial data.

#### `Market(data = nil)`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Organisation(data = nil)`

Create a new `Organisation` entity instance. Pass `nil` for no initial data.

#### `Price(data = nil)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## GuidanceEntity

```ruby
guidance = client.Guidance
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedOn` | `String` | Yes |  |
| `finding` | `String` | Yes |  |
| `howToUse` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `lever` | `String` | Yes |  |
| `readOn` | `String` | Yes |  |
| `side` | `String` | Yes | Values seen: both, buyer, seller. |
| `sources` | `Array` | Yes |  |
| `strength` | `String` | Yes | Values seen: indicative, strong. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Guidance.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GuidanceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LegalEntity

```ruby
legal = client.Legal
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amountText` | `String` | Yes |  |
| `amountUsd` | `Integer` | Yes |  |
| `apiLimit` | `String` | Yes | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `String` | Yes |  |
| `appliesTo` | `Array` | Yes |  |
| `basis` | `String` | Yes | Values seen: reported, stated. |
| `buyersAsk` | `String` | Yes |  |
| `byPlan` | `String` | Yes |  |
| `caseNumber` | `String` | Yes |  |
| `claim` | `String` | Yes |  |
| `contentType` | `String` | Yes |  |
| `date` | `String` | Yes |  |
| `defendantIds` | `Array` | Yes |  |
| `evidence` | `String` | Yes |  |
| `exportAllowed` | `String` | Yes | Values seen: limited, unclear, yes. |
| `exportRule` | `String` | Yes |  |
| `gap` | `String` | Yes |  |
| `good` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `inference` | `String` | Yes |  |
| `jurisdiction` | `String` | Yes |  |
| `kind` | `String` | Yes | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` | `String` | Yes |  |
| `notes` | `String` | Yes |  |
| `outcome` | `String` | Yes |  |
| `parties` | `Array` | Yes |  |
| `partyIds` | `Array` | Yes |  |
| `perWorkText` | `String` | Yes |  |
| `question` | `String` | Yes |  |
| `quote` | `String` | Yes |  |
| `redFlag` | `String` | Yes |  |
| `risk` | `String` | Yes | Values seen: high, low, medium. |
| `sellerPosition` | `String` | Yes |  |
| `severity` | `String` | Yes | Values seen: blocker, fixable, note. |
| `source` | `String` | Yes |  |
| `sourceDate` | `String` | Yes |  |
| `sourceLabel` | `String` | Yes |  |
| `sources` | `Array` | Yes |  |
| `status` | `String` | Yes |  |
| `statusAsOf` | `String` | Yes |  |
| `summary` | `String` | Yes |  |
| `term` | `String` | Yes |  |
| `title` | `String` | Yes |  |
| `why` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Legal.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LegalEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MarketEntity

```ruby
market = client.Market
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acquirer` | `String` | Yes |  |
| `addedOn` | `String` | Yes |  |
| `amountText` | `String` | Yes |  |
| `amountUsd` | `Integer` | Yes |  |
| `annualUsd` | `Integer` | Yes |  |
| `basis` | `String` | Yes | Values seen: reported, stated. |
| `channel` | `String` | Yes |  |
| `checkWith` | `String` | No |  |
| `company` | `String` | Yes |  |
| `companyId` | `String` | Yes |  |
| `content` | `String` | Yes |  |
| `counterparty` | `String` | Yes |  |
| `dataType` | `String` | Yes |  |
| `date` | `String` | Yes |  |
| `event` | `String` | Yes | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` | `String` | Yes |  |
| `figure` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `kind` | `String` | Yes | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` | `Array` | Yes |  |
| `licensee` | `String` | Yes |  |
| `licenseeIds` | `Array` | Yes |  |
| `licensor` | `String` | Yes |  |
| `licensorId` | `String` | Yes |  |
| `licensorType` | `String` | Yes |  |
| `metric` | `String` | Yes |  |
| `party` | `String` | Yes |  |
| `partyId` | `String` | Yes |  |
| `period` | `String` | Yes |  |
| `periodEnd` | `String` | Yes |  |
| `quote` | `String` | Yes |  |
| `readOn` | `String` | Yes |  |
| `round` | `String` | Yes |  |
| `segment` | `String` | Yes |  |
| `source` | `String` | Yes |  |
| `sourceDate` | `String` | Yes |  |
| `sourceLabel` | `String` | Yes |  |
| `status` | `String` | Yes |  |
| `supersededBy` | `String` | No |  |
| `termYears` | `Integer` | Yes |  |
| `termsText` | `String` | Yes |  |
| `unit` | `String` | Yes |  |
| `unitPriceText` | `String` | Yes |  |
| `url` | `String` | Yes |  |
| `use` | `String` | Yes | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `String` | Yes |  |
| `valuationUsd` | `Integer` | Yes |  |
| `valueHighUsd` | `Integer` | Yes |  |
| `valueLowUsd` | `Integer` | Yes |  |
| `valueText` | `String` | Yes |  |
| `valueUsd` | `Integer` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Market.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrganisationEntity

```ruby
organisation = client.Organisation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aka` | `Array` | No |  |
| `areas` | `Array` | Yes |  |
| `basis` | `String` | Yes | Values seen: reported, stated. |
| `buysData` | `Hash` | Yes | The vendor's own words and the page they are on. |
| `criteria` | `Hash` | Yes | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `String` | No |  |
| `domain` | `String` | Yes |  |
| `eligibility` | `String` | Yes |  |
| `founded` | `Integer` | Yes |  |
| `high` | `Integer` | Yes |  |
| `hq` | `String` | Yes |  |
| `id` | `String` | Yes |  |
| `introducerFee` | `String` | Yes |  |
| `introducerTerms` | `Hash` | No | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `String` | Yes | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `Integer` | Yes |  |
| `madeFrom` | `Array` | Yes |  |
| `name` | `String` | Yes |  |
| `otherDomains` | `Array` | No |  |
| `paidInDays` | `Integer` | No |  |
| `paidWhen` | `String` | Yes |  |
| `pays` | `String` | Yes |  |
| `proof` | `Hash` | Yes |  |
| `readOn` | `String` | Yes |  |
| `record` | `Hash` | Yes |  |
| `says` | `Hash` | Yes | The vendor's own words and the page they are on. |
| `scrub` | `String` | Yes |  |
| `sells` | `Array` | Yes |  |
| `source` | `String` | Yes |  |
| `sourceLabel` | `String` | Yes |  |
| `takes` | `Array` | Yes |  |
| `wants` | `String` | Yes |  |
| `website` | `String` | Yes |  |
| `what` | `String` | Yes |  |
| `whatSource` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Organisation.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrganisationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PriceEntity

```ruby
price = client.Price
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedOn` | `String` | Yes |  |
| `basis` | `String` | Yes | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` | `String` | No |  |
| `closedOn` | `String` | No |  |
| `currency` | `String` | No | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` | `String` | Yes |  |
| `feed` | `String` | No | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` | `String` | Yes |  |
| `group` | `String` | Yes |  |
| `high` | `Float` | Yes |  |
| `id` | `String` | Yes |  |
| `ids` | `Array` | Yes | Ids of the price observations (listPrices) behind this row. |
| `item` | `String` | Yes |  |
| `low` | `Float` | Yes |  |
| `max` | `Float` | Yes |  |
| `median` | `Float` | Yes |  |
| `min` | `Float` | Yes |  |
| `n` | `Integer` | Yes | Number of observations. |
| `note` | `String` | Yes |  |
| `open` | `Integer` | Yes | Number of open-ended observations (no upper bound). |
| `orgIds` | `Array` | No |  |
| `orgNames` | `Array` | No |  |
| `p25` | `Float` | Yes |  |
| `p75` | `Float` | Yes |  |
| `perUnitHigh` | `Float` | Yes |  |
| `perUnitLow` | `Float` | Yes |  |
| `perUnitNote` | `String` | No |  |
| `price` | `String` | Yes |  |
| `quote` | `String` | No |  |
| `readOn` | `String` | Yes |  |
| `segment` | `String` | Yes | Always null in the probe; type unverified. |
| `side` | `String` | Yes | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` | `String` | Yes |  |
| `sourceLabel` | `String` | Yes |  |
| `to` | `String` | Yes |  |
| `unit` | `String` | Yes |  |
| `unitKey` | `String` | Yes |  |
| `use` | `String` | Yes |  |

### Field Usage by Operation

| Field | list |
| --- | --- |
| `addedOn` | - |
| `basis` | - |
| `checkWith` | - |
| `closedOn` | - |
| `currency` | - |
| `date` | - |
| `feed` | - |
| `from` | - |
| `group` | - |
| `high` | - |
| `id` | - |
| `ids` | - |
| `item` | - |
| `low` | - |
| `max` | - |
| `median` | - |
| `min` | - |
| `n` | - |
| `note` | - |
| `open` | - |
| `orgIds` | - |
| `orgNames` | - |
| `p25` | - |
| `p75` | - |
| `perUnitHigh` | - |
| `perUnitLow` | - |
| `perUnitNote` | - |
| `price` | - |
| `quote` | - |
| `readOn` | - |
| `segment` | Yes |
| `side` | - |
| `source` | - |
| `sourceLabel` | - |
| `to` | - |
| `unit` | - |
| `unitKey` | - |
| `use` | Yes |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Price.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ruby
client = AiTrainingRatesSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

