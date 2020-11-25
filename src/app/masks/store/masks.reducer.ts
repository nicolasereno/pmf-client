import { MasksActions, MasksActionTypes } from './masks.actions';

import { MaskResponse, QuestionWithAnswerResponse, MetricCalculationsResponse } from '@enel/pmf-be';

export const masksFeatureKey = 'masks';

export interface State {
	maskAnags: MaskResponse[],
	questionsAnswers: QuestionWithAnswerResponse[],
	metricCalculations: MetricCalculationsResponse[],
	error: string,
	loading: boolean,
}

export const initialState: State = {
	maskAnags: [],
	questionsAnswers: [],
	metricCalculations: [],
	error: null,
	loading: false,
};

export function reducer(state = initialState, action: MasksActions): State {
	switch (action.type) {
		case MasksActionTypes.LoadMaskAnags:
			return {
				...state,
				loading: true,
				error: null,
				maskAnags: []
			};
		case MasksActionTypes.LoadMaskAnagsSuccess:
			return {
				...state,
				loading: false,
				maskAnags: action.payload
			};
		case MasksActionTypes.LoadMaskAnagsFailure:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case MasksActionTypes.LoadQuestionsAnswers:
			return {
				...state,
				loading: true,
				error: null,
				questionsAnswers: []
			};
		case MasksActionTypes.LoadQuestionsAnswersSuccess:
			return {
				...state,
				loading: false,
				questionsAnswers: action.payload
			};
		case MasksActionTypes.LoadQuestionsAnswersFailure:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case MasksActionTypes.LoadMetricCalculations:
			return {
				...state,
				loading: true,
				error: null,
				metricCalculations: []
			};
		case MasksActionTypes.LoadMetricCalculationsSuccess:
			return {
				...state,
				loading: false,
				metricCalculations: action.payload
			};
		case MasksActionTypes.LoadMetricCalculationsFailure:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
}
