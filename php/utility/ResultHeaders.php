<?php
declare(strict_types=1);

// AiTrainingRates SDK utility: result_headers

class AiTrainingRatesResultHeaders
{
    public static function call(AiTrainingRatesContext $ctx): ?AiTrainingRatesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
