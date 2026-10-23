# AiTrainingRates SDK feature factory

from aitrainingrates_sdk.feature.base_feature import AiTrainingRatesBaseFeature
from aitrainingrates_sdk.feature.ratelimit_feature import AiTrainingRatesRatelimitFeature
from aitrainingrates_sdk.feature.retry_feature import AiTrainingRatesRetryFeature
from aitrainingrates_sdk.feature.test_feature import AiTrainingRatesTestFeature
from aitrainingrates_sdk.feature.timeout_feature import AiTrainingRatesTimeoutFeature


_FEATURES = {
    "base": lambda: AiTrainingRatesBaseFeature(),
    "ratelimit": lambda: AiTrainingRatesRatelimitFeature(),
    "retry": lambda: AiTrainingRatesRetryFeature(),
    "test": lambda: AiTrainingRatesTestFeature(),
    "timeout": lambda: AiTrainingRatesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
