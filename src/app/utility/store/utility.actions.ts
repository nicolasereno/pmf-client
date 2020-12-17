import { Action } from '@ngrx/store';
import { Cit, GeoObject, Mask, PaymentList, ProjectData, RemapType, TechSite, _GeoObject, _Mask } from 'src/app/model/model';


export enum UtilityActionTypes {
	LoadCache = '[Utility] Load Cache',
	LoadCacheSuccess = '[Utility] Load Cache Success',
	LoadCacheFailure = '[Utility] Load cache Failure',
	LoadProject = '[Utility] Load Project',
	LoadProjectSuccess = '[Utility] Load Project Success',
	LoadProjectFailure = '[Utility] Load Project Failure',
	MergeMaskEdits = '[Utility] Merge Mask Edits',
	MergeMaskEditsSuccess = '[Utility] Merge Mask Edits Success',
	MergeMaskEditsFailure = '[Utility] Merge Mask Edits Failure',
	MergeGeoObjectEdits = '[Utility] Merge GeoObject Edits',
	MergeGeoObjectEditsSuccess = '[Utility] Merge GeoObject Edits Success',
	MergeGeoObjectEditsFailure = '[Utility] Merge GeoObject Edits Failure',
	UndoEdits = '[Utility] Undo Edits',
	UndoEditsSuccess = '[Utility] Undo Edits Success',
	UndoEditsFailure = '[Utility] Undo Edits Failure',
}

export class LoadCache implements Action {
	readonly type = UtilityActionTypes.LoadCache;
}

export class LoadCacheSuccess implements Action {
	readonly type = UtilityActionTypes.LoadCacheSuccess;
	constructor(public payload: { paymentList: PaymentList[], geoObjects: GeoObject[], maskAnags: Mask[], categories: RemapType[], dataTypes: RemapType[], executors: RemapType[], maskRelationTypes: RemapType[], measurementUnits: RemapType[], questionTypes: RemapType[], techSites: TechSite[], cits: Cit[], metricCalculationsAnswerCodes: string[] }) { }
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

export class MergeMaskEdits implements Action {
	readonly type = UtilityActionTypes.MergeMaskEdits;
	constructor(public payload: _Mask) { }
}

export class MergeMaskEditsSuccess implements Action {
	readonly type = UtilityActionTypes.MergeMaskEditsSuccess;
	constructor(public payload: { patch: string, projectData: ProjectData }) { }
}

export class MergeMaskEditsFailure implements Action {
	readonly type = UtilityActionTypes.MergeMaskEditsFailure;
	constructor(public payload: string) { }
}

export class MergeGeoObjectEdits implements Action {
	readonly type = UtilityActionTypes.MergeGeoObjectEdits;
	constructor(public payload: _GeoObject) { }
}

export class MergeGeoObjectEditsSuccess implements Action {
	readonly type = UtilityActionTypes.MergeGeoObjectEditsSuccess;
	constructor(public payload: { patch: string, projectData: ProjectData }) { }
}

export class MergeGeoObjectEditsFailure implements Action {
	readonly type = UtilityActionTypes.MergeGeoObjectEditsFailure;
	constructor(public payload: string) { }
}

export class UndoEdits implements Action {
	readonly type = UtilityActionTypes.UndoEdits;
	constructor(public payload: { type: 'Mask' | 'GeoObject', code: string }) { }
}

export class UndoEditsSuccess implements Action {
	readonly type = UtilityActionTypes.UndoEditsSuccess;
	constructor(public payload: ProjectData) { }
}

export class UndoEditsFailure implements Action {
	readonly type = UtilityActionTypes.UndoEditsFailure;
	constructor(public payload: string) { }
}

export type UtilityActions =
	LoadCache |
	LoadCacheSuccess |
	LoadCacheFailure |
	LoadProject |
	LoadProjectSuccess |
	LoadProjectFailure |
	MergeMaskEdits |
	MergeMaskEditsSuccess |
	MergeMaskEditsFailure |
	MergeGeoObjectEdits |
	MergeGeoObjectEditsSuccess |
	MergeGeoObjectEditsFailure |
	UndoEdits |
	UndoEditsSuccess |
	UndoEditsFailure;
