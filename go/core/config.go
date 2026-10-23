package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AiTrainingRates",
			"slug": "ai-training-rates",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://aidata.broker",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"guidance": map[string]any{},
				"legal": map[string]any{},
				"market": map[string]any{},
				"organisation": map[string]any{},
				"price": map[string]any{},
			},
		},
		"entity": map[string]any{
			"guidance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addedOn",
						"title": "Added On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "finding",
						"title": "Finding",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "howToUse",
						"title": "How To Use",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "lever",
						"title": "Lever",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "readOn",
						"title": "Read On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "side",
						"title": "Side",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: both, buyer, seller.",
					},
					map[string]any{
						"name": "sources",
						"title": "Sources",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "strength",
						"title": "Strength",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: indicative, strong.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "guidance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/negotiation-levers.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "negotiation-levers.json",
									},
								},
								"parts": []any{
									"datasets",
									"negotiation-levers.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"legal": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "amountText",
						"title": "Amount Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "amountUsd",
						"title": "Amount Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "apiLimit",
						"title": "Api Limit",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: bars-ai-training, bars-copying, none-found, unclear.",
					},
					map[string]any{
						"name": "apiRule",
						"title": "Api Rule",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "appliesTo",
						"title": "Applies To",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "basis",
						"title": "Basis",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: reported, stated.",
					},
					map[string]any{
						"name": "buyersAsk",
						"title": "Buyers Ask",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "byPlan",
						"title": "By Plan",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "caseNumber",
						"title": "Case Number",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "claim",
						"title": "Claim",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "contentType",
						"title": "Content Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "defendantIds",
						"title": "Defendant Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "evidence",
						"title": "Evidence",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "exportAllowed",
						"title": "Export Allowed",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: limited, unclear, yes.",
					},
					map[string]any{
						"name": "exportRule",
						"title": "Export Rule",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "gap",
						"title": "Gap",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "good",
						"title": "Good",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "inference",
						"title": "Inference",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "jurisdiction",
						"title": "Jurisdiction",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: guidance, lawsuit, regulatory action, ruling, settlement.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "outcome",
						"title": "Outcome",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "parties",
						"title": "Parties",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "partyIds",
						"title": "Party Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "perWorkText",
						"title": "Per Work Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "question",
						"title": "Question",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "quote",
						"title": "Quote",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "redFlag",
						"title": "Red Flag",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "risk",
						"title": "Risk",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: high, low, medium.",
					},
					map[string]any{
						"name": "sellerPosition",
						"title": "Seller Position",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "severity",
						"title": "Severity",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: blocker, fixable, note.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceDate",
						"title": "Source Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceLabel",
						"title": "Source Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sources",
						"title": "Sources",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "statusAsOf",
						"title": "Status As Of",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "summary",
						"title": "Summary",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "term",
						"title": "Term",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "why",
						"title": "Why",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "legal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/cases.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "cases.json",
									},
								},
								"parts": []any{
									"datasets",
									"cases.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/licence-terms.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "licence-terms.json",
									},
								},
								"parts": []any{
									"datasets",
									"licence-terms.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/rights-checks.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "rights-checks.json",
									},
								},
								"parts": []any{
									"datasets",
									"rights-checks.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/software-terms.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "software-terms.json",
									},
								},
								"parts": []any{
									"datasets",
									"software-terms.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"market": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "acquirer",
						"title": "Acquirer",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "addedOn",
						"title": "Added On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "amountText",
						"title": "Amount Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "amountUsd",
						"title": "Amount Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "annualUsd",
						"title": "Annual Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "basis",
						"title": "Basis",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: reported, stated.",
					},
					map[string]any{
						"name": "channel",
						"title": "Channel",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "checkWith",
						"title": "Check With",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "company",
						"title": "Company",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "companyId",
						"title": "Company Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "content",
						"title": "Content",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "counterparty",
						"title": "Counterparty",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "dataType",
						"title": "Data Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "event",
						"title": "Event",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: acquisition, financing, funding, investment, secondary, valuation.",
					},
					map[string]any{
						"name": "fact",
						"title": "Fact",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "figure",
						"title": "Figure",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction.",
					},
					map[string]any{
						"name": "leadInvestors",
						"title": "Lead Investors",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "licensee",
						"title": "Licensee",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "licenseeIds",
						"title": "Licensee Ids",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "licensor",
						"title": "Licensor",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "licensorId",
						"title": "Licensor Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "licensorType",
						"title": "Licensor Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "metric",
						"title": "Metric",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "party",
						"title": "Party",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "partyId",
						"title": "Party Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "period",
						"title": "Period",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "periodEnd",
						"title": "Period End",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "quote",
						"title": "Quote",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "readOn",
						"title": "Read On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "round",
						"title": "Round",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "segment",
						"title": "Segment",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceDate",
						"title": "Source Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceLabel",
						"title": "Source Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "supersededBy",
						"title": "Superseded By",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "termYears",
						"title": "Term Years",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "termsText",
						"title": "Terms Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unitPriceText",
						"title": "Unit Price Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "use",
						"title": "Use",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: both, display/grounding, training, unstated.",
					},
					map[string]any{
						"name": "valuationText",
						"title": "Valuation Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "valuationUsd",
						"title": "Valuation Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "valueHighUsd",
						"title": "Value High Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "valueLowUsd",
						"title": "Value Low Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "valueText",
						"title": "Value Text",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "valueUsd",
						"title": "Value Usd",
						"type": "`$INTEGER`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "market",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/deals.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "deals.json",
									},
								},
								"parts": []any{
									"datasets",
									"deals.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/financials.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "financials.json",
									},
								},
								"parts": []any{
									"datasets",
									"financials.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/funding.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "funding.json",
									},
								},
								"parts": []any{
									"datasets",
									"funding.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/market-log.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "market-log.json",
									},
								},
								"parts": []any{
									"datasets",
									"market-log.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/supply.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "supply.json",
									},
								},
								"parts": []any{
									"datasets",
									"supply.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"organisation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "aka",
						"title": "Aka",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "areas",
						"title": "Areas",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "basis",
						"title": "Basis",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: reported, stated.",
					},
					map[string]any{
						"name": "buysData",
						"title": "Buys Data",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The vendor's own words and the page they are on.",
					},
					map[string]any{
						"name": "criteria",
						"title": "Criteria",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Eligibility criteria as published by the buyer; every key is optional.",
					},
					map[string]any{
						"name": "deidentifiedBy",
						"title": "Deidentified By",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "eligibility",
						"title": "Eligibility",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "founded",
						"title": "Founded",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "high",
						"title": "High",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "hq",
						"title": "Hq",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "introducerFee",
						"title": "Introducer Fee",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "introducerTerms",
						"title": "Introducer Terms",
						"type": "`$OBJECT`",
						"short": "Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD.",
					},
					map[string]any{
						"name": "kind",
						"title": "Kind",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: broker, collector, marketplace, principal, wind-down.",
					},
					map[string]any{
						"name": "low",
						"title": "Low",
						"type": "`$INTEGER`",
						"req": true,
					},
					map[string]any{
						"name": "madeFrom",
						"title": "Made From",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "otherDomains",
						"title": "Other Domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "paidInDays",
						"title": "Paid In Days",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "paidWhen",
						"title": "Paid When",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "pays",
						"title": "Pays",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "proof",
						"title": "Proof",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "readOn",
						"title": "Read On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "record",
						"title": "Record",
						"type": "`$OBJECT`",
						"req": true,
					},
					map[string]any{
						"name": "says",
						"title": "Says",
						"type": "`$OBJECT`",
						"req": true,
						"short": "The vendor's own words and the page they are on.",
					},
					map[string]any{
						"name": "scrub",
						"title": "Scrub",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sells",
						"title": "Sells",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceLabel",
						"title": "Source Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "takes",
						"title": "Takes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "wants",
						"title": "Wants",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "website",
						"title": "Website",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "what",
						"title": "What",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "whatSource",
						"title": "What Source",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "organisation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/buyers.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "buyers.json",
									},
								},
								"parts": []any{
									"datasets",
									"buyers.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/companies.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "companies.json",
									},
								},
								"parts": []any{
									"datasets",
									"companies.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/vendors.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "vendors.json",
									},
								},
								"parts": []any{
									"datasets",
									"vendors.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"price": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "addedOn",
						"title": "Added On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "basis",
						"title": "Basis",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: docket, listing, reported, stated, vendor.",
					},
					map[string]any{
						"name": "checkWith",
						"title": "Check With",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "closedOn",
						"title": "Closed On",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"short": "Values seen: CNY, GBP, JPY, KRW, SGD, TWD.",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "feed",
						"title": "Feed",
						"type": "`$STRING`",
						"short": "Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay.",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "group",
						"title": "Group",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "high",
						"title": "High",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "ids",
						"title": "Ids",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Ids of the price observations (listPrices) behind this row.",
					},
					map[string]any{
						"name": "item",
						"title": "Item",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "low",
						"title": "Low",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "max",
						"title": "Max",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "median",
						"title": "Median",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "min",
						"title": "Min",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "n",
						"title": "N",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of observations.",
					},
					map[string]any{
						"name": "note",
						"title": "Note",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "open",
						"title": "Open",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Number of open-ended observations (no upper bound).",
					},
					map[string]any{
						"name": "orgIds",
						"title": "Org Ids",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "orgNames",
						"title": "Org Names",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "p25",
						"title": "P25",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "p75",
						"title": "P75",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "perUnitHigh",
						"title": "Per Unit High",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "perUnitLow",
						"title": "Per Unit Low",
						"type": "`$NUMBER`",
						"req": true,
					},
					map[string]any{
						"name": "perUnitNote",
						"title": "Per Unit Note",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "quote",
						"title": "Quote",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "readOn",
						"title": "Read On",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "segment",
						"title": "Segment",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "Always null in the probe; type unverified.",
					},
					map[string]any{
						"name": "side",
						"title": "Side",
						"type": "`$STRING`",
						"req": true,
						"short": "Values seen: collection, cost, licence, listing, offer, pay.",
					},
					map[string]any{
						"name": "source",
						"title": "Source",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "sourceLabel",
						"title": "Source Label",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unitKey",
						"title": "Unit Key",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "use",
						"title": "Use",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "price",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/market-rates.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "market-rates.json",
									},
								},
								"parts": []any{
									"datasets",
									"market-rates.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/datasets/prices.json",
								"segments": []any{
									map[string]any{
										"lit": "datasets",
									},
									map[string]any{
										"lit": "prices.json",
									},
								},
								"parts": []any{
									"datasets",
									"prices.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
