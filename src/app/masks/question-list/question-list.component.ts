import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { Question } from 'src/app/model/model';

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
	data: Question[];
	expandedElement: Question;
	loading$: Observable<boolean>;

	constructor(
		private masksStore: Store<fromMasks.State>) { }

	ngOnInit() {
		this.loading$ = this.masksStore.select(masksSelectors.getLoading);
	}

}

