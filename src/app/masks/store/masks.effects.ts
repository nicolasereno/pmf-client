import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as masksActions from './masks.actions';
import { BaseResponse, Question } from 'src/app/model/model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class MasksEffects {

	error = $localize`:@@masksEffects-error:ERRORE`;
	info = $localize`:@@masksEffects-info:INFORMAZIONE`;

	errorLoadQuestionsAnswers = $localize`:@@masksEffects-errorLoadQuestionsAnswers:Errore nel caricamento di domande e risposte`;

	@Effect()
	loadQuestionsAnswers$: Observable<Action> = this.actions$.pipe(
		ofType(masksActions.MasksActionTypes.LoadQuestionsAnswers),
		map((action: masksActions.LoadQuestionsAnswers) => action.payload),
		mergeMap((id) =>
			this.http.get<BaseResponse<Question[]>>(environment.baseUrl + 'maskStructure/getQuestionAndAnswerOfMask',
				{ params: new HttpParams().append('maskId', '' + id) }).pipe(
					map((c) => new masksActions.LoadQuestionsAnswersSuccess(c['body'] as Question[])),
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
			this.http.get<BaseResponse<Question[]>>(environment.baseUrl + 'maskStructure/getMetricCalculationsOfAnswer',
				{ params: new HttpParams().append('answerCode', '' + id) }).pipe(
					map(c => {
						if (c.body.length == 0)
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
		private http: HttpClient,
		private snackBar: MatSnackBar,
	) { }

}
