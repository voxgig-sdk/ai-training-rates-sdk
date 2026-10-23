# AiTrainingRates SDK exists test

require "minitest/autorun"
require_relative "../AiTrainingRates_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AiTrainingRatesSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
