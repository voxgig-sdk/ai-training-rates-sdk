# AiTrainingRates PHP SDK Reference

Complete API reference for the AiTrainingRates PHP SDK.


## AiTrainingRatesSDK

### Constructor

```php
require_once __DIR__ . '/aitrainingrates_sdk.php';

$client = new AiTrainingRatesSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiTrainingRatesSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AiTrainingRatesSDK::test();
```


### Instance Methods

#### `Guidance($data = null)`

Create a new `GuidanceEntity` instance. Pass `null` for no initial data.

#### `Legal($data = null)`

Create a new `LegalEntity` instance. Pass `null` for no initial data.

#### `Market($data = null)`

Create a new `MarketEntity` instance. Pass `null` for no initial data.

#### `Organisation($data = null)`

Create a new `OrganisationEntity` instance. Pass `null` for no initial data.

#### `Price($data = null)`

Create a new `PriceEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AiTrainingRatesUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## GuidanceEntity

```php
$guidance = $client->Guidance();
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
| `sources` | `array` | Yes |  |
| `strength` | `string` | Yes | Values seen: indicative, strong. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Guidance()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GuidanceEntity`

Create a new `GuidanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LegalEntity

```php
$legal = $client->Legal();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amountText` | `string` | Yes |  |
| `amountUsd` | `int` | Yes |  |
| `apiLimit` | `string` | Yes | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` | Yes |  |
| `appliesTo` | `array` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buyersAsk` | `string` | Yes |  |
| `byPlan` | `string` | Yes |  |
| `caseNumber` | `string` | Yes |  |
| `claim` | `string` | Yes |  |
| `contentType` | `string` | Yes |  |
| `date` | `string` | Yes |  |
| `defendantIds` | `array` | Yes |  |
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
| `parties` | `array` | Yes |  |
| `partyIds` | `array` | Yes |  |
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
| `sources` | `array` | Yes |  |
| `status` | `string` | Yes |  |
| `statusAsOf` | `string` | Yes |  |
| `summary` | `string` | Yes |  |
| `term` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `why` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Legal()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LegalEntity`

Create a new `LegalEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MarketEntity

```php
$market = $client->Market();
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
| `leadInvestors` | `array` | Yes |  |
| `licensee` | `string` | Yes |  |
| `licenseeIds` | `array` | Yes |  |
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Market()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MarketEntity`

Create a new `MarketEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OrganisationEntity

```php
$organisation = $client->Organisation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aka` | `array` | No |  |
| `areas` | `array` | Yes |  |
| `basis` | `string` | Yes | Values seen: reported, stated. |
| `buysData` | `array` | Yes | The vendor's own words and the page they are on. |
| `criteria` | `array` | Yes | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `eligibility` | `string` | Yes |  |
| `founded` | `int` | Yes |  |
| `high` | `int` | Yes |  |
| `hq` | `string` | Yes |  |
| `id` | `string` | Yes |  |
| `introducerFee` | `string` | Yes |  |
| `introducerTerms` | `array` | No | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Yes | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `int` | Yes |  |
| `madeFrom` | `array` | Yes |  |
| `name` | `string` | Yes |  |
| `otherDomains` | `array` | No |  |
| `paidInDays` | `int` | No |  |
| `paidWhen` | `string` | Yes |  |
| `pays` | `string` | Yes |  |
| `proof` | `array` | Yes |  |
| `readOn` | `string` | Yes |  |
| `record` | `array` | Yes |  |
| `says` | `array` | Yes | The vendor's own words and the page they are on. |
| `scrub` | `string` | Yes |  |
| `sells` | `array` | Yes |  |
| `source` | `string` | Yes |  |
| `sourceLabel` | `string` | Yes |  |
| `takes` | `array` | Yes |  |
| `wants` | `string` | Yes |  |
| `website` | `string` | Yes |  |
| `what` | `string` | Yes |  |
| `whatSource` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Organisation()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OrganisationEntity`

Create a new `OrganisationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PriceEntity

```php
$price = $client->Price();
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
| `high` | `float` | Yes |  |
| `id` | `string` | Yes |  |
| `ids` | `array` | Yes | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` | Yes |  |
| `low` | `float` | Yes |  |
| `max` | `float` | Yes |  |
| `median` | `float` | Yes |  |
| `min` | `float` | Yes |  |
| `n` | `int` | Yes | Number of observations. |
| `note` | `string` | Yes |  |
| `open` | `int` | Yes | Number of open-ended observations (no upper bound). |
| `orgIds` | `array` | No |  |
| `orgNames` | `array` | No |  |
| `p25` | `float` | Yes |  |
| `p75` | `float` | Yes |  |
| `perUnitHigh` | `float` | Yes |  |
| `perUnitLow` | `float` | Yes |  |
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Price()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PriceEntity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new AiTrainingRatesSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

