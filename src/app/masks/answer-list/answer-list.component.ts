import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';
import { Answer } from 'src/app/model/model';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';


@Component({
	selector: 'pmf-answer-list',
	templateUrl: './answer-list.component.html',
	styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {

	displayedColumns: string[] = [
		'code',
		'description',
		'priority',
		'note',
	];

	@Input()
	data: Answer[];

	metricCalculationsAnswerCodes: string[]

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>) { }

	ngOnInit() {
		this.utilityStore.select(utilitySelectors.getMetricCalculationsAnswerCodes).pipe(filter(d => d != null), take(1)).subscribe(d => this.metricCalculationsAnswerCodes = d)
	}

	codeWithMetricCalculations(c: string) {
		return this.metricCalculationsAnswerCodes?.indexOf(c) >= 0;
	}

	onShowMetricCalculations(ma: Answer) {
		this.masksStore.dispatch(new masksActions.LoadMetricCalculations(ma.code));
	}
}
