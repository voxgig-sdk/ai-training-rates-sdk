# AiTrainingRates TypeScript SDK



The TypeScript SDK for the AiTrainingRates API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Guidance()` — each with a small set of operations (`list`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/ai-training-rates-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/ai-training-rates-sdk
npm install ./ai-training-rates-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { AiTrainingRatesSDK } from '@voxgig-sdk/ai-training-rates-sdk'

const client = new AiTrainingRatesSDK()
```

### 2. List guidance records

`list()` resolves to an array of Guidance ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const guidances = await client.Guidance().list()

for (const guidance of guidances) {
  console.log(guidance.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const prices = await client.Price().list()
  console.log(prices.map((item) => item.data()))
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = AiTrainingRatesSDK.test()

const prices = await client.Price().list()
// prices is an array of Price entities, one per mock record
console.log(prices.map((price) => price.data()))
```

You can also use the instance method:

```ts
const client = new AiTrainingRatesSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Price()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new AiTrainingRatesSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
AI_TRAINING_RATES_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### AiTrainingRatesSDK

#### Constructor

```ts
new AiTrainingRatesSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Guidance(data?)` | `GuidanceEntity` | Create a Guidance entity instance. |
| `Legal(data?)` | `LegalEntity` | Create a Legal entity instance. |
| `Market(data?)` | `MarketEntity` | Create a Market entity instance. |
| `Organisation(data?)` | `OrganisationEntity` | Create an Organisation entity instance. |
| `Price(data?)` | `PriceEntity` | Create a Price entity instance. |
| `tester(testopts?, sdkopts?)` | `AiTrainingRatesSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `AiTrainingRatesSDK.test(testopts?, sdkopts?)` | `AiTrainingRatesSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): AiTrainingRatesSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

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

Operations: list.

API path: `/datasets/market-rates.json`



## Entities


### Guidance

Create an instance: `const guidance = client.Guidance()`

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
| `sources` | `any[]` |  |
| `strength` | `string` | Values seen: indicative, strong. |

#### Example: List

```ts
const guidances = await client.Guidance().list()
```


### Legal

Create an instance: `const legal = client.Legal()`

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
| `appliesTo` | `any[]` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buyersAsk` | `string` |  |
| `byPlan` | `string` |  |
| `caseNumber` | `string` |  |
| `claim` | `string` |  |
| `contentType` | `string` |  |
| `date` | `string` |  |
| `defendantIds` | `any[]` |  |
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
| `parties` | `any[]` |  |
| `partyIds` | `any[]` |  |
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
| `sources` | `any[]` |  |
| `status` | `string` |  |
| `statusAsOf` | `string` |  |
| `summary` | `string` |  |
| `term` | `string` |  |
| `title` | `string` |  |
| `why` | `string` |  |

#### Example: List

```ts
const legals = await client.Legal().list()
```


### Market

Create an instance: `const market = client.Market()`

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
| `leadInvestors` | `any[]` |  |
| `licensee` | `string` |  |
| `licenseeIds` | `any[]` |  |
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

```ts
const markets = await client.Market().list()
```


### Organisation

Create an instance: `const organisation = client.Organisation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aka` | `any[]` |  |
| `areas` | `any[]` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buysData` | `Record<string, any>` | The vendor's own words and the page they are on. |
| `criteria` | `Record<string, any>` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` |  |
| `domain` | `string` |  |
| `eligibility` | `string` |  |
| `founded` | `number` |  |
| `high` | `number` |  |
| `hq` | `string` |  |
| `id` | `string` |  |
| `introducerFee` | `string` |  |
| `introducerTerms` | `Record<string, any>` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `number` |  |
| `madeFrom` | `any[]` |  |
| `name` | `string` |  |
| `otherDomains` | `any[]` |  |
| `paidInDays` | `number` |  |
| `paidWhen` | `string` |  |
| `pays` | `string` |  |
| `proof` | `Record<string, any>` |  |
| `readOn` | `string` |  |
| `record` | `Record<string, any>` |  |
| `says` | `Record<string, any>` | The vendor's own words and the page they are on. |
| `scrub` | `string` |  |
| `sells` | `any[]` |  |
| `source` | `string` |  |
| `sourceLabel` | `string` |  |
| `takes` | `any[]` |  |
| `wants` | `string` |  |
| `website` | `string` |  |
| `what` | `string` |  |
| `whatSource` | `string` |  |

#### Example: List

```ts
const organisations = await client.Organisation().list()
```


### Price

Create an instance: `const price = client.Price()`

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
| `ids` | `any[]` | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` |  |
| `low` | `number` |  |
| `max` | `number` |  |
| `median` | `number` |  |
| `min` | `number` |  |
| `n` | `number` | Number of observations. |
| `note` | `string` |  |
| `open` | `number` | Number of open-ended observations (no upper bound). |
| `orgIds` | `any[]` |  |
| `orgNames` | `any[]` |  |
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

```ts
const prices = await client.Price().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
ai-training-rates/
├── src/
│   ├── AiTrainingRatesSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { AiTrainingRatesSDK } from '@voxgig-sdk/ai-training-rates-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const price = client.Price()
await price.list()

// price.data() now returns the price data from the last `list`
// price.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
