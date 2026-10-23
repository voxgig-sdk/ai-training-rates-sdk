# AI Training Rates (AIData.Broker datasets)

Static JSON datasets published by AIData.Broker about the market for AI training data: market rates, price observations, deals, buyers, vendors, lawsuits, funding, revenue and licensing guidance. The catalog entry points at https://aidata.broker/datasets/market-rates.json; the full list of 15 tables comes from https://aidata.broker/llms.txt (section Datasets). Every schema was taken from live GET probes of all 15 JSON files on 2026-10-23 (no key, CORS enabled, cached for an hour). Each response is the same envelope (dataset, description, reviewed, license, rows) around a different row type. The CSV twin of each table (same path with .csv) is not modelled. The tables are reviewed and republished often, so optional fields (marked by absence from required) may come and go; enum-like value lists in descriptions are only what the probe saw. Licence: the compilation is CC BY 4.0; quoted text keeps its sources&#39; terms. Unverified: type of MarketRate.segment (always null in the probe). Large: prices.json is about 1.6 MB.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 5 entities and 15 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Guidance

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `side`: Values seen: both, buyer, seller.
- `strength`: Values seen: indicative, strong.

### Legal

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `apiLimit`: Values seen: bars-ai-training, bars-copying, none-found, unclear.
- `basis`: Values seen: reported, stated.
- `exportAllowed`: Values seen: limited, unclear, yes.
- `kind`: Values seen: guidance, lawsuit, regulatory action, ruling, settlement.
- `risk`: Values seen: high, low, medium.

### Market

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `basis`: Values seen: reported, stated.
- `event`: Values seen: acquisition, financing, funding, investment, secondary, valuation.
- `kind`: Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction.
- `use`: Values seen: both, display/grounding, training, unstated.

### Organisation

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `basis`: Values seen: reported, stated.
- `buysData`: The vendor&#39;s own words and the page they are on.
- `criteria`: Eligibility criteria as published by the buyer; every key is optional.
- `introducerTerms`: Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD.
- `kind`: Values seen: broker, collector, marketplace, principal, wind-down.

### Price

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `basis`: Values seen: docket, listing, reported, stated, vendor.
- `currency`: Values seen: CNY, GBP, JPY, KRW, SGD, TWD.
- `feed`: Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay.
- `ids`: Ids of the price observations (listPrices) behind this row.
- `n`: Number of observations.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Guidance | `list` | `GET /datasets/negotiation-levers.json` | See reference |
| Legal | `list` | `GET /datasets/cases.json` | See reference |
| Legal | `list` | `GET /datasets/licence-terms.json` | See reference |
| Legal | `list` | `GET /datasets/rights-checks.json` | See reference |
| Legal | `list` | `GET /datasets/software-terms.json` | See reference |
| Market | `list` | `GET /datasets/deals.json` | See reference |
| Market | `list` | `GET /datasets/financials.json` | See reference |
| Market | `list` | `GET /datasets/funding.json` | See reference |
| Market | `list` | `GET /datasets/market-log.json` | See reference |
| Market | `list` | `GET /datasets/supply.json` | See reference |
| Organisation | `list` | `GET /datasets/buyers.json` | See reference |
| Organisation | `list` | `GET /datasets/companies.json` | See reference |
| Organisation | `list` | `GET /datasets/vendors.json` | See reference |
| Price | `list` | `GET /datasets/market-rates.json` | See reference |
| Price | `list` | `GET /datasets/prices.json` | See reference |

## Connect to the API

- AIData.Broker static datasets: `https://aidata.broker`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `ai-training-rates_list`: List records for an entity. Supported entities: `guidance`, `legal`, `market`, `organisation`, `price`.
- `ai-training-rates_load`: Load one record for an entity. No active entity supports this operation.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

