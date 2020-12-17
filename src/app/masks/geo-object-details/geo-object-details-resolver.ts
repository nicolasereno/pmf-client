import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { GeoObject } from 'src/app/model/model';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';


@Injectable({
	providedIn: 'root'
})
export class GeoObjectDetailsResolverService implements Resolve<GeoObject> {

	constructor(
		private utilityStore: Store<fromUtility.State>,
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const mode = route.params['mode']
		if (mode == 'create') {
			return { id: null, code: null, relations: [] };
		}
		const id = +route.params['id'];
		return forkJoin(
			this.utilityStore.select(utilitySelectors.getGeoObjects).pipe(filter(g => g != null), take(1), map(gg => gg.filter(g => g.id == id)[0])),
			this.utilityStore.select(utilitySelectors.getProjectData).pipe(filter(m => m != null), take(1)),
		).pipe(
			map(c => {
				// Cerco salvataggio
				let lastSave = c[1].projectData.geoObjectMaskMappings.find(g => g.id == id);
				if (lastSave)
					return JSON.parse(atob(lastSave.patch));
				// Altrimenti restituisco dato di base
				const mq: GeoObject = JSON.parse(JSON.stringify(c[0]));
				return mq;
			}),
		)
	}
}
