import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUtility from './utility.reducer';


export const selectUtilityState = createFeatureSelector<fromUtility.State>(
	fromUtility.utilityFeatureKey
);

export const getGeoObjects = createSelector(
	selectUtilityState,
	state => state.cache.geoObjects
);

export const getMaskAnags = createSelector(
	selectUtilityState,
	state => state.cache.maskAnags
);

export const getPaymentLists = createSelector(
	selectUtilityState,
	state => state.cache.paymentLists
);

export const getMaskRelationTypes = createSelector(
	selectUtilityState,
	state => state.cache.maskRelationTypes
);

export const getExecutors = createSelector(
	selectUtilityState,
	state => state.cache.executors
);

export const getCategories = createSelector(
	selectUtilityState,
	state => state.cache.categories
);

export const getDataTypes = createSelector(
	selectUtilityState,
	state => state.cache.dataTypes
);

export const getMeasurementUnits = createSelector(
	selectUtilityState,
	state => state.cache.measurementUnits
);

export const getQuestionTypes = createSelector(
	selectUtilityState,
	state => state.cache.questionTypes
);

export const getTechSites = createSelector(
	selectUtilityState,
	state => state.cache.techSites
);

export const getCits = createSelector(
	selectUtilityState,
	state => state.cache.cits
);

