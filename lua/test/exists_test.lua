-- AiTrainingRates SDK exists test

local sdk = require("ai-training-rates_sdk")

describe("AiTrainingRatesSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
