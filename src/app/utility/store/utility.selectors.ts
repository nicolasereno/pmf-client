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
