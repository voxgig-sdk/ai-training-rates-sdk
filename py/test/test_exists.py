# AiTrainingRates SDK exists test

import pytest
from aitrainingrates_sdk import AiTrainingRatesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AiTrainingRatesSDK.test(None, None)
        assert testsdk is not None
