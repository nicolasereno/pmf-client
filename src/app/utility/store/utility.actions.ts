import { Action } from '@ngrx/store';

import { GeoObjectResponse, PaymentList } from '@enel/pmf-be';

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
	constructor(public payload: { paymentList: PaymentList[], geoObjects: GeoObjectResponse[] }) { }
}

export class LoadCacheFailure implements Action {
	readonly type = UtilityActionTypes.LoadCacheFailure;
	constructor(public payload: string) { }
}

export type UtilityActions =
	LoadCache |
	LoadCacheSuccess |
	LoadCacheFailure;
