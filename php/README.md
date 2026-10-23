# AiTrainingRates PHP SDK



The PHP SDK for the AiTrainingRates API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Guidance()` — with named operations (`list`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/ai-training-rates-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/ai-training-rates-sdk
composer config repositories.ai-training-rates-sdk path ./ai-training-rates-sdk/php
composer require voxgig-sdk/ai-training-rates-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'aitrainingrates_sdk.php';

$client = new AiTrainingRatesSDK();
```

### 2. List guidance records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $guidances = $client->Guidance()->list();
    foreach ($guidances as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["addedOn"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $prices = $client->Price()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = AiTrainingRatesSDK::test();

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$price = $client->Price()->list();
print_r(array_map(fn($item) => $item->data_get(), $price));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new AiTrainingRatesSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
AI_TRAINING_RATES_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### AiTrainingRatesSDK

```php
require_once 'aitrainingrates_sdk.php';
$client = new AiTrainingRatesSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = AiTrainingRatesSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### AiTrainingRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Guidance` | `($data): GuidanceEntity` | Create a Guidance entity instance. |
| `Legal` | `($data): LegalEntity` | Create a Legal entity instance. |
| `Market` | `($data): MarketEntity` | Create a Market entity instance. |
| `Organisation` | `($data): OrganisationEntity` | Create an Organisation entity instance. |
| `Price` | `($data): PriceEntity` | Create a Price entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$guidance = $client->Guidance();`

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
| `sources` | `array` |  |
| `strength` | `string` | Values seen: indicative, strong. |

#### Example: List

```php
// list() returns an array of Guidance entities, one per record (throws on error).
$guidances = $client->Guidance()->list();
```


### Legal

Create an instance: `$legal = $client->Legal();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amountText` | `string` |  |
| `amountUsd` | `int` |  |
| `apiLimit` | `string` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `string` |  |
| `appliesTo` | `array` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buyersAsk` | `string` |  |
| `byPlan` | `string` |  |
| `caseNumber` | `string` |  |
| `claim` | `string` |  |
| `contentType` | `string` |  |
| `date` | `string` |  |
| `defendantIds` | `array` |  |
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
| `parties` | `array` |  |
| `partyIds` | `array` |  |
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
| `sources` | `array` |  |
| `status` | `string` |  |
| `statusAsOf` | `string` |  |
| `summary` | `string` |  |
| `term` | `string` |  |
| `title` | `string` |  |
| `why` | `string` |  |

#### Example: List

```php
// list() returns an array of Legal entities, one per record (throws on error).
$legals = $client->Legal()->list();
```


### Market

Create an instance: `$market = $client->Market();`

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
| `leadInvestors` | `array` |  |
| `licensee` | `string` |  |
| `licenseeIds` | `array` |  |
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

```php
// list() returns an array of Market entities, one per record (throws on error).
$markets = $client->Market()->list();
```


### Organisation

Create an instance: `$organisation = $client->Organisation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aka` | `array` |  |
| `areas` | `array` |  |
| `basis` | `string` | Values seen: reported, stated. |
| `buysData` | `array` | The vendor's own words and the page they are on. |
| `criteria` | `array` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `string` |  |
| `domain` | `string` |  |
| `eligibility` | `string` |  |
| `founded` | `int` |  |
| `high` | `int` |  |
| `hq` | `string` |  |
| `id` | `string` |  |
| `introducerFee` | `string` |  |
| `introducerTerms` | `array` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `string` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `int` |  |
| `madeFrom` | `array` |  |
| `name` | `string` |  |
| `otherDomains` | `array` |  |
| `paidInDays` | `int` |  |
| `paidWhen` | `string` |  |
| `pays` | `string` |  |
| `proof` | `array` |  |
| `readOn` | `string` |  |
| `record` | `array` |  |
| `says` | `array` | The vendor's own words and the page they are on. |
| `scrub` | `string` |  |
| `sells` | `array` |  |
| `source` | `string` |  |
| `sourceLabel` | `string` |  |
| `takes` | `array` |  |
| `wants` | `string` |  |
| `website` | `string` |  |
| `what` | `string` |  |
| `whatSource` | `string` |  |

#### Example: List

```php
// list() returns an array of Organisation entities, one per record (throws on error).
$organisations = $client->Organisation()->list();
```


### Price

Create an instance: `$price = $client->Price();`

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
| `high` | `float` |  |
| `id` | `string` |  |
| `ids` | `array` | Ids of the price observations (listPrices) behind this row. |
| `item` | `string` |  |
| `low` | `float` |  |
| `max` | `float` |  |
| `median` | `float` |  |
| `min` | `float` |  |
| `n` | `int` | Number of observations. |
| `note` | `string` |  |
| `open` | `int` | Number of open-ended observations (no upper bound). |
| `orgIds` | `array` |  |
| `orgNames` | `array` |  |
| `p25` | `float` |  |
| `p75` | `float` |  |
| `perUnitHigh` | `float` |  |
| `perUnitLow` | `float` |  |
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

```php
// list() returns an array of Price entities, one per record (throws on error).
$prices = $client->Price()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── aitrainingrates_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`aitrainingrates_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$price = $client->Price();
$price->list();

// $price->data_get() now returns the price data from the last list
// $price->match_get() returns the last match criteria
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
