import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { QuestionAnag } from '@enel/pmf-mock-be/model/questionAnag';

@Component({
	selector: 'pmf-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.less'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class QuestionListComponent {

	displayedColumns: string[] = [
		'code',
		'description',
		'visibilityFlag',
		'visibilityCond',
		'priority',
		'note',
	];

	@Input()
	data: QuestionAnag[];
	expandedElement: QuestionAnag;

}

