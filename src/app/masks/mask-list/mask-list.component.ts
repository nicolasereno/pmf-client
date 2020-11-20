import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { Observable } from 'rxjs';
import { MaskResponse, QuestionWithAnswerDTO } from '@enel/pmf-be';

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
export class MaskListComponent implements OnInit {

	displayedColumns: string[] = [
		'code',
		'description',
		'tisp',
		'tecnicalMask',
		'version',
	];

	loading$: Observable<boolean>;

	dataSource: MatTableDataSource<MaskResponse> = new MatTableDataSource([]);
	compenso = 'option1';
	filtro = '';

	expandedElement: MaskResponse;
	questionsAnswers: QuestionWithAnswerDTO[];

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		// FIXME Unsubscribe!!!
		this.masksStore.select(masksSelectors.getMaskAnags).subscribe((d) => this.dataSource.data = d);
		this.masksStore.select(masksSelectors.getQuestionsAnswers).subscribe((d) => this.questionsAnswers = d);
		this.loading$ = this.masksStore.select(masksSelectors.getLoading);
		this.dataSource.filterPredicate = (data, filter) => data.code.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 || data.description.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
		this.ricaricaDati();
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applicaFiltro() {
		this.dataSource.filter = this.filtro;
	}

	ricaricaDati() {
		this.masksStore.dispatch(new masksActions.LoadMaskAnags(this.compenso));
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
