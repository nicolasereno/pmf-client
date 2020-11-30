import { Action } from '@ngrx/store';

import { GeoObjectResponse, PaymentList, MaskResponse, TechSite } from '@enel/pmf-be';
import { MaskRelationType } from '@enel/pmf-mock-be';

export enum UtilityActionTypes {
	LoadCache = '[Utility] Load Payment Lists',
	LoadCacheSuccess = '[Utility] Load Cache Success',
	LoadCacheFailure = '[Utility] Load cache Failure',
}

export class LoadCache implements Action {
	readonly type = UtilityActionTypes.LoadCache;
}

export class LoadCacheSuccess implements Action {
	readonly type = UtilityActionTypes.LoadCacheSuccess;
	constructor(public payload: { paymentList: PaymentList[], geoObjects: GeoObjectResponse[], maskAnags: MaskResponse[], maskRelationTypes: MaskRelationType[], techSites: TechSite[] }) { }
}

export class LoadCacheFailure implements Action {
	readonly type = UtilityActionTypes.LoadCacheFailure;
	constructor(public payload: string) { }
}

export type UtilityActions =
	LoadCache |
	LoadCacheSuccess |
	LoadCacheFailure;
