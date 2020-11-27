import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MaskStructureService, InfoUtilsService } from '@enel/pmf-be';

import * as utilityActions from './utility.actions';
import { UtilityActions } from './utility.actions';

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
				this.proxyMS.getPaymentListByIdsUsingGET([0, 1]),
				this.proxyMS.getAllGeoObjecsAndMasksUsingGET(),
				this.proxyMS.getAllMasksUsingGET(),
				this.proxyIU.getMaskRelTypesUsingGET(),
			).pipe(
				map(c => new utilityActions.LoadCacheSuccess({ paymentList: c[0]['body'], geoObjects: c[1]['body'], maskAnags: c[2]['body'], maskRelationTypes: c[3]['body'] })),
				catchError(err => {
					this.snackBar.open(this.errorLoadCache, this.error, { duration: 5000 })
					return of(new utilityActions.LoadCacheFailure(err.statusText));
				})
			)
		)
	)

	constructor(private actions$: Actions<UtilityActions>,
		private proxyMS: MaskStructureService,
		private proxyIU: InfoUtilsService,
		private snackBar: MatSnackBar
	) { }

}
