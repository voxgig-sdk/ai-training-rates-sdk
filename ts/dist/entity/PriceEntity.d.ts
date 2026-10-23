import { AiTrainingRatesEntityBase } from '../AiTrainingRatesEntityBase';
import type { AiTrainingRatesSDK } from '../AiTrainingRatesSDK';
import type { Control } from '../types';
import type { Price, PriceListMatch } from '../AiTrainingRatesTypes';
declare class PriceEntity extends AiTrainingRatesEntityBase<Price> {
    constructor(client: AiTrainingRatesSDK, entopts: any);
    make(this: PriceEntity): PriceEntity;
    list(this: any, reqmatch?: PriceListMatch, ctrl?: Control): Promise<PriceEntity[]>;
}
export { PriceEntity };
