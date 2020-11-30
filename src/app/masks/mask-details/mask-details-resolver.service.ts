import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MaskResponse, QuestionWithAnswerResponse } from '@enel/pmf-be';
import { Store } from '@ngrx/store';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';

import * as fromMasks from './../store/masks.reducer';
import * as masksSelectors from './../store/masks.selectors';
import { take, map, filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import * as masksActions from './../store/masks.actions';


export interface MaskAnagComplete extends MaskResponse {
	questions?: QuestionWithAnswerResponse[];
}

@Injectable({
	providedIn: 'root'
})
export class MaskDetailsResolverService implements Resolve<MaskAnagComplete> {

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>,
	) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const id = +route.params['id'];
		this.masksStore.dispatch(new masksActions.LoadQuestionsAnswers(id));
		return forkJoin(
			this.utilityStore.select(utilitySelectors.getMaskAnags).pipe(filter(m => m != null), take(1), map(mm => mm.filter(m => m.id == id)[0])),
			this.masksStore.select(masksSelectors.getQuestionsAnswers).pipe(filter(m => m != null), take(1)),
		).pipe(
			map(c => {
				const mq: MaskAnagComplete = JSON.parse(JSON.stringify(c[0]));
				mq['questions'] = c[1];
				return mq;
			}),
		)
	}
}
