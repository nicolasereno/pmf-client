import { Action } from '@ngrx/store';
import { Cit, GeoObject, Mask, PaymentList, ProjectData, RemapType, TechSite } from 'src/app/model/model';


export enum UtilityActionTypes {
	LoadCache = '[Utility] Load Cache',
	LoadCacheSuccess = '[Utility] Load Cache Success',
	LoadCacheFailure = '[Utility] Load cache Failure',
	LoadProject = '[Utility] Load Project',
	LoadProjectSuccess = '[Utility] Load Project Success',
	LoadProjectFailure = '[Utility] Load Project Failure',
}

export class LoadCache implements Action {
	readonly type = UtilityActionTypes.LoadCache;
}

export class LoadCacheSuccess implements Action {
	readonly type = UtilityActionTypes.LoadCacheSuccess;
	constructor(public payload: { paymentList: PaymentList[], geoObjects: GeoObject[], maskAnags: Mask[], categories: RemapType[], dataTypes: RemapType[], executors: RemapType[], maskRelationTypes: RemapType[], measurementUnits: RemapType[], questionTypes: RemapType[], techSites: TechSite[], cits: Cit[] }) { }
}

export class LoadCacheFailure implements Action {
	readonly type = UtilityActionTypes.LoadCacheFailure;
	constructor(public payload: string) { }
}

export class LoadProject implements Action {
	readonly type = UtilityActionTypes.LoadProject;
}

export class LoadProjectSuccess implements Action {
	readonly type = UtilityActionTypes.LoadProjectSuccess;
	constructor(public payload: ProjectData) { }
}

export class LoadProjectFailure implements Action {
	readonly type = UtilityActionTypes.LoadProjectFailure;
	constructor(public payload: string) { }
}

export type UtilityActions =
	LoadCache |
	LoadCacheSuccess |
	LoadCacheFailure |
	LoadProject |
	LoadProjectSuccess |
	LoadProjectFailure;
