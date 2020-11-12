import { Action } from '@ngrx/store';
import { GeoObject, MaskAnag } from '@enel/pmf-mock-be';

export enum MasksActionTypes {
	LoadGeoObjects = '[Masks] Load Geo Objects',
	LoadGeoObjectsSuccess = '[Masks] Load Geo Objects Success',
	LoadGeoObjectsFailure = '[Masks] Load Geo Objects Failure',
	LoadMaskAnags = '[Masks] Load Mask Anags',
	LoadMaskAnagsSuccess = '[Masks] Load Mask Anags Success',
	LoadMaskAnagsFailure = '[Masks] Load Mask Anags Failure',
}

export class LoadGeoObjects implements Action {
	readonly type = MasksActionTypes.LoadGeoObjects;
	constructor(public payload: string) { }
}

export class LoadGeoObjectsSuccess implements Action {
	readonly type = MasksActionTypes.LoadGeoObjectsSuccess;
	constructor(public payload: GeoObject[]) { }
}

export class LoadGeoObjectsFailure implements Action {
	readonly type = MasksActionTypes.LoadGeoObjectsFailure;
	constructor(public payload: string) { }
}

export class LoadMaskAnags implements Action {
	readonly type = MasksActionTypes.LoadMaskAnags;
	constructor(public payload: string) { }
}

export class LoadMaskAnagsSuccess implements Action {
	readonly type = MasksActionTypes.LoadMaskAnagsSuccess;
	constructor(public payload: MaskAnag[]) { }
}

export class LoadMaskAnagsFailure implements Action {
	readonly type = MasksActionTypes.LoadMaskAnagsFailure;
	constructor(public payload: string) { }
}
export type MasksActions =
	LoadGeoObjects |
	LoadGeoObjectsSuccess |
	LoadGeoObjectsFailure |
	LoadMaskAnags |
	LoadMaskAnagsSuccess |
	LoadMaskAnagsFailure;
