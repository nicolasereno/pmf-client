import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, takeWhile } from 'rxjs/operators';
import { Mask, MetricCalculation, PaymentList, Question } from 'src/app/model/model';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { MetricCalculationsDialogComponent } from '../metric-calculation-list/metric-calculations-dialog.component';
import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';


@Component({
	selector: 'pmf-mask-list',
	templateUrl: './mask-list.component.html',
	styleUrls: ['./mask-list.component.css'],
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
	ngOnDestroy() {
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

	dataSource: MatTableDataSource<Mask> = new MatTableDataSource([]);
	paymentList: number;
	filtro = '';

	expandedElement: Mask;
	questionsAnswers: Question[];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>,
		private dialog: MatDialog,
		private router: Router) { }

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
				});
		this.dataSource.filterPredicate = (data, filter) => data.code.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 || data.description.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
		this.masksStore.select(masksSelectors.getMetricCalculations).pipe(
			filter(d => d != null && d.length > 0), takeWhile(() => this.active)).subscribe(
				(d) => {
					this.openDialog(d);
				});
		this.ricaricaDati();
	}

	onModifyMask(id: number, e: MouseEvent) {
		e.stopPropagation();
		this.router.navigate(['/masks', 'mask-details', 'view', id + '']);
	}

	openDialog(data: MetricCalculation[]): void {
		this.dialog.open(MetricCalculationsDialogComponent, {
			width: '80vw',
			data: data,
		});
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

	espandiMaschera(ma: Mask) {
		if (this.expandedElement === ma) {
			this.expandedElement = null;
			return;
		}
		this.expandedElement = ma;
		this.questionsAnswers = [];
		this.masksStore.dispatch(new masksActions.LoadQuestionsAnswers(ma.id));
	}
}
