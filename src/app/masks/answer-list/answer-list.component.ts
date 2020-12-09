import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Answer } from 'src/app/model/model';
import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';


@Component({
	selector: 'pmf-answer-list',
	templateUrl: './answer-list.component.html',
	styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent {

	displayedColumns: string[] = [
		'code',
		'description',
		'priority',
		'note',
	];

	@Input()
	data: Answer[];

	constructor(private masksStore: Store<fromMasks.State>) { }

	onShowMetricCalculations(ma: Answer) {
		this.masksStore.dispatch(new masksActions.LoadMetricCalculations(ma.code));
	}
}
