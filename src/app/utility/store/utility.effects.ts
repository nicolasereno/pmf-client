import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as utilityActions from './utility.actions';
import { UtilityActions } from './utility.actions';
import { HttpClient } from '@angular/common/http';

import { BaseResponse, GeoObject, Mask, RemapType, PaymentList, TechSite } from 'src/app/model/model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UtilityEffects implements OnInitEffects {

	ngrxOnInitEffects(): Action {
		return new utilityActions.LoadCache();
	}

	error = $localize`:@@utilityEffects-error:ERRORE`;

	errorLoadCache = $localize`:@@utilityEffects-errorLoadCache:Errore nel caricamento nella cache dei dati statici`;

	@Effect()
	loadPaymentLists$: Observable<Action> = this.actions$.pipe(
		ofType(utilityActions.UtilityActionTypes.LoadCache),
		map((action: utilityActions.LoadCache) => action),
		mergeMap(() =>
			forkJoin(
				this.http.get<BaseResponse<PaymentList[]>>(environment.baseUrl + 'maskStructure/getPaymentListByIds'),
				this.http.get<BaseResponse<GeoObject[]>>(environment.baseUrl + 'maskStructure/getAllGeoObjecsAndMasks'),
				this.http.get<BaseResponse<Mask[]>>(environment.baseUrl + 'maskStructure/getAllMasks'),
				this.http.get<BaseResponse<{ (key: string): RemapType[] }>>(environment.baseUrl + 'infoUtils/getRemapData'),
				this.http.get<BaseResponse<{ (key: string): TechSite[] }>>(environment.baseUrl + 'infoUtils/getTechSites'),
			).pipe(
				map(c => {
					// FIXME temporanea...
					c[2].body.forEach(m => { delete m['patch']; delete m['operationType']; });
					return new utilityActions.LoadCacheSuccess({
						paymentList: c[0].body,
						geoObjects: c[1].body,
						maskAnags: c[2].body,
						categories: c[3].body['categories'],
						dataTypes: c[3].body['dataTypes'],
						executors: c[3].body['executors'],
						maskRelationTypes: c[3].body['maskRelationTypes'],
						measurementUnits: c[3].body['measurementUnits'],
						questionTypes: c[3].body['questionTypes'],
						techSites: c[4].body['techSites'],
					})
				}),
				catchError(err => {
					this.snackBar.open(this.errorLoadCache, this.error, { duration: 5000 })
					return of(new utilityActions.LoadCacheFailure(err.statusText));
				})
			)
		)
	)

	constructor(
		private http: HttpClient,
		private actions$: Actions<UtilityActions>,
		private snackBar: MatSnackBar
	) { }

}
