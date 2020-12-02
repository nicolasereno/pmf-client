import { Action } from '@ngrx/store';
import { Question, MetricCalculation } from 'src/app/model/model';


export enum MasksActionTypes {
	LoadQuestionsAnswers = '[Masks] Load Questions Answers',
	LoadQuestionsAnswersSuccess = '[Masks] Load Questions Answers Success',
	LoadQuestionsAnswersFailure = '[Masks] Load Questions Answers Failure',
	LoadMetricCalculations = '[Masks] Load Metric Calculations',
	LoadMetricCalculationsSuccess = '[Masks] Load Metric Calculations Success',
	LoadMetricCalculationsFailure = '[Masks] Load Metric Calculations Failure',
}

export class LoadQuestionsAnswers implements Action {
	readonly type = MasksActionTypes.LoadQuestionsAnswers;
	constructor(public payload: number) { }
}

export class LoadQuestionsAnswersSuccess implements Action {
	readonly type = MasksActionTypes.LoadQuestionsAnswersSuccess;
	constructor(public payload: Question[]) { }
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
	LoadQuestionsAnswers |
	LoadQuestionsAnswersSuccess |
	LoadQuestionsAnswersFailure |
	LoadMetricCalculations |
	LoadMetricCalculationsSuccess |
	LoadMetricCalculationsFailure;
