import { Action } from '@ngrx/store';
import { GeoObjectDTO, QuestionWithAnswerDTO, MaskResponse } from '@enel/pmf-be';

export enum MasksActionTypes {
	LoadGeoObjects = '[Masks] Load Geo Objects',
	LoadGeoObjectsSuccess = '[Masks] Load Geo Objects Success',
	LoadGeoObjectsFailure = '[Masks] Load Geo Objects Failure',
	LoadMaskAnags = '[Masks] Load Mask Anags',
	LoadMaskAnagsSuccess = '[Masks] Load Mask Anags Success',
	LoadMaskAnagsFailure = '[Masks] Load Mask Anags Failure',

	LoadQuestionsAnswers = '[Masks] Load Questions Answers',
	LoadQuestionsAnswersSuccess = '[Masks] Load Questions Answers Success',
	LoadQuestionsAnswersFailure = '[Masks] Load Questions Answers Failure',
}

export class LoadGeoObjects implements Action {
	readonly type = MasksActionTypes.LoadGeoObjects;
	constructor(public payload: string) { }
}

export class LoadGeoObjectsSuccess implements Action {
	readonly type = MasksActionTypes.LoadGeoObjectsSuccess;
	constructor(public payload: GeoObjectDTO[]) { }
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
	constructor(public payload: MaskResponse[]) { }
}

export class LoadMaskAnagsFailure implements Action {
	readonly type = MasksActionTypes.LoadMaskAnagsFailure;
	constructor(public payload: string) { }
}

export class LoadQuestionsAnswers implements Action {
	readonly type = MasksActionTypes.LoadQuestionsAnswers;
	constructor(public payload: number) { }
}

export class LoadQuestionsAnswersSuccess implements Action {
	readonly type = MasksActionTypes.LoadQuestionsAnswersSuccess;
	constructor(public payload: QuestionWithAnswerDTO[]) { }
}

export class LoadQuestionsAnswersFailure implements Action {
	readonly type = MasksActionTypes.LoadQuestionsAnswersFailure;
	constructor(public payload: string) { }
}

export type MasksActions =
	LoadGeoObjects |
	LoadGeoObjectsSuccess |
	LoadGeoObjectsFailure |
	LoadMaskAnags |
	LoadMaskAnagsSuccess |
	LoadMaskAnagsFailure |
	LoadQuestionsAnswers |
	LoadQuestionsAnswersSuccess |
	LoadQuestionsAnswersFailure;
