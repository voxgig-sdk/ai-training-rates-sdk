"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OrganisationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AI_TRAINING_RATES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AI_TRAINING_RATES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AiTrainingRatesSDK.test();
        const ent = testsdk.Organisation();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('organisation hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.AiTrainingRatesSDK.test(offline).Organisation().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.AiTrainingRatesSDK.test(offline).Organisation()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.AiTrainingRatesSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Organisation().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.AiTrainingRatesSDK.test().Organisation().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.AiTrainingRatesSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Organisation().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Organisation().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AiTrainingRatesSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Organisation().list({ "basis": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AI_TRAINING_RATES_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'organisation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "aka": { "a": true, "h": "Aka", "n": "aka", "r": false, "t": "`$ARRAY`", "key$": "aka", "index$": 0 }, "areas": { "a": true, "h": "Areas", "n": "areas", "r": true, "t": "`$ARRAY`", "key$": "areas", "index$": 1 }, "basis": { "a": true, "h": "Basis", "n": "basis", "r": true, "sh": "Values seen: reported, stated.", "t": "`$STRING`", "key$": "basis", "index$": 2 }, "buysData": { "a": true, "h": "Buys Data", "n": "buysData", "r": true, "sh": "The vendor's own words and the page they are on.", "t": "`$OBJECT`", "key$": "buysData", "index$": 3 }, "criteria": { "a": true, "h": "Criteria", "n": "criteria", "r": true, "sh": "Eligibility criteria as published by the buyer; every key is optional.", "t": "`$OBJECT`", "key$": "criteria", "index$": 4 }, "deidentifiedBy": { "a": true, "h": "Deidentified By", "n": "deidentifiedBy", "r": false, "t": "`$STRING`", "key$": "deidentifiedBy", "index$": 5 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": true, "t": "`$STRING`", "key$": "domain", "index$": 6 }, "eligibility": { "a": true, "h": "Eligibility", "n": "eligibility", "r": true, "t": "`$STRING`", "key$": "eligibility", "index$": 7 }, "founded": { "a": true, "h": "Founded", "n": "founded", "r": true, "t": "`$INTEGER`", "key$": "founded", "index$": 8 }, "high": { "a": true, "h": "High", "n": "high", "r": true, "t": "`$INTEGER`", "key$": "high", "index$": 9 }, "hq": { "a": true, "h": "Hq", "n": "hq", "r": true, "t": "`$STRING`", "key$": "hq", "index$": 10 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "t": "`$STRING`", "key$": "id", "index$": 11 }, "introducerFee": { "a": true, "h": "Introducer Fee", "n": "introducerFee", "r": true, "t": "`$STRING`", "key$": "introducerFee", "index$": 12 }, "introducerTerms": { "a": true, "h": "Introducer Terms", "n": "introducerTerms", "r": false, "sh": "Structured introducer (referral) fee terms: rate is a fraction, cap and flat are USD.", "t": "`$OBJECT`", "key$": "introducerTerms", "index$": 13 }, "kind": { "a": true, "h": "Kind", "n": "kind", "r": true, "sh": "Values seen: broker, collector, marketplace, principal, wind-down.", "t": "`$STRING`", "key$": "kind", "index$": 14 }, "low": { "a": true, "h": "Low", "n": "low", "r": true, "t": "`$INTEGER`", "key$": "low", "index$": 15 }, "madeFrom": { "a": true, "h": "Made From", "n": "madeFrom", "r": true, "t": "`$ARRAY`", "key$": "madeFrom", "index$": 16 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "t": "`$STRING`", "key$": "name", "index$": 17 }, "otherDomains": { "a": true, "h": "Other Domains", "n": "otherDomains", "r": false, "t": "`$ARRAY`", "key$": "otherDomains", "index$": 18 }, "paidInDays": { "a": true, "h": "Paid In Days", "n": "paidInDays", "r": false, "t": "`$INTEGER`", "key$": "paidInDays", "index$": 19 }, "paidWhen": { "a": true, "h": "Paid When", "n": "paidWhen", "r": true, "t": "`$STRING`", "key$": "paidWhen", "index$": 20 }, "pays": { "a": true, "h": "Pays", "n": "pays", "r": true, "t": "`$STRING`", "key$": "pays", "index$": 21 }, "proof": { "a": true, "h": "Proof", "n": "proof", "r": true, "t": "`$OBJECT`", "key$": "proof", "index$": 22 }, "readOn": { "a": true, "h": "Read On", "n": "readOn", "r": true, "t": "`$STRING`", "key$": "readOn", "index$": 23 }, "record": { "a": true, "h": "Record", "n": "record", "r": true, "t": "`$OBJECT`", "key$": "record", "index$": 24 }, "says": { "a": true, "h": "Says", "n": "says", "r": true, "sh": "The vendor's own words and the page they are on.", "t": "`$OBJECT`", "key$": "says", "index$": 25 }, "scrub": { "a": true, "h": "Scrub", "n": "scrub", "r": true, "t": "`$STRING`", "key$": "scrub", "index$": 26 }, "sells": { "a": true, "h": "Sells", "n": "sells", "r": true, "t": "`$ARRAY`", "key$": "sells", "index$": 27 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "t": "`$STRING`", "key$": "source", "index$": 28 }, "sourceLabel": { "a": true, "h": "Source Label", "n": "sourceLabel", "r": true, "t": "`$STRING`", "key$": "sourceLabel", "index$": 29 }, "takes": { "a": true, "h": "Takes", "n": "takes", "r": true, "t": "`$ARRAY`", "key$": "takes", "index$": 30 }, "wants": { "a": true, "h": "Wants", "n": "wants", "r": true, "t": "`$STRING`", "key$": "wants", "index$": 31 }, "website": { "a": true, "h": "Website", "n": "website", "r": true, "t": "`$STRING`", "key$": "website", "index$": 32 }, "what": { "a": true, "h": "What", "n": "what", "r": true, "t": "`$STRING`", "key$": "what", "index$": 33 }, "whatSource": { "a": true, "h": "What Source", "n": "whatSource", "r": true, "t": "`$STRING`", "key$": "whatSource", "index$": 34 } }, "id": { "field": "id", "name": "id" }, "name": "organisation", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /datasets/buyers.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/datasets/buyers.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "datasets" }, { "lit": "buyers.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /datasets/companies.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/datasets/companies.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "datasets" }, { "lit": "companies.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /datasets/vendors.json", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/datasets/vendors.json", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "datasets" }, { "lit": "vendors.json" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "organisation", "name__orig": "organisation", "Name": "Organisation", "name_": "organisation", "name-": "organisation", "NAME": "ORGANISATION", "index$": 3 }, { "active": true, "entity": "organisation", "key$": "BasicOrganisationFlow", "kind": "basic", "name": "BasicOrganisationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "organisation_ref01" } }], "index$": 0 }] }, 'Organisation', { "GET /datasets/buyers.json": { "protocol": "http", "parameters": [] }, "GET /datasets/companies.json": { "protocol": "http", "parameters": [] }, "GET /datasets/vendors.json": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let organisation_ref01_data = Object.values(setup.data.existing.organisation)[0];
        // LIST
        const organisation_ref01_ent = client.Organisation();
        const organisation_ref01_match = {};
        const organisation_ref01_list = (await organisation_ref01_ent.list(organisation_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/organisation/OrganisationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AiTrainingRatesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['organisation01', 'organisation02', 'organisation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AI_TRAINING_RATES_TEST_ORGANISATION_ENTID': idmap,
        'AI_TRAINING_RATES_TEST_LIVE': 'FALSE',
        'AI_TRAINING_RATES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['AI_TRAINING_RATES_TEST_ORGANISATION_ENTID'];
    const live = 'TRUE' === env.AI_TRAINING_RATES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AI_TRAINING_RATES_TEST_ORGANISATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AiTrainingRatesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AI_TRAINING_RATES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OrganisationEntity.test.js.map