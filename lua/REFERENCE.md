# AiTrainingRates Lua SDK Reference

Complete API reference for the AiTrainingRates Lua SDK.


## AiTrainingRatesSDK

### Constructor

```lua
local sdk = require("ai-training-rates_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Guidance(data)`

Create a new `Guidance` entity instance. Pass `nil` for no initial data.

#### `Legal(data)`

Create a new `Legal` entity instance. Pass `nil` for no initial data.

#### `Market(data)`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Organisation(data)`

Create a new `Organisation` entity instance. Pass `nil` for no initial data.

#### `Price(data)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## GuidanceEntity

```lua
local guidance = client:Guidance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedOn` | `string` | Yes |  |
| `finding` | `string` | Yes |  |
| `howToUse` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `lever` | `string` | Yes |  |
| `readOn` | `string` | Yes |  |
| `side` | `string` | Yes | Values seen: both, buyer, seller. |
| `sources` | `table` | Yes |  |
| `strength` | `string` | Yes | Values seen: indicative, strong. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Guidance():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GuidanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LegalEntity

```lua
local legal = client:Legal(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amountText` | `string` | Yes |  |
| `amountUsd` | `number` | Yes |  |
| `apiLimit` | `string` | Yes | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` | Yes |  |
| `appliesTo` | `table` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buyersAsk` | `string` | Yes |  |
| `byPlan` | `string` | Yes |  |
| `caseNumber` | `string` | Yes |  |
| `claim` | `string` | Yes |  |
| `contentType` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `defendantIds` | `table` | Yes |  |
| `evidence` | `string` | Yes |  |
| `exportAllowed` | `string` | Yes | Values seen: limited, unclear, yes. |
| `exportRule` | `string` | Yes |  |
| `gap` | `string` | Yes |  |
| `good` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `inference` | `string` | Yes |  |
| `jurisdiction` | `string` | Yes |  |
| `kind` | `string` | Yes | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` | `string` | Yes |  |
| `notes` | `string` | Yes |  |
| `outcome` | `string` | Yes |  |
| `parties` | `table` | Yes |  |
| `partyIds` | `table` | Yes |  |
| `perWorkText` | `string` | Yes |  |
| `question` | `string` | Yes |  |
| `quote` | `string` | Yes |  |
| `redFlag` | `string` | Yes |  |
| `risk` | `string` | Yes | Values seen: high, low, medium. |
| `sellerPosition` | `string` | Yes |  |
| `severity` | `string` | Yes | Values seen: blocker, fixable, note. |
| `source` | `string` | Yes |  |
| `sourceDate` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `sources` | `table` | Yes |  |
| `status` | `string` | Yes |  |
| `statusAsOf` | `string` | Yes |  |
| `summary` | `string` | Yes |  |
| `term` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `why` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Legal():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegalEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MarketEntity

```lua
local market = client:Market(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acquirer` | `string` | Yes |  |
| `addedOn` | `string` | Yes |  |
| `amountText` | `string` | Yes |  |
| `amountUsd` | `number` | Yes |  |
| `annualUsd` | `number` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `channel` | `string` | Yes |  |
| `checkWith` | `string` | No |  |
| `company` | `string` | Yes |  |
| `companyId` | `string` | Yes |  |
| `content` | `string` | Yes |  |
| `counterparty` | `string` | Yes |  |
| `dataType` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `event` | `string` | Yes | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` | `string` | Yes |  |
| `figure` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `kind` | `string` | Yes | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` | `table` | Yes |  |
| `licensee` | `string` | Yes |  |
| `licenseeIds` | `table` | Yes |  |
| `licensor` | `string` | Yes |  |
| `licensorId` | `string` | Yes |  |
| `licensorType` | `string` | Yes |  |
| `metric` | `string` | Yes |  |
| `party` | `string` | Yes |  |
| `partyId` | `string` | Yes |  |
| `period` | `string` | Yes |  |
| `periodEnd` | `string` | Yes |  |
| `quote` | `string` | Yes |  |
| `readOn` | `string` | Yes |  |
| `round` | `string` | Yes |  |
| `segment` | `string` | Yes |  |
| `source` | `string` | Yes |  |
| `sourceDate` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `status` | `string` | Yes |  |
| `supersededBy` | `string` | No |  |
| `termYears` | `number` | Yes |  |
| `termsText` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unitPriceText` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `use` | `string` | Yes | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `string` | Yes |  |
| `valuationUsd` | `number` | Yes |  |
| `valueHighUsd` | `number` | Yes |  |
| `valueLowUsd` | `number` | Yes |  |
| `valueText` | `string` | Yes |  |
| `valueUsd` | `number` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Market():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OrganisationEntity

```lua
local organisation = client:Organisation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aka` | `table` | No |  |
| `areas` | `table` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buysData` | `table` | Yes | The vendor's own words and the page they are on. |
| `criteria` | `table` | Yes | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `eligibility` | `string` | Yes |  |
| `founded` | `number` | Yes |  |
| `high` | `number` | Yes |  |
| `hq` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `introducerFee` | `string` | Yes |  |
| `introducerTerms` | `table` | No | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Yes | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `number` | Yes |  |
| `madeFrom` | `table` | Yes |  |
| `name` | `string` | Yes |  |
| `otherDomains` | `table` | No |  |
| `paidInDays` | `number` | No |  |
| `paidWhen` | `string` | Yes |  |
| `pays` | `string` | Yes |  |
| `proof` | `table` | Yes |  |
| `readOn` | `string` | Yes |  |
| `record` | `table` | Yes |  |
| `says` | `table` | Yes | The vendor's own words and the page they are on. |
| `scrub` | `string` | Yes |  |
| `sells` | `table` | Yes |  |
| `source` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `takes` | `table` | Yes |  |
| `wants` | `string` | Yes |  |
| `website` | `string` | Yes |  |
| `what` | `string` | Yes |  |
| `whatSource` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Organisation():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganisationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PriceEntity

```lua
local price = client:Price(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedOn` | `string` | Yes |  |
| `basis` | `string` | Yes | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` | `string` | No |  |
| `closedOn` | `string` | No |  |
| `currency` | `string` | No | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` | `string` | Yes |  |
| `feed` | `string` | No | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` | `string` | Yes |  |
| `group` | `string` | Yes |  |
| `high` | `number` | Yes |  |
| `id` | `string` | Yes |  |
| `ids` | `table` | Yes | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` | Yes |  |
| `low` | `number` | Yes |  |
| `max` | `number` | Yes |  |
| `median` | `number` | Yes |  |
| `min` | `number` | Yes |  |
| `n` | `number` | Yes | Number of observations. |
| `note` | `string` | Yes |  |
| `open` | `number` | Yes | Number of open-ended observations (no upper bound). |
| `orgIds` | `table` | No |  |
| `orgNames` | `table` | No |  |
| `p25` | `number` | Yes |  |
| `p75` | `number` | Yes |  |
| `perUnitHigh` | `number` | Yes |  |
| `perUnitLow` | `number` | Yes |  |
| `perUnitNote` | `string` | No |  |
| `price` | `string` | Yes |  |
| `quote` | `string` | No |  |
| `readOn` | `string` | Yes |  |
| `segment` | `string` | Yes | Always null in the probe; type unverified. |
| `side` | `string` | Yes | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `to` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unitKey` | `string` | Yes |  |
| `use` | `string` | Yes |  |

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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Price():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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

