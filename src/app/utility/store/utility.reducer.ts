import { UtilityActions, UtilityActionTypes } from './utility.actions';

import { PaymentList, GeoObjectResponse, MaskResponse } from '@enel/pmf-be';

export const utilityFeatureKey = 'utility';

export interface State {
	cache: {
		paymentLists: PaymentList[],
		geoObjects: GeoObjectResponse[],
		maskAnags: MaskResponse[],
	},
	error: string,
	loading: boolean,
}

export const initialState: State = {
	cache: {
		paymentLists: null,
		geoObjects: null,
		maskAnags: null,
	},
	error: null,
	loading: false,
};

export function reducer(state = initialState, action: UtilityActions): State {
	switch (action.type) {
		case UtilityActionTypes.LoadCache:
			return {
				...state,
				error: null,
				cache: {
					paymentLists: null,
					geoObjects: null,
					maskAnags: null,
				},
				loading: true
			};
		case UtilityActionTypes.LoadCacheSuccess:
			return {
				...state,
				cache: {
					paymentLists: action.payload.paymentList,
					geoObjects: action.payload.geoObjects,
					maskAnags: action.payload.maskAnags,
				},
				loading: false
			};
		case UtilityActionTypes.LoadCacheFailure:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
