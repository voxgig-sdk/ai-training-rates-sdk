# AiTrainingRates SDK utility: make_context

from aitrainingrates_sdk.core.context import AiTrainingRatesContext


def make_context_util(ctxmap, basectx):
    return AiTrainingRatesContext(ctxmap, basectx)
