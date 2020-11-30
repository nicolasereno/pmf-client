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
				map(c => new utilityActions.LoadCacheSuccess({ paymentList: c[0]['body'], geoObjects: c[1]['body'], maskAnags: c[2]['body'], maskRelationTypes: c[3]['body'], techSites: this.TECH_SITES, })),
				catchError(err => {
					this.snackBar.open(this.errorLoadCache, this.error, { duration: 5000 })
					return of(new utilityActions.LoadCacheFailure(err.statusText));
				})
			)
		)
	)

	TECH_SITES = [{ "id": 19, "code": "<CFT>-CBT-PTP", "tip": null }, { "id": 20, "code": "<CFT>-CBT-TR", "tip": null }, { "id": 18, "code": "<CFT>-GBT-2G", "tip": null }, { "id": 7, "code": "<CFT>-LBT-AEN", "tip": null }, { "id": 8, "code": "<CFT>-LBT-CVA", "tip": null }, { "id": 9, "code": "<CFT>-LBT-CVI", "tip": null }, { "id": 11, "code": "<CFT>-PRE-QCGE", "tip": null }, { "id": 10, "code": "<CFT>-PRE-SI", "tip": null }, { "id": 3, "code": "DX001xxxxxx", "tip": null }, { "id": 14, "code": "DX001xxxxxx-NE", "tip": null }, { "id": 12, "code": "DX001xxxxxx-SB1", "tip": null }, { "id": 16, "code": "DX001xxxxxx-SB2", "tip": null }, { "id": 15, "code": "DX001xxxxxx-SB3", "tip": null }, { "id": 4, "code": "DX001xxxxxx-TF", "tip": null }, { "id": 13, "code": "DX001xxxxxx-TT", "tip": null }, { "id": 1, "code": "Dxxxxxxxx-AEN", "tip": null }, { "id": 2, "code": "Dxxxxxxxx-CVA", "tip": null }, { "id": 6, "code": "Dxxxxxxxx-CVI", "tip": null }, { "id": 22, "code": "Dxxxxxxxx-GMT-GEMT", "tip": null }, { "id": 5, "code": "DYxx2xxxxxx", "tip": null }, { "id": 17, "code": "DYxx610001-AP-UP", "tip": null }, { "id": 21, "code": "DYxx610001-C2", "tip": null }];

	constructor(private actions$: Actions<UtilityActions>,
		private proxyMS: MaskStructureService,
		private proxyIU: InfoUtilsService,
		private snackBar: MatSnackBar
	) { }

}
