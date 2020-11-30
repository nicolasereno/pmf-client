import { UtilityActions, UtilityActionTypes } from './utility.actions';

import { PaymentList, GeoObjectResponse, MaskResponse, RemapType, TechSite } from '@enel/pmf-be';

export const utilityFeatureKey = 'utility';

export interface State {
	cache: {
		paymentLists: PaymentList[],
		geoObjects: GeoObjectResponse[],
		maskAnags: MaskResponse[],
		maskRelationTypes: RemapType[],
		techSites: TechSite[],
	},
	error: string,
	loading: boolean,
}

export const initialState: State = {
	cache: {
		paymentLists: null,
		geoObjects: null,
		maskAnags: null,
		maskRelationTypes: null,
		techSites: null,
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
					maskRelationTypes: null,
					techSites: null,
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
					maskRelationTypes: action.payload.maskRelationTypes,
					techSites: action.payload.techSites,
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
