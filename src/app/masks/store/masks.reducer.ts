import { MetricCalculation, Question } from 'src/app/model/model';
import { MasksActions, MasksActionTypes } from './masks.actions';


export const masksFeatureKey = 'masks';

export interface State {
	questionsAnswers: Question[],
	metricCalculations: MetricCalculation[],
	error: string,
	loading: boolean,
}

export const initialState: State = {
	questionsAnswers: null,
	metricCalculations: null,
	error: null,
	loading: false,
};

export function reducer(state = initialState, action: MasksActions): State {
	switch (action.type) {
		case MasksActionTypes.LoadQuestionsAnswers:
			return {
				...state,
				loading: true,
				error: null,
				questionsAnswers: null
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
				metricCalculations: null
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
