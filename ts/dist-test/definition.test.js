"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "guidance",
        "accessor": "Guidance",
        "op": "list",
        "method": "GET",
        "path": "/datasets/negotiation-levers.json",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "dataset": "How AI training data prices are negotiated",
            "description": "x",
            "reviewed": "2026-10-22",
            "license": {
                "name": "CC BY 4.0",
                "url": "https://creativecommons.org/licenses/by/4.0/",
                "covers": "our compilation of the tables",
                "excludes": "quotes keep their sources' terms, and article text is not covered"
            },
            "rows": [
                {
                    "id": "competitive-process-doubles-the-opening-bid",
                    "side": "seller",
                    "lever": "Run a competitive process, not a bilateral talk",
                    "finding": "x",
                    "howToUse": "x",
                    "strength": "strong",
                    "sources": [
                        {
                            "title": "x",
                            "url": "x",
                            "date": "2026-09-13",
                            "quote": "x",
                            "checkWith": "browser"
                        }
                    ],
                    "readOn": "2026-10-11",
                    "addedOn": "2026-10-11"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map