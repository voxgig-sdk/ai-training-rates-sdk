
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AiTrainingRatesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AiTrainingRatesSDK.test()
    equal(testsdk instanceof AiTrainingRatesSDK, true,
      'AiTrainingRatesSDK.test() must return a client synchronously')
  })

})
