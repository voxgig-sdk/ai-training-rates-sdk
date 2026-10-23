

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AiTrainingRatesSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MarketEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_TRAINING_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_TRAINING_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiTrainingRatesSDK.test()
    const ent = testsdk.Market()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('market hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AiTrainingRatesSDK.test(offline).Market().stream('list')) { }
    }, /offline/)

    for await (const _item of AiTrainingRatesSDK.test(offline).Market()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AiTrainingRatesSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Market().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AiTrainingRatesSDK.test().Market().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AiTrainingRatesSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Market().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Market().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AiTrainingRatesSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Market().list({"acquirer":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_TRAINING_RATES_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'market.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"acquirer":{"a":true,"h":"Acquirer","n":"acquirer","r":true,"t":"`$STRING`","key$":"acquirer","index$":0},"addedOn":{"a":true,"h":"Added On","n":"addedOn","r":true,"t":"`$STRING`","key$":"addedOn","index$":1},"amountText":{"a":true,"h":"Amount Text","n":"amountText","r":true,"t":"`$STRING`","key$":"amountText","index$":2},"amountUsd":{"a":true,"h":"Amount Usd","n":"amountUsd","r":true,"t":"`$INTEGER`","key$":"amountUsd","index$":3},"annualUsd":{"a":true,"h":"Annual Usd","n":"annualUsd","r":true,"t":"`$INTEGER`","key$":"annualUsd","index$":4},"basis":{"a":true,"h":"Basis","n":"basis","r":true,"sh":"Values seen: reported, stated.","t":"`$STRING`","key$":"basis","index$":5},"channel":{"a":true,"h":"Channel","n":"channel","r":true,"t":"`$STRING`","key$":"channel","index$":6},"checkWith":{"a":true,"h":"Check With","n":"checkWith","r":false,"t":"`$STRING`","key$":"checkWith","index$":7},"company":{"a":true,"h":"Company","n":"company","r":true,"t":"`$STRING`","key$":"company","index$":8},"companyId":{"a":true,"h":"Company Id","n":"companyId","r":true,"t":"`$STRING`","key$":"companyId","index$":9},"content":{"a":true,"h":"Content","n":"content","r":true,"t":"`$STRING`","key$":"content","index$":10},"counterparty":{"a":true,"h":"Counterparty","n":"counterparty","r":true,"t":"`$STRING`","key$":"counterparty","index$":11},"dataType":{"a":true,"h":"Data Type","n":"dataType","r":true,"t":"`$STRING`","key$":"dataType","index$":12},"date":{"a":true,"h":"Date","n":"date","r":true,"t":"`$STRING`","key$":"date","index$":13},"event":{"a":true,"h":"Event","n":"event","r":true,"sh":"Values seen: acquisition, financing, funding, investment, secondary, valuation.","t":"`$STRING`","key$":"event","index$":14},"fact":{"a":true,"h":"Fact","n":"fact","r":true,"t":"`$STRING`","key$":"fact","index$":15},"figure":{"a":true,"h":"Figure","n":"figure","r":true,"t":"`$STRING`","key$":"figure","index$":16},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":17},"kind":{"a":true,"h":"Kind","n":"kind","r":true,"sh":"Values seen: broker economics, buyer program, intermediary, legal or policy, price range, referral terms, transaction.","t":"`$STRING`","key$":"kind","index$":18},"leadInvestors":{"a":true,"h":"Lead Investors","n":"leadInvestors","r":true,"t":"`$ARRAY`","key$":"leadInvestors","index$":19},"licensee":{"a":true,"h":"Licensee","n":"licensee","r":true,"t":"`$STRING`","key$":"licensee","index$":20},"licenseeIds":{"a":true,"h":"Licensee Ids","n":"licenseeIds","r":true,"t":"`$ARRAY`","key$":"licenseeIds","index$":21},"licensor":{"a":true,"h":"Licensor","n":"licensor","r":true,"t":"`$STRING`","key$":"licensor","index$":22},"licensorId":{"a":true,"h":"Licensor Id","n":"licensorId","r":true,"t":"`$STRING`","key$":"licensorId","index$":23},"licensorType":{"a":true,"h":"Licensor Type","n":"licensorType","r":true,"t":"`$STRING`","key$":"licensorType","index$":24},"metric":{"a":true,"h":"Metric","n":"metric","r":true,"t":"`$STRING`","key$":"metric","index$":25},"party":{"a":true,"h":"Party","n":"party","r":true,"t":"`$STRING`","key$":"party","index$":26},"partyId":{"a":true,"h":"Party Id","n":"partyId","r":true,"t":"`$STRING`","key$":"partyId","index$":27},"period":{"a":true,"h":"Period","n":"period","r":true,"t":"`$STRING`","key$":"period","index$":28},"periodEnd":{"a":true,"h":"Period End","n":"periodEnd","r":true,"t":"`$STRING`","key$":"periodEnd","index$":29},"quote":{"a":true,"h":"Quote","n":"quote","r":true,"t":"`$STRING`","key$":"quote","index$":30},"readOn":{"a":true,"h":"Read On","n":"readOn","r":true,"t":"`$STRING`","key$":"readOn","index$":31},"round":{"a":true,"h":"Round","n":"round","r":true,"t":"`$STRING`","key$":"round","index$":32},"segment":{"a":true,"h":"Segment","n":"segment","r":true,"t":"`$STRING`","key$":"segment","index$":33},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":34},"sourceDate":{"a":true,"h":"Source Date","n":"sourceDate","r":true,"t":"`$STRING`","key$":"sourceDate","index$":35},"sourceLabel":{"a":true,"h":"Source Label","n":"sourceLabel","r":true,"t":"`$STRING`","key$":"sourceLabel","index$":36},"status":{"a":true,"h":"Status","n":"status","r":true,"t":"`$STRING`","key$":"status","index$":37},"supersededBy":{"a":true,"h":"Superseded By","n":"supersededBy","r":false,"t":"`$STRING`","key$":"supersededBy","index$":38},"termYears":{"a":true,"h":"Term Years","n":"termYears","r":true,"t":"`$INTEGER`","key$":"termYears","index$":39},"termsText":{"a":true,"h":"Terms Text","n":"termsText","r":true,"t":"`$STRING`","key$":"termsText","index$":40},"unit":{"a":true,"h":"Unit","n":"unit","r":true,"t":"`$STRING`","key$":"unit","index$":41},"unitPriceText":{"a":true,"h":"Unit Price Text","n":"unitPriceText","r":true,"t":"`$STRING`","key$":"unitPriceText","index$":42},"url":{"a":true,"h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":43},"use":{"a":true,"h":"Use","n":"use","r":true,"sh":"Values seen: both, display/grounding, training, unstated.","t":"`$STRING`","key$":"use","index$":44},"valuationText":{"a":true,"h":"Valuation Text","n":"valuationText","r":true,"t":"`$STRING`","key$":"valuationText","index$":45},"valuationUsd":{"a":true,"h":"Valuation Usd","n":"valuationUsd","r":true,"t":"`$INTEGER`","key$":"valuationUsd","index$":46},"valueHighUsd":{"a":true,"h":"Value High Usd","n":"valueHighUsd","r":true,"t":"`$INTEGER`","key$":"valueHighUsd","index$":47},"valueLowUsd":{"a":true,"h":"Value Low Usd","n":"valueLowUsd","r":true,"t":"`$INTEGER`","key$":"valueLowUsd","index$":48},"valueText":{"a":true,"h":"Value Text","n":"valueText","r":true,"t":"`$STRING`","key$":"valueText","index$":49},"valueUsd":{"a":true,"h":"Value Usd","n":"valueUsd","r":true,"t":"`$INTEGER`","key$":"valueUsd","index$":50}},"id":{"field":"id","name":"id"},"name":"market","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /datasets/deals.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/deals.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"deals.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /datasets/financials.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/financials.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"financials.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /datasets/funding.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/funding.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"funding.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /datasets/market-log.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/market-log.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"market-log.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /datasets/supply.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/supply.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"supply.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"market","name__orig":"market","Name":"Market","name_":"market","name-":"market","NAME":"MARKET","index$":2}, {"active":true,"entity":"market","key$":"BasicMarketFlow","kind":"basic","name":"BasicMarketFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"market_ref01"}}],"index$":0}]}, 'Market', {"GET /datasets/deals.json":{"protocol":"http","parameters":[]},"GET /datasets/financials.json":{"protocol":"http","parameters":[]},"GET /datasets/funding.json":{"protocol":"http","parameters":[]},"GET /datasets/market-log.json":{"protocol":"http","parameters":[]},"GET /datasets/supply.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let market_ref01_data = Object.values(setup.data.existing.market)[0] as any

    // LIST
    const market_ref01_ent = client.Market()
    const market_ref01_match: any = {}

    const market_ref01_list = (await market_ref01_ent.list(market_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/market/MarketTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AiTrainingRatesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['market01','market02','market03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_TRAINING_RATES_TEST_MARKET_ENTID': idmap,
    'AI_TRAINING_RATES_TEST_LIVE': 'FALSE',
    'AI_TRAINING_RATES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_TRAINING_RATES_TEST_MARKET_ENTID']

  const live = 'TRUE' === env.AI_TRAINING_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_TRAINING_RATES_TEST_MARKET_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AiTrainingRatesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
