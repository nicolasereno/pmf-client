import { Action } from '@ngrx/store';

import { MaskResponse, QuestionWithAnswerResponse } from '@enel/pmf-be';
import { MetricCalculation } from '@enel/pmf-mock-be';

export enum MasksActionTypes {
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

export class LoadMaskAnags implements Action {
	readonly type = MasksActionTypes.LoadMaskAnags;
	constructor(public payload: number) { }
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
	LoadMaskAnags |
	LoadMaskAnagsSuccess |
	LoadMaskAnagsFailure |
	LoadQuestionsAnswers |
	LoadQuestionsAnswersSuccess |
	LoadQuestionsAnswersFailure |
	LoadMetricCalculations |
	LoadMetricCalculationsSuccess |
	LoadMetricCalculationsFailure;
