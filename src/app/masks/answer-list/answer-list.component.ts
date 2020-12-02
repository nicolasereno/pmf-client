import { Component, Input, OnInit } from '@angular/core';
import { trigger, animate, style, state, transition } from '@angular/animations';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MetricCalculation, Answer } from 'src/app/model/model';

@Component({
	selector: 'pmf-answer-list',
	templateUrl: './answer-list.component.html',
	styleUrls: ['./answer-list.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class AnswerListComponent implements OnInit {

	displayedColumns: string[] = [
		'code',
		'description',
		'priority',
		'note',
	];

	loading$: Observable<boolean>;

	@Input()
	data: Answer[];
	expandedElement: Answer;
	metricCalculations: MetricCalculation[];

	constructor(private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		// FIXME Unsubscribe!!!	
		this.masksStore.select(masksSelectors.getMetricCalculations).subscribe((d) => this.metricCalculations = d);
		this.loading$ = this.masksStore.select(masksSelectors.getLoading);
	}

	espandiRisposta(ma: Answer) {
		if (this.expandedElement === ma) {
			this.expandedElement = null;
			return;
		}
		this.expandedElement = ma;
		this.masksStore.dispatch(new masksActions.LoadMetricCalculations(ma.code));
	}
}
