# AiTrainingRates Python SDK



The Python SDK for the AiTrainingRates API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Guidance()` — each
carrying a small, uniform set of operations (`list`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/ai-training-rates-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from aitrainingrates_sdk import AiTrainingRatesSDK

client = AiTrainingRatesSDK()
```

### 2. List guidance records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    guidances = client.Guidance().list()
    for guidance in guidances:
        print(guidance.data_get())
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    prices = client.Price().list()
    print([item.data_get() for item in prices])
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = AiTrainingRatesSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
price = client.Price().list()
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = AiTrainingRatesSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### AiTrainingRatesSDK

```python
from aitrainingrates_sdk import AiTrainingRatesSDK

client = AiTrainingRatesSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = AiTrainingRatesSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### AiTrainingRatesSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Guidance` | `(data) -> GuidanceEntity` | Create a Guidance entity instance. |
| `Legal` | `(data) -> LegalEntity` | Create a Legal entity instance. |
| `Market` | `(data) -> MarketEntity` | Create a Market entity instance. |
| `Organisation` | `(data) -> OrganisationEntity` | Create an Organisation entity instance. |
| `Price` | `(data) -> PriceEntity` | Create a Price entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `guidance = client.Guidance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedOn` | `str` |  |
| `finding` | `str` |  |
| `howToUse` | `str` |  |
| `id` | `str` |  |
| `lever` | `str` |  |
| `readOn` | `str` |  |
| `side` | `str` | Values seen: both, buyer, seller. |
| `sources` | `list` |  |
| `strength` | `str` | Values seen: indicative, strong. |

#### Example: List

```python
guidances = client.Guidance().list()
```


### Legal

Create an instance: `legal = client.Legal()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amountText` | `str` |  |
| `amountUsd` | `int` |  |
| `apiLimit` | `str` | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `str` |  |
| `appliesTo` | `list` |  |
| `basis` | `str` | Values seen: reported, stated. |
| `buyersAsk` | `str` |  |
| `byPlan` | `str` |  |
| `caseNumber` | `str` |  |
| `claim` | `str` |  |
| `contentType` | `str` |  |
| `date` | `str` |  |
| `defendantIds` | `list` |  |
| `evidence` | `str` |  |
| `exportAllowed` | `str` | Values seen: limited, unclear, yes. |
| `exportRule` | `str` |  |
| `gap` | `str` |  |
| `good` | `str` |  |
| `id` | `str` |  |
| `inference` | `str` |  |
| `jurisdiction` | `str` |  |
| `kind` | `str` | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` | `str` |  |
| `notes` | `str` |  |
| `outcome` | `str` |  |
| `parties` | `list` |  |
| `partyIds` | `list` |  |
| `perWorkText` | `str` |  |
| `question` | `str` |  |
| `quote` | `str` |  |
| `redFlag` | `str` |  |
| `risk` | `str` | Values seen: high, low, medium. |
| `sellerPosition` | `str` |  |
| `severity` | `str` | Values seen: blocker, fixable, note. |
| `source` | `str` |  |
| `sourceDate` | `str` |  |
| `sourceLabel` | `str` |  |
| `sources` | `list` |  |
| `status` | `str` |  |
| `statusAsOf` | `str` |  |
| `summary` | `str` |  |
| `term` | `str` |  |
| `title` | `str` |  |
| `why` | `str` |  |

#### Example: List

```python
legals = client.Legal().list()
```


### Market

Create an instance: `market = client.Market()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `acquirer` | `str` |  |
| `addedOn` | `str` |  |
| `amountText` | `str` |  |
| `amountUsd` | `int` |  |
| `annualUsd` | `int` |  |
| `basis` | `str` | Values seen: reported, stated. |
| `channel` | `str` |  |
| `checkWith` | `str` |  |
| `company` | `str` |  |
| `companyId` | `str` |  |
| `content` | `str` |  |
| `counterparty` | `str` |  |
| `dataType` | `str` |  |
| `date` | `str` |  |
| `event` | `str` | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` | `str` |  |
| `figure` | `str` |  |
| `id` | `str` |  |
| `kind` | `str` | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` | `list` |  |
| `licensee` | `str` |  |
| `licenseeIds` | `list` |  |
| `licensor` | `str` |  |
| `licensorId` | `str` |  |
| `licensorType` | `str` |  |
| `metric` | `str` |  |
| `party` | `str` |  |
| `partyId` | `str` |  |
| `period` | `str` |  |
| `periodEnd` | `str` |  |
| `quote` | `str` |  |
| `readOn` | `str` |  |
| `round` | `str` |  |
| `segment` | `str` |  |
| `source` | `str` |  |
| `sourceDate` | `str` |  |
| `sourceLabel` | `str` |  |
| `status` | `str` |  |
| `supersededBy` | `str` |  |
| `termYears` | `int` |  |
| `termsText` | `str` |  |
| `unit` | `str` |  |
| `unitPriceText` | `str` |  |
| `url` | `str` |  |
| `use` | `str` | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `str` |  |
| `valuationUsd` | `int` |  |
| `valueHighUsd` | `int` |  |
| `valueLowUsd` | `int` |  |
| `valueText` | `str` |  |
| `valueUsd` | `int` |  |

#### Example: List

```python
markets = client.Market().list()
```


### Organisation

Create an instance: `organisation = client.Organisation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `aka` | `list` |  |
| `areas` | `list` |  |
| `basis` | `str` | Values seen: reported, stated. |
| `buysData` | `dict` | The vendor's own words and the page they are on. |
| `criteria` | `dict` | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `str` |  |
| `domain` | `str` |  |
| `eligibility` | `str` |  |
| `founded` | `int` |  |
| `high` | `int` |  |
| `hq` | `str` |  |
| `id` | `str` |  |
| `introducerFee` | `str` |  |
| `introducerTerms` | `dict` | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `str` | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `int` |  |
| `madeFrom` | `list` |  |
| `name` | `str` |  |
| `otherDomains` | `list` |  |
| `paidInDays` | `int` |  |
| `paidWhen` | `str` |  |
| `pays` | `str` |  |
| `proof` | `dict` |  |
| `readOn` | `str` |  |
| `record` | `dict` |  |
| `says` | `dict` | The vendor's own words and the page they are on. |
| `scrub` | `str` |  |
| `sells` | `list` |  |
| `source` | `str` |  |
| `sourceLabel` | `str` |  |
| `takes` | `list` |  |
| `wants` | `str` |  |
| `website` | `str` |  |
| `what` | `str` |  |
| `whatSource` | `str` |  |

#### Example: List

```python
organisations = client.Organisation().list()
```


### Price

Create an instance: `price = client.Price()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `addedOn` | `str` |  |
| `basis` | `str` | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` | `str` |  |
| `closedOn` | `str` |  |
| `currency` | `str` | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` | `str` |  |
| `feed` | `str` | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` | `str` |  |
| `group` | `str` |  |
| `high` | `float` |  |
| `id` | `str` |  |
| `ids` | `list` | Ids of the price observations (listPrices) behind this row. |
| `item` | `str` |  |
| `low` | `float` |  |
| `max` | `float` |  |
| `median` | `float` |  |
| `min` | `float` |  |
| `n` | `int` | Number of observations. |
| `note` | `str` |  |
| `open` | `int` | Number of open-ended observations (no upper bound). |
| `orgIds` | `list` |  |
| `orgNames` | `list` |  |
| `p25` | `float` |  |
| `p75` | `float` |  |
| `perUnitHigh` | `float` |  |
| `perUnitLow` | `float` |  |
| `perUnitNote` | `str` |  |
| `price` | `str` |  |
| `quote` | `str` |  |
| `readOn` | `str` |  |
| `segment` | `str` | Always null in the probe; type unverified. |
| `side` | `str` | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` | `str` |  |
| `sourceLabel` | `str` |  |
| `to` | `str` |  |
| `unit` | `str` |  |
| `unitKey` | `str` |  |
| `use` | `str` |  |

#### Example: List

```python
prices = client.Price().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── aitrainingrates_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`aitrainingrates_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
price = client.Price()
price.list()

# price.data_get() now returns the price data from the last list
# price.match_get() returns the last match criteria
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
