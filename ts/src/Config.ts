
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AiTrainingRates',
        slug: "ai-training-rates",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://aidata.broker",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        guidance: {
        },
  
        legal: {
        },
  
        market: {
        },
  
        organisation: {
        },
  
        price: {
        },
  
    }
  }


  entity = {
    "guidance": {
      "fields": [
        {
          "name": "addedOn",
          "title": "Added On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "finding",
          "title": "Finding",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "howToUse",
          "title": "How To Use",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "lever",
          "title": "Lever",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "readOn",
          "title": "Read On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "side",
          "title": "Side",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: both, buyer, seller."
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "strength",
          "title": "Strength",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: indicative, strong."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "datasets"
                },
                {
                  "lit": "negotiation-levers.json"
                }
              ],
              "parts": [
                "datasets",
                "negotiation-levers.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "legal": {
      "fields": [
        {
          "name": "amountText",
          "title": "Amount Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "amountUsd",
          "title": "Amount Usd",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "apiLimit",
          "title": "Api Limit",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: bars-ai-training, bars-copying, none-found, unclear."
        },
        {
          "name": "apiRule",
          "title": "Api Rule",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "appliesTo",
          "title": "Applies To",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "basis",
          "title": "Basis",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: reported, stated."
        },
        {
          "name": "buyersAsk",
          "title": "Buyers Ask",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "byPlan",
          "title": "By Plan",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "caseNumber",
          "title": "Case Number",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "claim",
          "title": "Claim",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "contentType",
          "title": "Content Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "defendantIds",
          "title": "Defendant Ids",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "evidence",
          "title": "Evidence",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "exportAllowed",
          "title": "Export Allowed",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: limited, unclear, yes."
        },
        {
          "name": "exportRule",
          "title": "Export Rule",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "gap",
          "title": "Gap",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "good",
          "title": "Good",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "inference",
          "title": "Inference",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "jurisdiction",
          "title": "Jurisdiction",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "kind",
          "title": "Kind",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: guidance, lawsuit, regulatory action, ruling, settlement."
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "notes",
          "title": "Notes",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "outcome",
          "title": "Outcome",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "parties",
          "title": "Parties",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "partyIds",
          "title": "Party Ids",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "perWorkText",
          "title": "Per Work Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "question",
          "title": "Question",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "quote",
          "title": "Quote",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "redFlag",
          "title": "Red Flag",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "risk",
          "title": "Risk",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: high, low, medium."
        },
        {
          "name": "sellerPosition",
          "title": "Seller Position",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "severity",
          "title": "Severity",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: blocker, fixable, note."
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sourceDate",
          "title": "Source Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sourceLabel",
          "title": "Source Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "statusAsOf",
          "title": "Status As Of",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "summary",
          "title": "Summary",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "term",
          "title": "Term",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "why",
          "title": "Why",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "datasets"
                },
                {
                  "lit": "cases.json"
                }
              ],
              "parts": [
                "datasets",
                "cases.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/licence-terms.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "licence-terms.json"
                }
              ],
              "parts": [
                "datasets",
                "licence-terms.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/rights-checks.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "rights-checks.json"
                }
              ],
              "parts": [
                "datasets",
                "rights-checks.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/software-terms.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "software-terms.json"
                }
              ],
              "parts": [
                "datasets",
                "software-terms.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "market": {
      "fields": [
        {
          "name": "acquirer",
          "title": "Acquirer",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "addedOn",
          "title": "Added On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "amountText",
          "title": "Amount Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "amountUsd",
          "title": "Amount Usd",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "annualUsd",
          "title": "Annual Usd",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "basis",
          "title": "Basis",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: reported, stated."
        },
        {
          "name": "channel",
          "title": "Channel",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "checkWith",
          "title": "Check With",
          "type": "`$STRING`"
        },
        {
          "name": "company",
          "title": "Company",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "companyId",
          "title": "Company Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "content",
          "title": "Content",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "counterparty",
          "title": "Counterparty",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "dataType",
          "title": "Data Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "event",
          "title": "Event",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: acquisition, financing, funding, investment, secondary, valuation."
        },
        {
          "name": "fact",
          "title": "Fact",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "figure",
          "title": "Figure",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "kind",
          "title": "Kind",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction."
        },
        {
          "name": "leadInvestors",
          "title": "Lead Investors",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "licensee",
          "title": "Licensee",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "licenseeIds",
          "title": "Licensee Ids",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "licensor",
          "title": "Licensor",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "licensorId",
          "title": "Licensor Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "licensorType",
          "title": "Licensor Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "metric",
          "title": "Metric",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "party",
          "title": "Party",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "partyId",
          "title": "Party Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "period",
          "title": "Period",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "periodEnd",
          "title": "Period End",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "quote",
          "title": "Quote",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "readOn",
          "title": "Read On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "round",
          "title": "Round",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "segment",
          "title": "Segment",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sourceDate",
          "title": "Source Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sourceLabel",
          "title": "Source Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "supersededBy",
          "title": "Superseded By",
          "type": "`$STRING`"
        },
        {
          "name": "termYears",
          "title": "Term Years",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "termsText",
          "title": "Terms Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "unit",
          "title": "Unit",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "unitPriceText",
          "title": "Unit Price Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "use",
          "title": "Use",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: both, display/grounding, training, unstated."
        },
        {
          "name": "valuationText",
          "title": "Valuation Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "valuationUsd",
          "title": "Valuation Usd",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "valueHighUsd",
          "title": "Value High Usd",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "valueLowUsd",
          "title": "Value Low Usd",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "valueText",
          "title": "Value Text",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "valueUsd",
          "title": "Value Usd",
          "type": "`$INTEGER`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "datasets"
                },
                {
                  "lit": "deals.json"
                }
              ],
              "parts": [
                "datasets",
                "deals.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/financials.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "financials.json"
                }
              ],
              "parts": [
                "datasets",
                "financials.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/funding.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "funding.json"
                }
              ],
              "parts": [
                "datasets",
                "funding.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/market-log.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "market-log.json"
                }
              ],
              "parts": [
                "datasets",
                "market-log.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/supply.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "supply.json"
                }
              ],
              "parts": [
                "datasets",
                "supply.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "organisation": {
      "fields": [
        {
          "name": "aka",
          "title": "Aka",
          "type": "`$ARRAY`"
        },
        {
          "name": "areas",
          "title": "Areas",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "basis",
          "title": "Basis",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: reported, stated."
        },
        {
          "name": "buysData",
          "title": "Buys Data",
          "type": "`$OBJECT`",
          "req": true,
          "short": "The vendor's own words and the page they are on."
        },
        {
          "name": "criteria",
          "title": "Criteria",
          "type": "`$OBJECT`",
          "req": true,
          "short": "Eligibility criteria as published by the buyer; every key is optional."
        },
        {
          "name": "deidentifiedBy",
          "title": "Deidentified By",
          "type": "`$STRING`"
        },
        {
          "name": "domain",
          "title": "Domain",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "eligibility",
          "title": "Eligibility",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "founded",
          "title": "Founded",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "high",
          "title": "High",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "hq",
          "title": "Hq",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "introducerFee",
          "title": "Introducer Fee",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "introducerTerms",
          "title": "Introducer Terms",
          "type": "`$OBJECT`",
          "short": "Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD."
        },
        {
          "name": "kind",
          "title": "Kind",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: broker, collector, marketplace, principal, wind-down."
        },
        {
          "name": "low",
          "title": "Low",
          "type": "`$INTEGER`",
          "req": true
        },
        {
          "name": "madeFrom",
          "title": "Made From",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "otherDomains",
          "title": "Other Domains",
          "type": "`$ARRAY`"
        },
        {
          "name": "paidInDays",
          "title": "Paid In Days",
          "type": "`$INTEGER`"
        },
        {
          "name": "paidWhen",
          "title": "Paid When",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "pays",
          "title": "Pays",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "proof",
          "title": "Proof",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "readOn",
          "title": "Read On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "record",
          "title": "Record",
          "type": "`$OBJECT`",
          "req": true
        },
        {
          "name": "says",
          "title": "Says",
          "type": "`$OBJECT`",
          "req": true,
          "short": "The vendor's own words and the page they are on."
        },
        {
          "name": "scrub",
          "title": "Scrub",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sells",
          "title": "Sells",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sourceLabel",
          "title": "Source Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "takes",
          "title": "Takes",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "wants",
          "title": "Wants",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "website",
          "title": "Website",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "what",
          "title": "What",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "whatSource",
          "title": "What Source",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "datasets"
                },
                {
                  "lit": "buyers.json"
                }
              ],
              "parts": [
                "datasets",
                "buyers.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/companies.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "companies.json"
                }
              ],
              "parts": [
                "datasets",
                "companies.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/vendors.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "vendors.json"
                }
              ],
              "parts": [
                "datasets",
                "vendors.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "price": {
      "fields": [
        {
          "name": "addedOn",
          "title": "Added On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "basis",
          "title": "Basis",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: docket, listing, reported, stated, vendor."
        },
        {
          "name": "checkWith",
          "title": "Check With",
          "type": "`$STRING`"
        },
        {
          "name": "closedOn",
          "title": "Closed On",
          "type": "`$STRING`"
        },
        {
          "name": "currency",
          "title": "Currency",
          "type": "`$STRING`",
          "short": "Values seen: CNY, GBP, JPY, KRW, SGD, TWD."
        },
        {
          "name": "date",
          "title": "Date",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "feed",
          "title": "Feed",
          "type": "`$STRING`",
          "short": "Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay."
        },
        {
          "name": "from",
          "title": "From",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "group",
          "title": "Group",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "high",
          "title": "High",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "ids",
          "title": "Ids",
          "type": "`$ARRAY`",
          "req": true,
          "short": "Ids of the price observations (listPrices) behind this row."
        },
        {
          "name": "item",
          "title": "Item",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "low",
          "title": "Low",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "max",
          "title": "Max",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "median",
          "title": "Median",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "min",
          "title": "Min",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "n",
          "title": "N",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of observations."
        },
        {
          "name": "note",
          "title": "Note",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "open",
          "title": "Open",
          "type": "`$INTEGER`",
          "req": true,
          "short": "Number of open-ended observations (no upper bound)."
        },
        {
          "name": "orgIds",
          "title": "Org Ids",
          "type": "`$ARRAY`"
        },
        {
          "name": "orgNames",
          "title": "Org Names",
          "type": "`$ARRAY`"
        },
        {
          "name": "p25",
          "title": "P25",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "p75",
          "title": "P75",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "perUnitHigh",
          "title": "Per Unit High",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "perUnitLow",
          "title": "Per Unit Low",
          "type": "`$NUMBER`",
          "req": true
        },
        {
          "name": "perUnitNote",
          "title": "Per Unit Note",
          "type": "`$STRING`"
        },
        {
          "name": "price",
          "title": "Price",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "quote",
          "title": "Quote",
          "type": "`$STRING`"
        },
        {
          "name": "readOn",
          "title": "Read On",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "segment",
          "title": "Segment",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "list": {
              "type": "`$STRING`"
            }
          },
          "short": "Always null in the probe; type unverified."
        },
        {
          "name": "side",
          "title": "Side",
          "type": "`$STRING`",
          "req": true,
          "short": "Values seen: collection, cost, licence, listing, offer, pay."
        },
        {
          "name": "source",
          "title": "Source",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "sourceLabel",
          "title": "Source Label",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "to",
          "title": "To",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "unit",
          "title": "Unit",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "unitKey",
          "title": "Unit Key",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "use",
          "title": "Use",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "list": {
              "type": "`$STRING`"
            }
          }
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "datasets"
                },
                {
                  "lit": "market-rates.json"
                }
              ],
              "parts": [
                "datasets",
                "market-rates.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/datasets/prices.json",
              "segments": [
                {
                  "lit": "datasets"
                },
                {
                  "lit": "prices.json"
                }
              ],
              "parts": [
                "datasets",
                "prices.json"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

