import { AiTrainingRatesEntityBase } from '../AiTrainingRatesEntityBase';
import type { AiTrainingRatesSDK } from '../AiTrainingRatesSDK';
import type { Control } from '../types';
import type { Guidance, GuidanceListMatch } from '../AiTrainingRatesTypes';
declare class GuidanceEntity extends AiTrainingRatesEntityBase<Guidance> {
    constructor(client: AiTrainingRatesSDK, entopts: any);
    make(this: GuidanceEntity): GuidanceEntity;
    list(this: any, reqmatch?: GuidanceListMatch, ctrl?: Control): Promise<GuidanceEntity[]>;
}
export { GuidanceEntity };
