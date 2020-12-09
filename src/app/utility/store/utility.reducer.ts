import { Cit, GeoObject, Mask, PaymentList, RemapType, TechSite } from 'src/app/model/model';
import { UtilityActions, UtilityActionTypes } from './utility.actions';


export const utilityFeatureKey = 'utility';

export interface State {
	cache: {
		paymentLists: PaymentList[],
		geoObjects: GeoObject[],
		maskAnags: Mask[],
		categories: RemapType[],
		dataTypes: RemapType[],
		executors: RemapType[],
		maskRelationTypes: RemapType[],
		measurementUnits: RemapType[],
		questionTypes: RemapType[],
		techSites: TechSite[],
		cits: Cit[],
	},
	error: string,
	loading: boolean,
}

export const initialState: State = {
	cache: {
		paymentLists: null,
		geoObjects: null,
		maskAnags: null,
		categories: null,
		dataTypes: null,
		executors: null,
		maskRelationTypes: null,
		measurementUnits: null,
		questionTypes: null,
		techSites: null,
		cits: null,
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
					categories: null,
					dataTypes: null,
					executors: null,
					maskRelationTypes: null,
					measurementUnits: null,
					questionTypes: null,
					techSites: null,
					cits: null,
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
					categories: action.payload.categories,
					dataTypes: action.payload.dataTypes,
					executors: action.payload.executors,
					maskRelationTypes: action.payload.maskRelationTypes,
					measurementUnits: action.payload.measurementUnits,
					questionTypes: action.payload.questionTypes,
					techSites: action.payload.techSites,
					cits: action.payload.cits,
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
