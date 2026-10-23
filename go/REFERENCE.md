# AiTrainingRates Golang SDK Reference

Complete API reference for the AiTrainingRates Golang SDK.


## AiTrainingRatesSDK

### Constructor

```go
func NewAiTrainingRatesSDK(options map[string]any) *AiTrainingRatesSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *AiTrainingRatesSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *AiTrainingRatesSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Guidance(data map[string]any) AiTrainingRatesEntity`

Create a new `Guidance` entity instance. Pass `nil` for no initial data.

#### `Legal(data map[string]any) AiTrainingRatesEntity`

Create a new `Legal` entity instance. Pass `nil` for no initial data.

#### `Market(data map[string]any) AiTrainingRatesEntity`

Create a new `Market` entity instance. Pass `nil` for no initial data.

#### `Organisation(data map[string]any) AiTrainingRatesEntity`

Create a new `Organisation` entity instance. Pass `nil` for no initial data.

#### `Price(data map[string]any) AiTrainingRatesEntity`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## GuidanceEntity

```go
guidance := client.Guidance(nil)
fmt.Println(guidance.GetName()) // "guidance"
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
| `sources` | `[]any` | Yes |  |
| `strength` | `string` | Yes | Values seen: indicative, strong. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Guidance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GuidanceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## LegalEntity

```go
legal := client.Legal(nil)
fmt.Println(legal.GetName()) // "legal"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amountText` | `string` | Yes |  |
| `amountUsd` | `int` | Yes |  |
| `apiLimit` | `string` | Yes | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` | Yes |  |
| `appliesTo` | `[]any` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buyersAsk` | `string` | Yes |  |
| `byPlan` | `string` | Yes |  |
| `caseNumber` | `string` | Yes |  |
| `claim` | `string` | Yes |  |
| `contentType` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `defendantIds` | `[]any` | Yes |  |
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
| `parties` | `[]any` | Yes |  |
| `partyIds` | `[]any` | Yes |  |
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
| `sources` | `[]any` | Yes |  |
| `status` | `string` | Yes |  |
| `statusAsOf` | `string` | Yes |  |
| `summary` | `string` | Yes |  |
| `term` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `why` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Legal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LegalEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## MarketEntity

```go
market := client.Market(nil)
fmt.Println(market.GetName()) // "market"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acquirer` | `string` | Yes |  |
| `addedOn` | `string` | Yes |  |
| `amountText` | `string` | Yes |  |
| `amountUsd` | `int` | Yes |  |
| `annualUsd` | `int` | Yes |  |
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
| `leadInvestors` | `[]any` | Yes |  |
| `licensee` | `string` | Yes |  |
| `licenseeIds` | `[]any` | Yes |  |
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
| `termYears` | `int` | Yes |  |
| `termsText` | `string` | Yes |  |
| `unit` | `string` | Yes |  |
| `unitPriceText` | `string` | Yes |  |
| `url` | `string` | Yes |  |
| `use` | `string` | Yes | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `string` | Yes |  |
| `valuationUsd` | `int` | Yes |  |
| `valueHighUsd` | `int` | Yes |  |
| `valueLowUsd` | `int` | Yes |  |
| `valueText` | `string` | Yes |  |
| `valueUsd` | `int` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Market(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MarketEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## OrganisationEntity

```go
organisation := client.Organisation(nil)
fmt.Println(organisation.GetName()) // "organisation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aka` | `[]any` | No |  |
| `areas` | `[]any` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buysData` | `map[string]any` | Yes | The vendor's own words and the page they are on. |
| `criteria` | `map[string]any` | Yes | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `eligibility` | `string` | Yes |  |
| `founded` | `int` | Yes |  |
| `high` | `int` | Yes |  |
| `hq` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `introducerFee` | `string` | Yes |  |
| `introducerTerms` | `map[string]any` | No | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Yes | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `int` | Yes |  |
| `madeFrom` | `[]any` | Yes |  |
| `name` | `string` | Yes |  |
| `otherDomains` | `[]any` | No |  |
| `paidInDays` | `int` | No |  |
| `paidWhen` | `string` | Yes |  |
| `pays` | `string` | Yes |  |
| `proof` | `map[string]any` | Yes |  |
| `readOn` | `string` | Yes |  |
| `record` | `map[string]any` | Yes |  |
| `says` | `map[string]any` | Yes | The vendor's own words and the page they are on. |
| `scrub` | `string` | Yes |  |
| `sells` | `[]any` | Yes |  |
| `source` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `takes` | `[]any` | Yes |  |
| `wants` | `string` | Yes |  |
| `website` | `string` | Yes |  |
| `what` | `string` | Yes |  |
| `whatSource` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Organisation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OrganisationEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

Return the entity name.


---

## PriceEntity

```go
price := client.Price(nil)
fmt.Println(price.GetName()) // "price"
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
| `high` | `float64` | Yes |  |
| `id` | `string` | Yes |  |
| `ids` | `[]any` | Yes | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` | Yes |  |
| `low` | `float64` | Yes |  |
| `max` | `float64` | Yes |  |
| `median` | `float64` | Yes |  |
| `min` | `float64` | Yes |  |
| `n` | `int` | Yes | Number of observations. |
| `note` | `string` | Yes |  |
| `open` | `int` | Yes | Number of open-ended observations (no upper bound). |
| `orgIds` | `[]any` | No |  |
| `orgNames` | `[]any` | No |  |
| `p25` | `float64` | Yes |  |
| `p75` | `float64` | Yes |  |
| `perUnitHigh` | `float64` | Yes |  |
| `perUnitLow` | `float64` | Yes |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns a `[]any` of entities, one per record; `err` is non-nil on failure.

```go
results, err := client.Price(nil).List(nil, nil)
if err != nil {
    panic(err)
}
for _, item := range results.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `Stream(action string, args map[string]any, callopts map[string]any) <-chan StreamItem`

Run an operation through the pipeline and send its result items on the
returned channel, which closes when the stream ends. A `StreamItem` holds
one item in `Item`, or in `Err` the error that ended the stream: the
error the operation itself would return, sent as the last value. Under
`throw: false` in `callopts["ctrl"]`, no error is sent.

#### `GetName() string`

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

```go
client := sdk.NewAiTrainingRatesSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

