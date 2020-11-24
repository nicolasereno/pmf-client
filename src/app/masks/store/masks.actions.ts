import { Action } from '@ngrx/store';
import { MaskResponse } from '@enel/pmf-be';
import { MetricCalculation } from '@enel/pmf-mock-be/model/metricCalculation';
import { QuestionWithAnswerResponse } from '@enel/pmf-be/model/questionWithAnswerResponse';
import { GeoObjectResponse } from '@enel/pmf-be/model/geoObjectResponse';

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
	LoadMetricCalculations = '[Masks] Load Metric Calculations',
	LoadMetricCalculationsSuccess = '[Masks] Load Metric Calculations Success',
	LoadMetricCalculationsFailure = '[Masks] Load Metric Calculations Failure',
}

export class LoadGeoObjects implements Action {
	readonly type = MasksActionTypes.LoadGeoObjects;
	constructor(public payload: string) { }
}

export class LoadGeoObjectsSuccess implements Action {
	readonly type = MasksActionTypes.LoadGeoObjectsSuccess;
	constructor(public payload: GeoObjectResponse[]) { }
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
	constructor(public payload: QuestionWithAnswerResponse[]) { }
}

export class LoadQuestionsAnswersFailure implements Action {
	readonly type = MasksActionTypes.LoadQuestionsAnswersFailure;
	constructor(public payload: string) { }
}

export class LoadMetricCalculations implements Action {
	readonly type = MasksActionTypes.LoadMetricCalculations;
	constructor(public payload: string) { }
}

export class LoadMetricCalculationsSuccess implements Action {
	readonly type = MasksActionTypes.LoadMetricCalculationsSuccess;
	constructor(public payload: MetricCalculation[]) { }
}

export class LoadMetricCalculationsFailure implements Action {
	readonly type = MasksActionTypes.LoadMetricCalculationsFailure;
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
	LoadQuestionsAnswersFailure |
	LoadMetricCalculations |
	LoadMetricCalculationsSuccess |
	LoadMetricCalculationsFailure;
