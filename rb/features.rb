# AiTrainingRates SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AiTrainingRatesFeatures
  def self.make_feature(name)
    case name
    when "base"
      AiTrainingRatesBaseFeature.new
    when "ratelimit"
      AiTrainingRatesRatelimitFeature.new
    when "retry"
      AiTrainingRatesRetryFeature.new
    when "test"
      AiTrainingRatesTestFeature.new
    when "timeout"
      AiTrainingRatesTimeoutFeature.new
    else
      AiTrainingRatesBaseFeature.new
    end
  end
end
