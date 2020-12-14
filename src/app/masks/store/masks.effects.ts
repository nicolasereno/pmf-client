import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BaseResponse, Question } from 'src/app/model/model';
import { environment } from 'src/environments/environment';
import * as masksActions from './masks.actions';


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
					map((c) => {
						// FIXME temporanea...
						const mm = c.body;
						mm.forEach(q => {
							delete q['operationType'];
							delete q['patch'];
							delete q['reallyMod'];
							q.answers.forEach(a => {
								delete a['operationType'];
								delete a['patch'];
								delete a['reallyMod'];
							});
						});
						return new masksActions.LoadQuestionsAnswersSuccess(mm);
					}),
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
