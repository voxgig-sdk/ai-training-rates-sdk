import { AiTrainingRatesEntityBase } from '../AiTrainingRatesEntityBase';
import type { AiTrainingRatesSDK } from '../AiTrainingRatesSDK';
import type { Control } from '../types';
import type { Organisation, OrganisationListMatch } from '../AiTrainingRatesTypes';
declare class OrganisationEntity extends AiTrainingRatesEntityBase<Organisation> {
    constructor(client: AiTrainingRatesSDK, entopts: any);
    make(this: OrganisationEntity): OrganisationEntity;
    list(this: any, reqmatch?: OrganisationListMatch, ctrl?: Control): Promise<OrganisationEntity[]>;
}
export { OrganisationEntity };
