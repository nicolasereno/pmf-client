import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MaskAnagsControllerService } from '@enel/pmf-mock-be';

import { MaskStructureService, GeoObjectDTO } from '@enel/pmf-be';

import * as masksActions from './masks.actions';


@Injectable()
export class MasksEffects {

	@Effect()
	loadGeoObjects$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadGeoObjects),
		map((action: masksActions.LoadGeoObjects) => action.payload),
		mergeMap(() =>
			this.proxy.getAllGeoObjecsAndMasksUsingGET().pipe(
				map(c => new masksActions.LoadGeoObjectsSuccess(c['body'].sort((a: GeoObjectDTO, b: GeoObjectDTO) => a.qgoDescription.localeCompare(b.qgoDescription)))),
				catchError(err => of(new masksActions.LoadGeoObjectsFailure(err.statusText)))
			)
		)
	)

	@Effect()
	loadMaskAnags$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadMaskAnags),
		map((action: masksActions.LoadMaskAnags) => action.payload),
		mergeMap(() =>
			this.proxy.getAllMasksUsingGET().pipe(
				map(c => new masksActions.LoadMaskAnagsSuccess(c['body'])),
				catchError(err => of(new masksActions.LoadMaskAnagsFailure(err.statusText)))
			)
		)
	)

	@Effect()
	loadQuestionsAnswers$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadQuestionsAnswers),
		map((action: masksActions.LoadQuestionsAnswers) => action.payload),
		mergeMap((id) =>
			this.proxyMA.getQuestionsAndAnswers(id).pipe(
				map(c => new masksActions.LoadQuestionsAnswersSuccess(c)),
				catchError(err => of(new masksActions.LoadQuestionsAnswersFailure(err.statusText)))
			)
		)
	)

	constructor(
		private actions$: Actions,
		private proxy: MaskStructureService,
		private proxyMA: MaskAnagsControllerService,
	) { }
}
