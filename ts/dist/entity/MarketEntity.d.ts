import { AiTrainingRatesEntityBase } from '../AiTrainingRatesEntityBase';
import type { AiTrainingRatesSDK } from '../AiTrainingRatesSDK';
import type { Control } from '../types';
import type { Market, MarketListMatch } from '../AiTrainingRatesTypes';
declare class MarketEntity extends AiTrainingRatesEntityBase<Market> {
    constructor(client: AiTrainingRatesSDK, entopts: any);
    make(this: MarketEntity): MarketEntity;
    list(this: any, reqmatch?: MarketListMatch, ctrl?: Control): Promise<MarketEntity[]>;
}
export { MarketEntity };
