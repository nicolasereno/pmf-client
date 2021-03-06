import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Mask } from 'src/app/model/model';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import * as masksActions from './../store/masks.actions';
import * as fromMasks from './../store/masks.reducer';
import * as masksSelectors from './../store/masks.selectors';


@Injectable({
	providedIn: 'root'
})
export class MaskDetailsResolverService implements Resolve<Mask> {

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>,
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const mode = route.params['mode']
		if (mode == 'create') {
			return { id: null, code: null, description: null, tisp: null, tecnicalMask: null, version: null, paymentList: null, techSite: null, questions: [] };
		}
		const id = +route.params['id'];
		this.masksStore.dispatch(new masksActions.LoadQuestionsAnswers(id));
		return forkJoin(
			this.utilityStore.select(utilitySelectors.getMaskAnags).pipe(filter(m => m != null), take(1), map(mm => mm.filter(m => m.id == id)[0])),
			this.masksStore.select(masksSelectors.getQuestionsAnswers).pipe(filter(m => m != null), take(1)),
			this.utilityStore.select(utilitySelectors.getProjectData).pipe(filter(m => m != null), take(1)),
		).pipe(
			map(c => {
				// Cerco salvataggio
				let lastSave = c[2].projectData.masks.find(m => m.id == id);
				if (lastSave)
					return JSON.parse(atob(lastSave.patch));
				// Altrimenti restituisco dato di base
				const mq: Mask = JSON.parse(JSON.stringify(c[0]));
				mq.questions = JSON.parse(JSON.stringify(c[1]));
				return mq;
			}),
		)
	}
}
