# AiTrainingRates SDK utility: make_context
require_relative '../core/context'
module AiTrainingRatesUtilities
  MakeContext = ->(ctxmap, basectx) {
    AiTrainingRatesContext.new(ctxmap, basectx)
  }
end
