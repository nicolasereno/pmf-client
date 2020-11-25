import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMasks from './masks.reducer';

export const selectMasksState = createFeatureSelector<fromMasks.State>(
	fromMasks.masksFeatureKey
);

export const getMaskAnags = createSelector(
	selectMasksState,
	state => state.maskAnags
);

export const getQuestionsAnswers = createSelector(
	selectMasksState,
	state => state.questionsAnswers
);

export const getMetricCalculations = createSelector(
	selectMasksState,
	state => state.metricCalculations
);

export const getLoading = createSelector(
	selectMasksState,
	state => state.loading
);

export const getError = createSelector(
	selectMasksState,
	state => state.error
);