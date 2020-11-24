import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { Observable } from 'rxjs';
import { GeoObjectResponse } from '@enel/pmf-be/model/geoObjectResponse';
import { GeoObjectMask } from '@enel/pmf-be/model/geoObjectMask';

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

	constructor(private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		// FIXME Unsubscribe!!!
		this.masksStore.select(masksSelectors.getGeoObjects).subscribe((d) => this.dataSource.data = d);
		this.loading$ = this.masksStore.select(masksSelectors.getLoading);
		this.dataSource.filterPredicate = (data, filter) => data.qgoCode?.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0 || data.qgoDescription?.toLowerCase().indexOf(filter.toLocaleLowerCase()) >= 0;
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

	maschere(maskAnags: Array<GeoObjectMask>, tipo: string): Array<GeoObjectMask> {
		return maskAnags.filter(ma => ma.qrdInfoValue == tipo);
	}
}
