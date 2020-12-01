import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { QuestionWithAnswerResponse } from '@enel/pmf-be/model/questionWithAnswerResponse';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';


@Component({
	selector: 'pmf-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class QuestionListComponent implements OnInit {

	displayedColumns: string[] = [
		'code',
		'description',
		'visibilityFlag',
		'visibilityCond',
		'priority',
		'note',
	];

	@Input()
	data: QuestionWithAnswerResponse[];
	expandedElement: QuestionWithAnswerResponse;
	loading$: Observable<boolean>;

	constructor(
		private masksStore: Store<fromMasks.State>) { }

	ngOnInit() {
		this.loading$ = this.masksStore.select(masksSelectors.getLoading);
	}

}

