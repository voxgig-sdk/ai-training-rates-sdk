# AiTrainingRates SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "AiTrainingRates",
            "slug": "ai-training-rates",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://aidata.broker",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "guidance": {},
                "legal": {},
                "market": {},
                "organisation": {},
                "price": {},
            },
        },
        "entity": {
      "guidance": {
        "fields": [
          {
            "name": "addedOn",
            "title": "Added On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "finding",
            "title": "Finding",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "howToUse",
            "title": "How To Use",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "lever",
            "title": "Lever",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "readOn",
            "title": "Read On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "side",
            "title": "Side",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: both, buyer, seller.",
          },
          {
            "name": "sources",
            "title": "Sources",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "strength",
            "title": "Strength",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: indicative, strong.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "guidance",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/negotiation-levers.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "negotiation-levers.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "negotiation-levers.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "legal": {
        "fields": [
          {
            "name": "amountText",
            "title": "Amount Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "amountUsd",
            "title": "Amount Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "apiLimit",
            "title": "Api Limit",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: bars-ai-training, bars-copying, none-found, unclear.",
          },
          {
            "name": "apiRule",
            "title": "Api Rule",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "appliesTo",
            "title": "Applies To",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "basis",
            "title": "Basis",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: reported, stated.",
          },
          {
            "name": "buyersAsk",
            "title": "Buyers Ask",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "byPlan",
            "title": "By Plan",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "caseNumber",
            "title": "Case Number",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "claim",
            "title": "Claim",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "contentType",
            "title": "Content Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "defendantIds",
            "title": "Defendant Ids",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "evidence",
            "title": "Evidence",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "exportAllowed",
            "title": "Export Allowed",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: limited, unclear, yes.",
          },
          {
            "name": "exportRule",
            "title": "Export Rule",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "gap",
            "title": "Gap",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "good",
            "title": "Good",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "inference",
            "title": "Inference",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "jurisdiction",
            "title": "Jurisdiction",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: guidance, lawsuit, regulatory action, ruling, settlement.",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "notes",
            "title": "Notes",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "outcome",
            "title": "Outcome",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "parties",
            "title": "Parties",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "partyIds",
            "title": "Party Ids",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "perWorkText",
            "title": "Per Work Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "question",
            "title": "Question",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "quote",
            "title": "Quote",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "redFlag",
            "title": "Red Flag",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "risk",
            "title": "Risk",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: high, low, medium.",
          },
          {
            "name": "sellerPosition",
            "title": "Seller Position",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "severity",
            "title": "Severity",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: blocker, fixable, note.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceDate",
            "title": "Source Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceLabel",
            "title": "Source Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sources",
            "title": "Sources",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "statusAsOf",
            "title": "Status As Of",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "summary",
            "title": "Summary",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "term",
            "title": "Term",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "why",
            "title": "Why",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "legal",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/cases.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "cases.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "cases.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/licence-terms.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "licence-terms.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "licence-terms.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/rights-checks.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "rights-checks.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "rights-checks.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/software-terms.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "software-terms.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "software-terms.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "market": {
        "fields": [
          {
            "name": "acquirer",
            "title": "Acquirer",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "addedOn",
            "title": "Added On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "amountText",
            "title": "Amount Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "amountUsd",
            "title": "Amount Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "annualUsd",
            "title": "Annual Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "basis",
            "title": "Basis",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: reported, stated.",
          },
          {
            "name": "channel",
            "title": "Channel",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "checkWith",
            "title": "Check With",
            "type": "`$STRING`",
          },
          {
            "name": "company",
            "title": "Company",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "companyId",
            "title": "Company Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "content",
            "title": "Content",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "counterparty",
            "title": "Counterparty",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "dataType",
            "title": "Data Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "event",
            "title": "Event",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: acquisition, financing, funding, investment, secondary, valuation.",
          },
          {
            "name": "fact",
            "title": "Fact",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "figure",
            "title": "Figure",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction.",
          },
          {
            "name": "leadInvestors",
            "title": "Lead Investors",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "licensee",
            "title": "Licensee",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "licenseeIds",
            "title": "Licensee Ids",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "licensor",
            "title": "Licensor",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "licensorId",
            "title": "Licensor Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "licensorType",
            "title": "Licensor Type",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "metric",
            "title": "Metric",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "party",
            "title": "Party",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "partyId",
            "title": "Party Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "period",
            "title": "Period",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "periodEnd",
            "title": "Period End",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "quote",
            "title": "Quote",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "readOn",
            "title": "Read On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "round",
            "title": "Round",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "segment",
            "title": "Segment",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceDate",
            "title": "Source Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceLabel",
            "title": "Source Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "supersededBy",
            "title": "Superseded By",
            "type": "`$STRING`",
          },
          {
            "name": "termYears",
            "title": "Term Years",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "termsText",
            "title": "Terms Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unitPriceText",
            "title": "Unit Price Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "use",
            "title": "Use",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: both, display/grounding, training, unstated.",
          },
          {
            "name": "valuationText",
            "title": "Valuation Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "valuationUsd",
            "title": "Valuation Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "valueHighUsd",
            "title": "Value High Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "valueLowUsd",
            "title": "Value Low Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "valueText",
            "title": "Value Text",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "valueUsd",
            "title": "Value Usd",
            "type": "`$INTEGER`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "market",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/deals.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "deals.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "deals.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/financials.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "financials.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "financials.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/funding.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "funding.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "funding.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/market-log.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "market-log.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "market-log.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/supply.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "supply.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "supply.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "organisation": {
        "fields": [
          {
            "name": "aka",
            "title": "Aka",
            "type": "`$ARRAY`",
          },
          {
            "name": "areas",
            "title": "Areas",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "basis",
            "title": "Basis",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: reported, stated.",
          },
          {
            "name": "buysData",
            "title": "Buys Data",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The vendor's own words and the page they are on.",
          },
          {
            "name": "criteria",
            "title": "Criteria",
            "type": "`$OBJECT`",
            "req": True,
            "short": "Eligibility criteria as published by the buyer; every key is optional.",
          },
          {
            "name": "deidentifiedBy",
            "title": "Deidentified By",
            "type": "`$STRING`",
          },
          {
            "name": "domain",
            "title": "Domain",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "eligibility",
            "title": "Eligibility",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "founded",
            "title": "Founded",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "high",
            "title": "High",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "hq",
            "title": "Hq",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "introducerFee",
            "title": "Introducer Fee",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "introducerTerms",
            "title": "Introducer Terms",
            "type": "`$OBJECT`",
            "short": "Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD.",
          },
          {
            "name": "kind",
            "title": "Kind",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: broker, collector, marketplace, principal, wind-down.",
          },
          {
            "name": "low",
            "title": "Low",
            "type": "`$INTEGER`",
            "req": True,
          },
          {
            "name": "madeFrom",
            "title": "Made From",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "otherDomains",
            "title": "Other Domains",
            "type": "`$ARRAY`",
          },
          {
            "name": "paidInDays",
            "title": "Paid In Days",
            "type": "`$INTEGER`",
          },
          {
            "name": "paidWhen",
            "title": "Paid When",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "pays",
            "title": "Pays",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "proof",
            "title": "Proof",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "readOn",
            "title": "Read On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "record",
            "title": "Record",
            "type": "`$OBJECT`",
            "req": True,
          },
          {
            "name": "says",
            "title": "Says",
            "type": "`$OBJECT`",
            "req": True,
            "short": "The vendor's own words and the page they are on.",
          },
          {
            "name": "scrub",
            "title": "Scrub",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sells",
            "title": "Sells",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceLabel",
            "title": "Source Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "takes",
            "title": "Takes",
            "type": "`$ARRAY`",
            "req": True,
          },
          {
            "name": "wants",
            "title": "Wants",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "website",
            "title": "Website",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "what",
            "title": "What",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "whatSource",
            "title": "What Source",
            "type": "`$STRING`",
            "req": True,
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "organisation",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/buyers.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "buyers.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "buyers.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/companies.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "companies.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "companies.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/vendors.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "vendors.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "vendors.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "price": {
        "fields": [
          {
            "name": "addedOn",
            "title": "Added On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "basis",
            "title": "Basis",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: docket, listing, reported, stated, vendor.",
          },
          {
            "name": "checkWith",
            "title": "Check With",
            "type": "`$STRING`",
          },
          {
            "name": "closedOn",
            "title": "Closed On",
            "type": "`$STRING`",
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "short": "Values seen: CNY, GBP, JPY, KRW, SGD, TWD.",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "feed",
            "title": "Feed",
            "type": "`$STRING`",
            "short": "Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay.",
          },
          {
            "name": "from",
            "title": "From",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "group",
            "title": "Group",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "high",
            "title": "High",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "ids",
            "title": "Ids",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Ids of the price observations (listPrices) behind this row.",
          },
          {
            "name": "item",
            "title": "Item",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "low",
            "title": "Low",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "max",
            "title": "Max",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "median",
            "title": "Median",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "min",
            "title": "Min",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "n",
            "title": "N",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of observations.",
          },
          {
            "name": "note",
            "title": "Note",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "open",
            "title": "Open",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Number of open-ended observations (no upper bound).",
          },
          {
            "name": "orgIds",
            "title": "Org Ids",
            "type": "`$ARRAY`",
          },
          {
            "name": "orgNames",
            "title": "Org Names",
            "type": "`$ARRAY`",
          },
          {
            "name": "p25",
            "title": "P25",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "p75",
            "title": "P75",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "perUnitHigh",
            "title": "Per Unit High",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "perUnitLow",
            "title": "Per Unit Low",
            "type": "`$NUMBER`",
            "req": True,
          },
          {
            "name": "perUnitNote",
            "title": "Per Unit Note",
            "type": "`$STRING`",
          },
          {
            "name": "price",
            "title": "Price",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "quote",
            "title": "Quote",
            "type": "`$STRING`",
          },
          {
            "name": "readOn",
            "title": "Read On",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "segment",
            "title": "Segment",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "short": "Always null in the probe; type unverified.",
          },
          {
            "name": "side",
            "title": "Side",
            "type": "`$STRING`",
            "req": True,
            "short": "Values seen: collection, cost, licence, listing, offer, pay.",
          },
          {
            "name": "source",
            "title": "Source",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "sourceLabel",
            "title": "Source Label",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "to",
            "title": "To",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unit",
            "title": "Unit",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "unitKey",
            "title": "Unit Key",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "use",
            "title": "Use",
            "type": "`$STRING`",
            "req": True,
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "price",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/market-rates.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "market-rates.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "market-rates.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
              {
                "kind": "http",
                "method": "GET",
                "orig": "/datasets/prices.json",
                "segments": [
                  {
                    "lit": "datasets",
                  },
                  {
                    "lit": "prices.json",
                  },
                ],
                "parts": [
                  "datasets",
                  "prices.json",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
