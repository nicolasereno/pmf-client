import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { GeoObject, Relation } from 'src/app/model/model';


@Component({
	selector: 'pmf-geo-object-list',
	templateUrl: './geo-object-list.component.html',
	styleUrls: ['./geo-object-list.component.css']
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

	loading$: Observable<boolean>;
	dataSource: MatTableDataSource<GeoObject> = new MatTableDataSource([]);
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
		this.dataSource.filterPredicate = (data, filter) => data.code?.toLowerCase().indexOf(filter.toLowerCase()) >= 0 || data.description?.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	applicaFiltro() {
		this.dataSource.filter = this.filtro;
	}

	maschere(maskAnags: Array<Relation>, tipo: string): Array<Relation> {
		return maskAnags.filter(ma => ma.relationType == tipo);
	}
}
