# AiTrainingRates TypeScript SDK Reference

Complete API reference for the AiTrainingRates TypeScript SDK.


## AiTrainingRatesSDK

### Constructor

```ts
new AiTrainingRatesSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiTrainingRatesSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = AiTrainingRatesSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `AiTrainingRatesSDK` instance in test mode.


### Instance Methods

#### `Guidance(data?: object)`

Create a new `Guidance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GuidanceEntity` instance.

#### `Legal(data?: object)`

Create a new `Legal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LegalEntity` instance.

#### `Market(data?: object)`

Create a new `Market` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MarketEntity` instance.

#### `Organisation(data?: object)`

Create a new `Organisation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganisationEntity` instance.

#### `Price(data?: object)`

Create a new `Price` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PriceEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `AiTrainingRatesSDK.test()`.

**Returns:** `AiTrainingRatesSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## GuidanceEntity

```ts
const guidance = client.Guidance()
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
| `sources` | `any[]` | Yes |  |
| `strength` | `string` | Yes | Values seen: indicative, strong. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Guidance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GuidanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiTrainingRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LegalEntity

```ts
const legal = client.Legal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amountText` | `string` | Yes |  |
| `amountUsd` | `number` | Yes |  |
| `apiLimit` | `string` | Yes | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` | Yes |  |
| `appliesTo` | `any[]` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buyersAsk` | `string` | Yes |  |
| `byPlan` | `string` | Yes |  |
| `caseNumber` | `string` | Yes |  |
| `claim` | `string` | Yes |  |
| `contentType` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `defendantIds` | `any[]` | Yes |  |
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
| `parties` | `any[]` | Yes |  |
| `partyIds` | `any[]` | Yes |  |
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
| `sources` | `any[]` | Yes |  |
| `status` | `string` | Yes |  |
| `statusAsOf` | `string` | Yes |  |
| `summary` | `string` | Yes |  |
| `term` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `why` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Legal().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LegalEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiTrainingRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MarketEntity

```ts
const market = client.Market()
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
| `leadInvestors` | `any[]` | Yes |  |
| `licensee` | `string` | Yes |  |
| `licenseeIds` | `any[]` | Yes |  |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Market().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MarketEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiTrainingRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganisationEntity

```ts
const organisation = client.Organisation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aka` | `any[]` | No |  |
| `areas` | `any[]` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buysData` | `Record<string, any>` | Yes | The vendor's own words and the page they are on. |
| `criteria` | `Record<string, any>` | Yes | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `eligibility` | `string` | Yes |  |
| `founded` | `number` | Yes |  |
| `high` | `number` | Yes |  |
| `hq` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `introducerFee` | `string` | Yes |  |
| `introducerTerms` | `Record<string, any>` | No | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Yes | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `number` | Yes |  |
| `madeFrom` | `any[]` | Yes |  |
| `name` | `string` | Yes |  |
| `otherDomains` | `any[]` | No |  |
| `paidInDays` | `number` | No |  |
| `paidWhen` | `string` | Yes |  |
| `pays` | `string` | Yes |  |
| `proof` | `Record<string, any>` | Yes |  |
| `readOn` | `string` | Yes |  |
| `record` | `Record<string, any>` | Yes |  |
| `says` | `Record<string, any>` | Yes | The vendor's own words and the page they are on. |
| `scrub` | `string` | Yes |  |
| `sells` | `any[]` | Yes |  |
| `source` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `takes` | `any[]` | Yes |  |
| `wants` | `string` | Yes |  |
| `website` | `string` | Yes |  |
| `what` | `string` | Yes |  |
| `whatSource` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Organisation().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganisationEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiTrainingRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PriceEntity

```ts
const price = client.Price()
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
| `ids` | `any[]` | Yes | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` | Yes |  |
| `low` | `number` | Yes |  |
| `max` | `number` | Yes |  |
| `median` | `number` | Yes |  |
| `min` | `number` | Yes |  |
| `n` | `number` | Yes | Number of observations. |
| `note` | `string` | Yes |  |
| `open` | `number` | Yes | Number of open-ended observations (no upper bound). |
| `orgIds` | `any[]` | No |  |
| `orgNames` | `any[]` | No |  |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Price().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PriceEntity` instance with the same client and
options.

#### `client()`

Return the parent `AiTrainingRatesSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new AiTrainingRatesSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

