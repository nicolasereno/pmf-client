import { Component, OnInit, ViewChild } from '@angular/core';

import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MaskAnag } from '@enel/pmf-mock-be';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';

@Component({
	selector: 'pmf-mask-list',
	templateUrl: './mask-list.component.html',
	styleUrls: ['./mask-list.component.less']
})
export class MaskListComponent implements OnInit {

	displayedColumns: string[] = [
		'code',
		'description',
		'tisp',
		'tecnicalMask',
		'version',
	];

	dataSource: MatTableDataSource<MaskAnag> = new MatTableDataSource([]);
	compenso = 'option1';
	filtro = '';

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		// FIXME Unsubscribe!!!
		this.masksStore.select(masksSelectors.getMaskAnags).subscribe((d) => this.dataSource.data = d);
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

}
