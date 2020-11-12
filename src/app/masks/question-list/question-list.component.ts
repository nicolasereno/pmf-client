import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Store } from '@ngrx/store';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { QuestionAnag } from '@enel/pmf-mock-be/model/questionAnag';

@Component({
	selector: 'pmf-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.less'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' , maxHeight: '0'})),
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

	data: QuestionAnag[] =
		[{"id":22,"answers":[{"id":1046208,"code":"RTECHSITECACP02","description":"concat($CACP00.IDCACP00$,'-TF')","priority":10,"note":""}],"code":"TECHSITECACP02","description":"Sede Tecnica:","visibilityFlag":"Y","visibilityCond":"$CACP00.TENSIMPICP$=CP150V","priority":2,"note":""},{"id":19,"answers":[{"id":1045144,"code":"NMANUTARVE","description":"No","priority":10,"note":""},{"id":1045145,"code":"SMANUTARVE","description":"Si","priority":20,"note":""}],"code":"MANUTARVE2","description":"Manutenzione aree verdi:","visibilityFlag":"Y","visibilityCond":"$CACP00.TENSIMPICP$=CP150V","priority":10,"note":""},{"id":21,"answers":[{"id":1043821,"code":"NPULIZLOC","description":"No","priority":10,"note":""},{"id":1043822,"code":"SPULIZLOC","description":"Si","priority":20,"note":""}],"code":"PULIZLOC2","description":"Pulizia locali:","visibilityFlag":"Y","visibilityCond":"$CACP00.TENSIMPICP$=CP150V","priority":20,"note":""},{"id":18,"answers":[{"id":1044620,"code":"NDISINFEST","description":"No","priority":10,"note":""},{"id":1044621,"code":"SDISINFEST","description":"Si","priority":20,"note":""}],"code":"DISINFEST2","description":"Disinfestazione:","visibilityFlag":"Y","visibilityCond":"$CACP00.TENSIMPICP$=CP150V","priority":30,"note":""},{"id":17,"answers":[{"id":1044612,"code":"NDERATTIZ","description":"No","priority":10,"note":""},{"id":1044613,"code":"SDERATTIZ","description":"Si","priority":20,"note":""}],"code":"DERATTIZ2","description":"Derattizzazione:","visibilityFlag":"Y","visibilityCond":"$CACP00.TENSIMPICP$=CP150V","priority":40,"note":""},{"id":20,"answers":[{"id":1045152,"code":"NMANUTCONDIZ","description":"No","priority":10,"note":""},{"id":1045153,"code":"SMANUTCONDIZ","description":"Si","priority":20,"note":""}],"code":"MANUTCONDIZ2","description":"Manutenzione climatizzatori:","visibilityFlag":"Y","visibilityCond":"$CACP00.TENSIMPICP$=CP150V","priority":50,"note":""}];

	expandedElement: QuestionAnag;

	constructor(private masksStore: Store<fromMasks.State>) { }

}

