import { Component, Input } from '@angular/core';

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

}
