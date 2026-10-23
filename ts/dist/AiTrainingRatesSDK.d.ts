import { GuidanceEntity } from './entity/GuidanceEntity';
import { LegalEntity } from './entity/LegalEntity';
import { MarketEntity } from './entity/MarketEntity';
import { OrganisationEntity } from './entity/OrganisationEntity';
import { PriceEntity } from './entity/PriceEntity';
export type * from './AiTrainingRatesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AiTrainingRatesEntityBase } from './AiTrainingRatesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AiTrainingRatesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Guidance(entopts?: Record<string, any>): GuidanceEntity;
    Legal(entopts?: Record<string, any>): LegalEntity;
    Market(entopts?: Record<string, any>): MarketEntity;
    Organisation(entopts?: Record<string, any>): OrganisationEntity;
    Price(entopts?: Record<string, any>): PriceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AiTrainingRatesSDK;
    tester(testopts?: any, sdkopts?: any): AiTrainingRatesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AiTrainingRatesSDK;
export { stdutil, config, BaseFeature, AiTrainingRatesEntityBase, AiTrainingRatesSDK, SDK, };
export type { DirectResult };
