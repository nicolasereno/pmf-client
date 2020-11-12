import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { GeoObject, GeoObjectMaskAnag } from '@enel/pmf-mock-be';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';

@Component({
	selector: 'pmf-geo-object-list',
	templateUrl: './geo-object-list.component.html',
	styleUrls: ['./geo-object-list.component.less']
})
export class GeoObjectListComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = [
		'code',
		'maskAnagCodeToolbox',
		'maskAnagCodeSARC',
		'maskAnagCodeED',
		'maskAnagCodeREM',
		'maskAnagCodeSEC',
	];

	dataSource: MatTableDataSource<GeoObject> = new MatTableDataSource([]);
	compenso = 'option1';
	filtro = '';

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		// FIXME Unsubscribe!!!
		this.masksStore.select(masksSelectors.getGeoObjects).subscribe((d) => this.dataSource.data = d);
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
		this.masksStore.dispatch(new masksActions.LoadGeoObjects(this.compenso));
	}

	maschere(maskAnags: Array<GeoObjectMaskAnag>, tipo: string): Array<GeoObjectMaskAnag> {
		return maskAnags.filter(ma => ma.maskRelType.infoValue == tipo);
	}
}
