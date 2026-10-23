

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


describe('PriceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_TRAINING_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_TRAINING_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiTrainingRatesSDK.test()
    const ent = testsdk.Price()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('price hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AiTrainingRatesSDK.test(offline).Price().stream('list')) { }
    }, /offline/)

    for await (const _item of AiTrainingRatesSDK.test(offline).Price()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AiTrainingRatesSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Price().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AiTrainingRatesSDK.test().Price().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AiTrainingRatesSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Price().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Price().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AiTrainingRatesSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Price().list({"addedOn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_TRAINING_RATES_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'price.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addedOn":{"a":true,"h":"Added On","n":"addedOn","r":true,"t":"`$STRING`","key$":"addedOn","index$":0},"basis":{"a":true,"h":"Basis","n":"basis","r":true,"sh":"Values seen: docket, listing, reported, stated, vendor.","t":"`$STRING`","key$":"basis","index$":1},"checkWith":{"a":true,"h":"Check With","n":"checkWith","r":false,"t":"`$STRING`","key$":"checkWith","index$":2},"closedOn":{"a":true,"h":"Closed On","n":"closedOn","r":false,"t":"`$STRING`","key$":"closedOn","index$":3},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Values seen: CNY, GBP, JPY, KRW, SGD, TWD.","t":"`$STRING`","key$":"currency","index$":4},"date":{"a":true,"h":"Date","n":"date","r":true,"t":"`$STRING`","key$":"date","index$":5},"feed":{"a":true,"h":"Feed","n":"feed","r":false,"sh":"Values seen: aitraining-jobs-pay, aitraining-jobs-platform-pay.","t":"`$STRING`","key$":"feed","index$":6},"from":{"a":true,"h":"From","n":"from","r":true,"t":"`$STRING`","key$":"from","index$":7},"group":{"a":true,"h":"Group","n":"group","r":true,"t":"`$STRING`","key$":"group","index$":8},"high":{"a":true,"h":"High","n":"high","r":true,"t":"`$NUMBER`","key$":"high","index$":9},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":10},"ids":{"a":true,"h":"Ids","n":"ids","r":true,"sh":"Ids of the price observations (listPrices) behind this row.","t":"`$ARRAY`","key$":"ids","index$":11},"item":{"a":true,"h":"Item","n":"item","r":true,"t":"`$STRING`","key$":"item","index$":12},"low":{"a":true,"h":"Low","n":"low","r":true,"t":"`$NUMBER`","key$":"low","index$":13},"max":{"a":true,"h":"Max","n":"max","r":true,"t":"`$NUMBER`","key$":"max","index$":14},"median":{"a":true,"h":"Median","n":"median","r":true,"t":"`$NUMBER`","key$":"median","index$":15},"min":{"a":true,"h":"Min","n":"min","r":true,"t":"`$NUMBER`","key$":"min","index$":16},"n":{"a":true,"h":"N","n":"n","r":true,"sh":"Number of observations.","t":"`$INTEGER`","key$":"n","index$":17},"note":{"a":true,"h":"Note","n":"note","r":true,"t":"`$STRING`","key$":"note","index$":18},"open":{"a":true,"h":"Open","n":"open","r":true,"sh":"Number of open-ended observations (no upper bound).","t":"`$INTEGER`","key$":"open","index$":19},"orgIds":{"a":true,"h":"Org Ids","n":"orgIds","r":false,"t":"`$ARRAY`","key$":"orgIds","index$":20},"orgNames":{"a":true,"h":"Org Names","n":"orgNames","r":false,"t":"`$ARRAY`","key$":"orgNames","index$":21},"p25":{"a":true,"h":"P25","n":"p25","r":true,"t":"`$NUMBER`","key$":"p25","index$":22},"p75":{"a":true,"h":"P75","n":"p75","r":true,"t":"`$NUMBER`","key$":"p75","index$":23},"perUnitHigh":{"a":true,"h":"Per Unit High","n":"perUnitHigh","r":true,"t":"`$NUMBER`","key$":"perUnitHigh","index$":24},"perUnitLow":{"a":true,"h":"Per Unit Low","n":"perUnitLow","r":true,"t":"`$NUMBER`","key$":"perUnitLow","index$":25},"perUnitNote":{"a":true,"h":"Per Unit Note","n":"perUnitNote","r":false,"t":"`$STRING`","key$":"perUnitNote","index$":26},"price":{"a":true,"h":"Price","n":"price","r":true,"t":"`$STRING`","key$":"price","index$":27},"quote":{"a":true,"h":"Quote","n":"quote","r":false,"t":"`$STRING`","key$":"quote","index$":28},"readOn":{"a":true,"h":"Read On","n":"readOn","r":true,"t":"`$STRING`","key$":"readOn","index$":29},"segment":{"a":true,"h":"Segment","n":"segment","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Always null in the probe; type unverified.","t":"`$STRING`","key$":"segment","index$":30},"side":{"a":true,"h":"Side","n":"side","r":true,"sh":"Values seen: collection, cost, licence, listing, offer, pay.","t":"`$STRING`","key$":"side","index$":31},"source":{"a":true,"h":"Source","n":"source","r":true,"t":"`$STRING`","key$":"source","index$":32},"sourceLabel":{"a":true,"h":"Source Label","n":"sourceLabel","r":true,"t":"`$STRING`","key$":"sourceLabel","index$":33},"to":{"a":true,"h":"To","n":"to","r":true,"t":"`$STRING`","key$":"to","index$":34},"unit":{"a":true,"h":"Unit","n":"unit","r":true,"t":"`$STRING`","key$":"unit","index$":35},"unitKey":{"a":true,"h":"Unit Key","n":"unitKey","r":true,"t":"`$STRING`","key$":"unitKey","index$":36},"use":{"a":true,"h":"Use","n":"use","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"use","index$":37}},"id":{"field":"id","name":"id"},"name":"price","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /datasets/market-rates.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/market-rates.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"market-rates.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /datasets/prices.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/prices.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"prices.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"price","name__orig":"price","Name":"Price","name_":"price","name-":"price","NAME":"PRICE","index$":4}, {"active":true,"entity":"price","key$":"BasicPriceFlow","kind":"basic","name":"BasicPriceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"price_ref01"}}],"index$":0}]}, 'Price', {"GET /datasets/market-rates.json":{"protocol":"http","parameters":[]},"GET /datasets/prices.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let price_ref01_data = Object.values(setup.data.existing.price)[0] as any

    // LIST
    const price_ref01_ent = client.Price()
    const price_ref01_match: any = {}

    const price_ref01_list = (await price_ref01_ent.list(price_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/price/PriceTestData.json')

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
    ['price01','price02','price03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_TRAINING_RATES_TEST_PRICE_ENTID': idmap,
    'AI_TRAINING_RATES_TEST_LIVE': 'FALSE',
    'AI_TRAINING_RATES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_TRAINING_RATES_TEST_PRICE_ENTID']

  const live = 'TRUE' === env.AI_TRAINING_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_TRAINING_RATES_TEST_PRICE_ENTID']
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
  
