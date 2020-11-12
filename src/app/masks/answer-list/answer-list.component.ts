import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { AnswerAnag } from '@enel/pmf-mock-be/model/answerAnag';

@Component({
	selector: 'pmf-answer-list',
	templateUrl: './answer-list.component.html',
	styleUrls: ['./answer-list.component.less']
})
export class AnswerListComponent {

	displayedColumns: string[] = [
		'code',
		'description',
		'priority',
		'note',
	];	
	
	@Input()
	data: AnswerAnag[];
	
	constructor(private masksStore: Store<fromMasks.State>) { }

}
