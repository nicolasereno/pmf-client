import { Component, Input } from '@angular/core';
import { MetricCalculation } from '@enel/pmf-mock-be';

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
	data: MetricCalculation[] = [{ "id": 1336, "provisionCode": { "id": 341, "code": "MG2101", "provisionType": { "id": 10089, "infoValue": "Prestazione" }, "note": null }, "paymentList": { "id": 1, "code": "apr-16", "prefix": "A" }, "parteEc": { "id": 10092, "infoValue": "Lavori" }, "questionCategory": { "id": 5, "infoValue": "Lavorazione" }, "quantity": "COST(1)", "answerCondition": "", "checkCondition": "", "executor": { "id": 10086, "infoValue": "Terzi" }, "edType": null, "edKey": null, "note": null }];
}
