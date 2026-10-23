package voxgigaitrainingratessdk

import (
	"github.com/voxgig-sdk/ai-training-rates-sdk/go/core"
	"github.com/voxgig-sdk/ai-training-rates-sdk/go/entity"
	"github.com/voxgig-sdk/ai-training-rates-sdk/go/feature"
	_ "github.com/voxgig-sdk/ai-training-rates-sdk/go/utility"
)

// Type aliases preserve external API.
type AiTrainingRatesSDK = core.AiTrainingRatesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AiTrainingRatesEntity = core.AiTrainingRatesEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AiTrainingRatesError = core.AiTrainingRatesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewGuidanceEntityFunc = func(client *core.AiTrainingRatesSDK, entopts map[string]any) core.AiTrainingRatesEntity {
		return entity.NewGuidanceEntity(client, entopts)
	}
	core.NewLegalEntityFunc = func(client *core.AiTrainingRatesSDK, entopts map[string]any) core.AiTrainingRatesEntity {
		return entity.NewLegalEntity(client, entopts)
	}
	core.NewMarketEntityFunc = func(client *core.AiTrainingRatesSDK, entopts map[string]any) core.AiTrainingRatesEntity {
		return entity.NewMarketEntity(client, entopts)
	}
	core.NewOrganisationEntityFunc = func(client *core.AiTrainingRatesSDK, entopts map[string]any) core.AiTrainingRatesEntity {
		return entity.NewOrganisationEntity(client, entopts)
	}
	core.NewPriceEntityFunc = func(client *core.AiTrainingRatesSDK, entopts map[string]any) core.AiTrainingRatesEntity {
		return entity.NewPriceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAiTrainingRatesSDK = core.NewAiTrainingRatesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAiTrainingRatesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AiTrainingRatesSDK  { return NewAiTrainingRatesSDK(nil) }
func Test() *AiTrainingRatesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
