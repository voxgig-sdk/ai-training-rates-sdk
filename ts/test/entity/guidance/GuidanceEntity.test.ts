

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


describe('GuidanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AI_TRAINING_RATES_TEST_LIVE=TRUE.
  afterEach(liveDelay('AI_TRAINING_RATES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AiTrainingRatesSDK.test()
    const ent = testsdk.Guidance()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('guidance hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of AiTrainingRatesSDK.test(offline).Guidance().stream('list')) { }
    }, /offline/)

    for await (const _item of AiTrainingRatesSDK.test(offline).Guidance()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = AiTrainingRatesSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Guidance().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of AiTrainingRatesSDK.test().Guidance().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new AiTrainingRatesSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Guidance().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Guidance().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = AiTrainingRatesSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Guidance().list({"addedOn":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AI_TRAINING_RATES_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'guidance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"addedOn":{"a":true,"h":"Added On","n":"addedOn","r":true,"t":"`$STRING`","key$":"addedOn","index$":0},"finding":{"a":true,"h":"Finding","n":"finding","r":true,"t":"`$STRING`","key$":"finding","index$":1},"howToUse":{"a":true,"h":"How To Use","n":"howToUse","r":true,"t":"`$STRING`","key$":"howToUse","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":3},"lever":{"a":true,"h":"Lever","n":"lever","r":true,"t":"`$STRING`","key$":"lever","index$":4},"readOn":{"a":true,"h":"Read On","n":"readOn","r":true,"t":"`$STRING`","key$":"readOn","index$":5},"side":{"a":true,"h":"Side","n":"side","r":true,"sh":"Values seen: both, buyer, seller.","t":"`$STRING`","key$":"side","index$":6},"sources":{"a":true,"h":"Sources","n":"sources","r":true,"t":"`$ARRAY`","key$":"sources","index$":7},"strength":{"a":true,"h":"Strength","n":"strength","r":true,"sh":"Values seen: indicative, strong.","t":"`$STRING`","key$":"strength","index$":8}},"id":{"field":"id","name":"id"},"name":"guidance","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /datasets/negotiation-levers.json","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/datasets/negotiation-levers.json","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"datasets"},{"lit":"negotiation-levers.json"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"guidance","name__orig":"guidance","Name":"Guidance","name_":"guidance","name-":"guidance","NAME":"GUIDANCE","index$":0}, {"active":true,"entity":"guidance","key$":"BasicGuidanceFlow","kind":"basic","name":"BasicGuidanceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"guidance_ref01"}}],"index$":0}]}, 'Guidance', {"GET /datasets/negotiation-levers.json":{"protocol":"http","parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let guidance_ref01_data = Object.values(setup.data.existing.guidance)[0] as any

    // LIST
    const guidance_ref01_ent = client.Guidance()
    const guidance_ref01_match: any = {}

    const guidance_ref01_list = (await guidance_ref01_ent.list(guidance_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/guidance/GuidanceTestData.json')

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
    ['guidance01','guidance02','guidance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AI_TRAINING_RATES_TEST_GUIDANCE_ENTID': idmap,
    'AI_TRAINING_RATES_TEST_LIVE': 'FALSE',
    'AI_TRAINING_RATES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['AI_TRAINING_RATES_TEST_GUIDANCE_ENTID']

  const live = 'TRUE' === env.AI_TRAINING_RATES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AI_TRAINING_RATES_TEST_GUIDANCE_ENTID']
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
  
