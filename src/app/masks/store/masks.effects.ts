import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MaskAnagsControllerService } from '@enel/pmf-mock-be';
import { MaskStructureService } from '@enel/pmf-be';

import * as masksActions from './masks.actions';


@Injectable()
export class MasksEffects {

	error = $localize`:@@masksEffects-error:ERRORE`;
	info = $localize`:@@masksEffects-info:INFORMAZIONE`;

	errorLoadMaskAnags = $localize`:@@masksEffects-errorLoadMaskAnags:Errore nel caricamento dei dati delle maschere`;

	@Effect()
	loadMaskAnags$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadMaskAnags),
		map((action: masksActions.LoadMaskAnags) => action.payload),
		mergeMap(() =>
			this.proxy.getAllMasksUsingGET().pipe(
				map(c => new masksActions.LoadMaskAnagsSuccess(c['body'])),
				catchError(err => {
					this.snackBar.open(this.errorLoadMaskAnags, this.error, { duration: 5000, })
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
					this.snackBar.open(this.errorLoadQuestionsAnswers, this.error, { duration: 5000, })
					return of(new masksActions.LoadQuestionsAnswersFailure(err.statusText));
				})
			)
		)
	)

	errorLoadMetricCalculations = $localize`:@@masksEffects-errorLoadMetricCalculations:Errore nel caricamento delle prestazioni`;
	noMetricCalculationsFound = $localize`:@@masksEffects-noMetricCalculationsFound:Nessun Codice Prestazione / Materiale / Ore ED associato alla risposta`;

	@Effect()
	loadMetricCalculations$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadMetricCalculations),
		map((action: masksActions.LoadMetricCalculations) => action.payload),
		mergeMap((id) =>
			this.proxy.getMetricCalculationsOfAnswerUsingGET(id).pipe(
				map(c => {
					if (c.length == 0)
						this.snackBar.open(this.noMetricCalculationsFound, this.info, { duration: 2000, })
					return new masksActions.LoadMetricCalculationsSuccess(c['body']);
				}),
				catchError(err => {
					this.snackBar.open(this.errorLoadMetricCalculations, this.error, { duration: 5000, })
					return of(new masksActions.LoadMetricCalculationsFailure(err.statusText));
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
