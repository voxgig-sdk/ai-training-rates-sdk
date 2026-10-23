package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewGuidanceEntityFunc func(client *AiTrainingRatesSDK, entopts map[string]any) AiTrainingRatesEntity

var NewLegalEntityFunc func(client *AiTrainingRatesSDK, entopts map[string]any) AiTrainingRatesEntity

var NewMarketEntityFunc func(client *AiTrainingRatesSDK, entopts map[string]any) AiTrainingRatesEntity

var NewOrganisationEntityFunc func(client *AiTrainingRatesSDK, entopts map[string]any) AiTrainingRatesEntity

var NewPriceEntityFunc func(client *AiTrainingRatesSDK, entopts map[string]any) AiTrainingRatesEntity

