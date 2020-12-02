import { Action } from '@ngrx/store';
import { PaymentList, GeoObject, Mask, RemapType, TechSite } from 'src/app/model/model';

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
	constructor(public payload: { paymentList: PaymentList[], geoObjects: GeoObject[], maskAnags: Mask[], categories: RemapType[], dataTypes: RemapType[], executors: RemapType[], maskRelationTypes: RemapType[], measurementUnits: RemapType[], questionTypes: RemapType[], techSites: TechSite[] }) { }
}

export class LoadCacheFailure implements Action {
	readonly type = UtilityActionTypes.LoadCacheFailure;
	constructor(public payload: string) { }
}

export type UtilityActions =
	LoadCache |
	LoadCacheSuccess |
	LoadCacheFailure;
