
import { MasksActions, MasksActionTypes } from './masks.actions';
import { GeoObjectDTO, QuestionWithAnswerDTO, MaskResponse } from '@enel/pmf-be';

export const masksFeatureKey = 'masks';

export interface State {
	geoObjects: GeoObjectDTO[],
	maskAnags: MaskResponse[],
	questionsAnswers: QuestionWithAnswerDTO[],
	error: string,
	loading: boolean,
}

export const initialState: State = {
	geoObjects: [],
	maskAnags: [],
	questionsAnswers: [],
	error: null,
	loading: false,
};

export function reducer(state = initialState, action: MasksActions): State {
	switch (action.type) {

		case MasksActionTypes.LoadGeoObjects:
			return {
				...state,
				loading: true,
				error: null,
				geoObjects: []
			};
		case MasksActionTypes.LoadGeoObjectsSuccess:
			return {
				...state,
				loading: false,
				geoObjects: action.payload
			};
		case MasksActionTypes.LoadGeoObjectsFailure:
			return {
				...state,
				loading: false,
				error: action.payload
			};
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
		default:
			return state;
	}
}
