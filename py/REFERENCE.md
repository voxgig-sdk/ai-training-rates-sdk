# AiTrainingRates Python SDK Reference

Complete API reference for the AiTrainingRates Python SDK.


## AiTrainingRatesSDK

### Constructor

```python
from aitrainingrates_sdk import AiTrainingRatesSDK

client = AiTrainingRatesSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AiTrainingRatesSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AiTrainingRatesSDK.test()
```


### Instance Methods

#### `Guidance(data=None)`

Create a new `GuidanceEntity` instance. Pass `None` for no initial data.

#### `Legal(data=None)`

Create a new `LegalEntity` instance. Pass `None` for no initial data.

#### `Market(data=None)`

Create a new `MarketEntity` instance. Pass `None` for no initial data.

#### `Organisation(data=None)`

Create a new `OrganisationEntity` instance. Pass `None` for no initial data.

#### `Price(data=None)`

Create a new `PriceEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## GuidanceEntity

```python
guidance = client.Guidance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedOn` | `str` | Yes |  |
| `finding` | `str` | Yes |  |
| `howToUse` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `lever` | `str` | Yes |  |
| `readOn` | `str` | Yes |  |
| `side` | `str` | Yes | Values seen: both, buyer, seller. |
| `sources` | `list` | Yes |  |
| `strength` | `str` | Yes | Values seen: indicative, strong. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[GuidanceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Guidance().list()
for guidance in results:
    print(guidance.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GuidanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LegalEntity

```python
legal = client.Legal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amountText` | `str` | Yes |  |
| `amountUsd` | `int` | Yes |  |
| `apiLimit` | `str` | Yes | Values seen: bars-ai-training, bars-copying, none-found, unclear. |
| `apiRule` | `str` | Yes |  |
| `appliesTo` | `list` | Yes |  |
| `basis` | `str` | Yes | Values seen: reported, stated. |
| `buyersAsk` | `str` | Yes |  |
| `byPlan` | `str` | Yes |  |
| `caseNumber` | `str` | Yes |  |
| `claim` | `str` | Yes |  |
| `contentType` | `str` | Yes |  |
| `date` | `str` | Yes |  |
| `defendantIds` | `list` | Yes |  |
| `evidence` | `str` | Yes |  |
| `exportAllowed` | `str` | Yes | Values seen: limited, unclear, yes. |
| `exportRule` | `str` | Yes |  |
| `gap` | `str` | Yes |  |
| `good` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `inference` | `str` | Yes |  |
| `jurisdiction` | `str` | Yes |  |
| `kind` | `str` | Yes | Values seen: guidance, lawsuit, regulatory action, ruling, settlement. |
| `name` | `str` | Yes |  |
| `notes` | `str` | Yes |  |
| `outcome` | `str` | Yes |  |
| `parties` | `list` | Yes |  |
| `partyIds` | `list` | Yes |  |
| `perWorkText` | `str` | Yes |  |
| `question` | `str` | Yes |  |
| `quote` | `str` | Yes |  |
| `redFlag` | `str` | Yes |  |
| `risk` | `str` | Yes | Values seen: high, low, medium. |
| `sellerPosition` | `str` | Yes |  |
| `severity` | `str` | Yes | Values seen: blocker, fixable, note. |
| `source` | `str` | Yes |  |
| `sourceDate` | `str` | Yes |  |
| `sourceLabel` | `str` | Yes |  |
| `sources` | `list` | Yes |  |
| `status` | `str` | Yes |  |
| `statusAsOf` | `str` | Yes |  |
| `summary` | `str` | Yes |  |
| `term` | `str` | Yes |  |
| `title` | `str` | Yes |  |
| `why` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LegalEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Legal().list()
for legal in results:
    print(legal.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LegalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MarketEntity

```python
market = client.Market()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `acquirer` | `str` | Yes |  |
| `addedOn` | `str` | Yes |  |
| `amountText` | `str` | Yes |  |
| `amountUsd` | `int` | Yes |  |
| `annualUsd` | `int` | Yes |  |
| `basis` | `str` | Yes | Values seen: reported, stated. |
| `channel` | `str` | Yes |  |
| `checkWith` | `str` | No |  |
| `company` | `str` | Yes |  |
| `companyId` | `str` | Yes |  |
| `content` | `str` | Yes |  |
| `counterparty` | `str` | Yes |  |
| `dataType` | `str` | Yes |  |
| `date` | `str` | Yes |  |
| `event` | `str` | Yes | Values seen: acquisition, financing, funding, investment, secondary, valuation. |
| `fact` | `str` | Yes |  |
| `figure` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `kind` | `str` | Yes | Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction. |
| `leadInvestors` | `list` | Yes |  |
| `licensee` | `str` | Yes |  |
| `licenseeIds` | `list` | Yes |  |
| `licensor` | `str` | Yes |  |
| `licensorId` | `str` | Yes |  |
| `licensorType` | `str` | Yes |  |
| `metric` | `str` | Yes |  |
| `party` | `str` | Yes |  |
| `partyId` | `str` | Yes |  |
| `period` | `str` | Yes |  |
| `periodEnd` | `str` | Yes |  |
| `quote` | `str` | Yes |  |
| `readOn` | `str` | Yes |  |
| `round` | `str` | Yes |  |
| `segment` | `str` | Yes |  |
| `source` | `str` | Yes |  |
| `sourceDate` | `str` | Yes |  |
| `sourceLabel` | `str` | Yes |  |
| `status` | `str` | Yes |  |
| `supersededBy` | `str` | No |  |
| `termYears` | `int` | Yes |  |
| `termsText` | `str` | Yes |  |
| `unit` | `str` | Yes |  |
| `unitPriceText` | `str` | Yes |  |
| `url` | `str` | Yes |  |
| `use` | `str` | Yes | Values seen: both, display/grounding, training, unstated. |
| `valuationText` | `str` | Yes |  |
| `valuationUsd` | `int` | Yes |  |
| `valueHighUsd` | `int` | Yes |  |
| `valueLowUsd` | `int` | Yes |  |
| `valueText` | `str` | Yes |  |
| `valueUsd` | `int` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MarketEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Market().list()
for market in results:
    print(market.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MarketEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OrganisationEntity

```python
organisation = client.Organisation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `aka` | `list` | No |  |
| `areas` | `list` | Yes |  |
| `basis` | `str` | Yes | Values seen: reported, stated. |
| `buysData` | `dict` | Yes | The vendor's own words and the page they are on. |
| `criteria` | `dict` | Yes | Eligibility criteria as published by the buyer; every key is optional. |
| `deidentifiedBy` | `str` | No |  |
| `domain` | `str` | Yes |  |
| `eligibility` | `str` | Yes |  |
| `founded` | `int` | Yes |  |
| `high` | `int` | Yes |  |
| `hq` | `str` | Yes |  |
| `id` | `str` | Yes |  |
| `introducerFee` | `str` | Yes |  |
| `introducerTerms` | `dict` | No | Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD. |
| `kind` | `str` | Yes | Values seen: broker, collector, marketplace, principal, wind-down. |
| `low` | `int` | Yes |  |
| `madeFrom` | `list` | Yes |  |
| `name` | `str` | Yes |  |
| `otherDomains` | `list` | No |  |
| `paidInDays` | `int` | No |  |
| `paidWhen` | `str` | Yes |  |
| `pays` | `str` | Yes |  |
| `proof` | `dict` | Yes |  |
| `readOn` | `str` | Yes |  |
| `record` | `dict` | Yes |  |
| `says` | `dict` | Yes | The vendor's own words and the page they are on. |
| `scrub` | `str` | Yes |  |
| `sells` | `list` | Yes |  |
| `source` | `str` | Yes |  |
| `sourceLabel` | `str` | Yes |  |
| `takes` | `list` | Yes |  |
| `wants` | `str` | Yes |  |
| `website` | `str` | Yes |  |
| `what` | `str` | Yes |  |
| `whatSource` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[OrganisationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Organisation().list()
for organisation in results:
    print(organisation.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OrganisationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PriceEntity

```python
price = client.Price()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `addedOn` | `str` | Yes |  |
| `basis` | `str` | Yes | Values seen: docket, listing, reported, stated, vendor. |
| `checkWith` | `str` | No |  |
| `closedOn` | `str` | No |  |
| `currency` | `str` | No | Values seen: CNY, GBP, JPY, KRW, SGD, TWD. |
| `date` | `str` | Yes |  |
| `feed` | `str` | No | Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay. |
| `from` | `str` | Yes |  |
| `group` | `str` | Yes |  |
| `high` | `float` | Yes |  |
| `id` | `str` | Yes |  |
| `ids` | `list` | Yes | Ids of the price observations (listPrices) behind this row. |
| `item` | `str` | Yes |  |
| `low` | `float` | Yes |  |
| `max` | `float` | Yes |  |
| `median` | `float` | Yes |  |
| `min` | `float` | Yes |  |
| `n` | `int` | Yes | Number of observations. |
| `note` | `str` | Yes |  |
| `open` | `int` | Yes | Number of open-ended observations (no upper bound). |
| `orgIds` | `list` | No |  |
| `orgNames` | `list` | No |  |
| `p25` | `float` | Yes |  |
| `p75` | `float` | Yes |  |
| `perUnitHigh` | `float` | Yes |  |
| `perUnitLow` | `float` | Yes |  |
| `perUnitNote` | `str` | No |  |
| `price` | `str` | Yes |  |
| `quote` | `str` | No |  |
| `readOn` | `str` | Yes |  |
| `segment` | `str` | Yes | Always null in the probe; type unverified. |
| `side` | `str` | Yes | Values seen: collection, cost, licence, listing, offer, pay. |
| `source` | `str` | Yes |  |
| `sourceLabel` | `str` | Yes |  |
| `to` | `str` | Yes |  |
| `unit` | `str` | Yes |  |
| `unitKey` | `str` | Yes |  |
| `use` | `str` | Yes |  |

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

#### `list(reqmatch=None, ctrl=None) -> list[PriceEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Price().list()
for price in results:
    print(price.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = AiTrainingRatesSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

