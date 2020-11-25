import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, takeWhile, filter } from 'rxjs/operators';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { GeoObjectResponse } from '@enel/pmf-be';
import { GeoObjectMask } from '@enel/pmf-be';

import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';


@Component({
	selector: 'pmf-geo-object-list',
	templateUrl: './geo-object-list.component.html',
	styleUrls: ['./geo-object-list.component.less']
})
export class GeoObjectListComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = [
		'qgoCode',
		'maskAnagCodeToolbox',
		'maskAnagCodeSARC',
		'maskAnagCodeED',
		'maskAnagCodeREM',
		'maskAnagCodeSEC',
	];

	loading$: Observable<boolean>;
	dataSource: MatTableDataSource<GeoObjectResponse> = new MatTableDataSource([]);
	compenso = 'option1';
	filtro = '';

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		this.utilityStore.select(utilitySelectors.getGeoObjects).pipe(
			filter(d => d != null),
			take(1)).subscribe((d) => this.dataSource.data = d);
		this.loading$ = this.masksStore.select(masksSelectors.getLoading);
		this.dataSource.filterPredicate = (data, filter) => data.qgoCode?.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 || data.qgoDescription?.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applicaFiltro() {
		this.dataSource.filter = this.filtro;
	}

	maschere(maskAnags: Array<GeoObjectMask>, tipo: string): Array<GeoObjectMask> {
		return maskAnags.filter(ma => ma.qrdInfoValue == tipo);
	}
}
