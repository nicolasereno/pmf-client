import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter, take, takeWhile, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MaskResponse, QuestionWithAnswerResponse, PaymentList, } from '@enel/pmf-be';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';


@Component({
	selector: 'pmf-mask-list',
	templateUrl: './mask-list.component.html',
	styleUrls: ['./mask-list.component.less'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class MaskListComponent implements OnInit, OnDestroy, AfterViewInit {

	active = true;
	ngOnDestroy(): void {
		this.active = false;
	}

	displayedColumns: string[] = [
		'code',
		'description',
		'tisp',
		'tecnicalMask',
		'version',
	];

	paymentLists: PaymentList[]

	dataSource: MatTableDataSource<MaskResponse> = new MatTableDataSource([]);
	paymentList: number;
	filtro = '';

	expandedElement: MaskResponse;
	questionsAnswers: QuestionWithAnswerResponse[];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		this.masksStore.select(masksSelectors.getQuestionsAnswers).pipe(
			filter(d => d != null), takeWhile(() => this.active)).subscribe(
				(d) => {
					this.questionsAnswers = d;
				});
		this.utilityStore.select(utilitySelectors.getPaymentLists).pipe(
			filter(d => d != null), take(1)).subscribe(
				(d) => {
					this.paymentLists = d.filter(d => d.code != null);
					this.paymentList = this.paymentLists[0].id;
					this.ricaricaDati();
				});
		this.dataSource.filterPredicate = (data, filter) => data.code.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 || data.description.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applicaFiltro() {
		this.dataSource.filter = this.filtro;
	}

	ricaricaDati() {
		this.utilityStore.select(utilitySelectors.getMaskAnags).pipe(
			filter(d => d != null),
			take(1),
			map(mm => mm.filter(m => m.paymentList.id == this.paymentList))
		).subscribe((d) => this.dataSource.data = d);
	}

	espandiMaschera(ma: MaskResponse) {
		if (this.expandedElement === ma) {
			this.expandedElement = null;
			return;
		}
		this.expandedElement = ma;
		this.masksStore.dispatch(new masksActions.LoadQuestionsAnswers(ma.id));
	}
}
