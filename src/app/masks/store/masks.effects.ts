import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MaskAnagsControllerService } from '@enel/pmf-mock-be';

import { MaskStructureService, GeoObjectDTO } from '@enel/pmf-be';

import * as masksActions from './masks.actions';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class MasksEffects {

	error = $localize`:@@masksEffects-error:ERRORE`;
	
	errorLoadGeoObjects = $localize`:@@masksEffects-errorLoadGeoObjects:Errore nel caricamento dei dati degli elementi di rete`;

	@Effect()
	loadGeoObjects$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadGeoObjects),
		map((action: masksActions.LoadGeoObjects) => action.payload),
		mergeMap(() =>
			this.proxy.getAllGeoObjecsAndMasksUsingGET().pipe(
				map(c => new masksActions.LoadGeoObjectsSuccess(c['body'].sort((a: GeoObjectDTO, b: GeoObjectDTO) => a.qgoDescription.localeCompare(b.qgoDescription)))),
				catchError(err => {
					this.snackBar.open(this.errorLoadGeoObjects, this.error, { duration: 2000, })
					return of(new masksActions.LoadGeoObjectsFailure(err.statusText));
				})
			)
		)
	)

	errorLoadMaskAnags = $localize`:@@masksEffects-errorLoadMaskAnags:Errore nel caricamento dei dati delle maschere`;

	@Effect()
	loadMaskAnags$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadMaskAnags),
		map((action: masksActions.LoadMaskAnags) => action.payload),
		mergeMap(() =>
			this.proxy.getAllMasksUsingGET().pipe(
				map(c => new masksActions.LoadMaskAnagsSuccess(c['body'])),
				catchError(err => {
					this.snackBar.open(this.errorLoadMaskAnags, this.error, { duration: 2000, })
					return of(new masksActions.LoadMaskAnagsFailure(err.statusText));
				})
			)
		)
	)

	errorLoadQuestionsAnswers = $localize`:@@masksEffects-errorLoadQuestionsAnswers:Errore nel caricamento di domande e risposte`;

	@Effect()
	loadQuestionsAnswers$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadQuestionsAnswers),
		map((action: masksActions.LoadQuestionsAnswers) => action.payload),
		mergeMap((id) =>
			this.proxy.getQuestionAndAnswerOfMaskUsingGET(id).pipe(
				map(c => new masksActions.LoadQuestionsAnswersSuccess(c['body'])),
				catchError(err => {
					this.snackBar.open(this.errorLoadQuestionsAnswers, this.error, { duration: 2000, })
					return of(new masksActions.LoadQuestionsAnswersFailure(err.statusText));
				})
			)
		)
	)

	constructor(
		private actions$: Actions,
		private proxy: MaskStructureService,
		private proxyMA: MaskAnagsControllerService,
		private snackBar: MatSnackBar,
	) { }
}
