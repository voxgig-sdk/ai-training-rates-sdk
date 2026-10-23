# AiTrainingRates SDK utility: prepare_body
require_relative 'media'
module AiTrainingRatesUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AiTrainingRatesUtilities.raw_body(ctx.reqdata) if AiTrainingRatesUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
