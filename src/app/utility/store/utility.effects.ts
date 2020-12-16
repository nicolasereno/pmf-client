import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { BaseResponse, Cit, GeoObject, Mask, PaymentList, Project, ProjectData, RemapType, TechSite, _GeoObject, _Mask } from 'src/app/model/model';
import { environment } from 'src/environments/environment';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import * as utilityActions from './utility.actions';
import { UtilityActions } from './utility.actions';

@Injectable()
export class UtilityEffects implements OnInitEffects {

	ngrxOnInitEffects(): Action {
		return new utilityActions.LoadCache();
	}

	error = $localize`:@@utilityEffects-error:ERRORE`;

	errorLoadCache = $localize`:@@utilityEffects-errorLoadCache:Errore nel caricamento nella cache dei dati statici`;

	errorSaveMaskData = $localize`:@@utilityEffects-errorSaveMaskData:Errore nel salvataggio delle modifiche effettuate alla Maschera`;

	errorSaveGeoObjectData = $localize`:@@utilityEffects-errorSaveGeoObjectData:Errore nel salvataggio delle modifiche effettuate all'Elemento di Rete'`;

	@Effect()
	loadCache$: Observable<Action> = this.actions$.pipe(
		ofType(utilityActions.UtilityActionTypes.LoadCache),
		map((action: utilityActions.LoadCache) => action),
		mergeMap(() =>
			forkJoin(
				this.http.get<BaseResponse<PaymentList[]>>(environment.baseUrl + 'maskStructure/getPaymentListByIds'),
				this.http.get<BaseResponse<GeoObject[]>>(environment.baseUrl + 'maskStructure/getAllGeoObjecsAndMasks'),
				this.http.get<BaseResponse<Mask[]>>(environment.baseUrl + 'maskStructure/getAllMasks'),
				this.http.get<BaseResponse<{ (key: string): RemapType[] }>>(environment.baseUrl + 'infoUtils/getRemapData'),
				this.http.get<BaseResponse<{ (key: string): TechSite[] }>>(environment.baseUrl + 'infoUtils/getTechSites'),
				this.http.get<BaseResponse<{ (key: string): Cit[] }>>(environment.baseUrl + 'infoUtils/getCits'),
			).pipe(
				map(c => {
					// FIX dati temporanea...
					c[1].body.forEach(g => { g.geoObjectMaskMappings = g['relations']; delete g['relations']; g.geoObjectMaskMappings.forEach(r => { r.mask = { id: r.mask.id, description: r.mask.description, code: r.mask.code } }) });
					c[2].body.forEach(m => { delete m['patch']; delete m['operationType']; });
					// END FIX dati
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
						cits: c[5].body['cits'],
					})
				}),
				catchError(err => {
					this.snackBar.open(this.errorLoadCache, this.error, { duration: 5000 })
					return of(new utilityActions.LoadCacheFailure(err.statusText));
				})
			)
		)
	)

	@Effect()
	loadCacheSuccess$: Observable<Action> = this.actions$.pipe(
		ofType(utilityActions.UtilityActionTypes.LoadCacheSuccess),
		mergeMap(() => of(new utilityActions.LoadProject()))
	);

	PROJECT_NAME = 'default';
	USER_NAME = 'TEST';
	// FIXME Versione iniziale con utente 'FISSO', in attesa di SSO
	@Effect()
	loadDefaultProject$: Observable<Action> = this.actions$.pipe(
		ofType(utilityActions.UtilityActionTypes.LoadProject),
		mergeMap(() =>
			this.http.get<BaseResponse<Project[]>>(environment.baseUrl + 'projectMask/getUsersProjects',
				{ params: new HttpParams().append('user', this.USER_NAME) }).pipe(
					mergeMap(c => {
						const project = c.body.filter(e => e.projectName == this.PROJECT_NAME)[0];
						return combineLatest(of(project), this.http.get<BaseResponse<string>>(environment.baseUrl + 'projectMask/getProjectData',
							{ params: new HttpParams().append('projectUser', this.USER_NAME).append('projectId', '' + project.projectId) }))
					}),
					map(([project, c]) => {
						return new utilityActions.LoadProjectSuccess({ project: project, projectData: JSON.parse(c.body) });
					}),
					catchError(err => {
						return of(new utilityActions.LoadProjectFailure(err.statusText));
					})
				)
		)
	)

	@Effect()
	mergeMask$: Observable<Action> = this.actions$.pipe(
		ofType(utilityActions.UtilityActionTypes.MergeMaskEdits),
		map((action: utilityActions.MergeMaskEdits) => action.payload),
		mergeMap((mask: _Mask) =>
			this.utilityStore.select(utilitySelectors.getProjectData).pipe(take(1),
				mergeMap((data: ProjectData) => {
					let newData: ProjectData = JSON.parse(JSON.stringify(data));
					if (newData.projectData.masks.filter(m => m.id == mask.id).length > 0)
						newData.projectData.masks = newData.projectData.masks.map(m => (m.id == mask.id ? mask : m));
					else
						newData.projectData.masks.push(mask);
					console.log(newData.projectData);
					return this.http.post<BaseResponse<any>>(environment.baseUrl + 'projectMask/saveProject', newData.projectData, { params: new HttpParams().append('projectUser', this.USER_NAME).append('projectId', '' + data.project.projectId) }).pipe(
						map(() => new utilityActions.MergeMaskEditsSuccess({ patch: mask.patch, projectData: newData })),
						catchError(err => {
							this.snackBar.open(this.errorSaveMaskData, this.error, { duration: 5000 })
							return of(new utilityActions.MergeMaskEditsFailure(err.statusText));
						}))
				}))
		));

	@Effect()
	mergeGeoObject$: Observable<Action> = this.actions$.pipe(
		ofType(utilityActions.UtilityActionTypes.MergeGeoObjectEdits),
		map((action: utilityActions.MergeGeoObjectEdits) => action.payload),
		mergeMap((geoObject: _GeoObject) =>
			this.utilityStore.select(utilitySelectors.getProjectData).pipe(take(1),
				mergeMap((data: ProjectData) => {
					let newData: ProjectData = JSON.parse(JSON.stringify(data));
					if (!newData.projectData.geoObjectMaskMappings)
						newData.projectData.geoObjectMaskMappings = [];
					if (newData.projectData.geoObjectMaskMappings.filter(g => g.id == geoObject.id).length > 0)
						newData.projectData.geoObjectMaskMappings = newData.projectData.geoObjectMaskMappings.map(g => (g.id == geoObject.id ? geoObject : g));
					else
						newData.projectData.geoObjectMaskMappings.push(geoObject);
					console.log(newData.projectData);
					return this.http.post<BaseResponse<any>>(environment.baseUrl + 'projectMask/saveProject', newData.projectData, { params: new HttpParams().append('projectUser', this.USER_NAME).append('projectId', '' + data.project.projectId) }).pipe(
						map(() => new utilityActions.MergeGeoObjectEditsSuccess({ patch: geoObject.patch, projectData: newData })),
						catchError(err => {
							this.snackBar.open(this.errorSaveGeoObjectData, this.error, { duration: 5000 })
							return of(new utilityActions.MergeGeoObjectEditsFailure(err.statusText));
						}))
				}))
		));

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private http: HttpClient,
		private actions$: Actions<UtilityActions>,
		private snackBar: MatSnackBar
	) { }

}
