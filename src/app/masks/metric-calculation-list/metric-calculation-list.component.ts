import { Component, Input } from '@angular/core';
import { MetricCalculation } from 'src/app/model/model';


@Component({
	selector: 'pmf-metric-calculation-list',
	templateUrl: './metric-calculation-list.component.html',
	styleUrls: ['./metric-calculation-list.component.css']
})
export class MetricCalculationListComponent {

	displayedColumns: string[] = [
		'provisionCode.code',
		'provisionCode.provisionType.infoValue',
		'paymentList.code',
		'parteEc.infoValue',
		'questionCategory.infoValue',
		'quantity',
		'answerCondition',
		'checkCondition',
		'executor.infoValue',
		'edType.infoValue',
		'edKey.infoValue',
		'note',
	];

	@Input()
	data: MetricCalculation[];
}
