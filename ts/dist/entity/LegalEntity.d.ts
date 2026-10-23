import { AiTrainingRatesEntityBase } from '../AiTrainingRatesEntityBase';
import type { AiTrainingRatesSDK } from '../AiTrainingRatesSDK';
import type { Control } from '../types';
import type { Legal, LegalListMatch } from '../AiTrainingRatesTypes';
declare class LegalEntity extends AiTrainingRatesEntityBase<Legal> {
    constructor(client: AiTrainingRatesSDK, entopts: any);
    make(this: LegalEntity): LegalEntity;
    list(this: any, reqmatch?: LegalListMatch, ctrl?: Control): Promise<LegalEntity[]>;
}
export { LegalEntity };
