<?php
declare(strict_types=1);

// AiTrainingRates SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AiTrainingRatesMakeContext
{
    public static function call(array $ctxmap, ?AiTrainingRatesContext $basectx): AiTrainingRatesContext
    {
        return new AiTrainingRatesContext($ctxmap, $basectx);
    }
}
