import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectEdits, _Mask } from 'src/app/model/model';
import * as utilityActions from '../utility/store/utility.actions';
import * as fromUtility from '../utility/store/utility.reducer';
import * as utilitySelectors from '../utility/store/utility.selectors';


@Component({
	selector: 'pmf-changeset',
	templateUrl: './changeset.component.html',
	styleUrls: ['./changeset.component.css']
})
export class ChangesetComponent implements OnInit {

	projectEdits$: Observable<ProjectEdits>;

	constructor(private utilityStore: Store<fromUtility.State>) { }

	ngOnInit(): void {
		this.projectEdits$ = this.utilityStore.select(utilitySelectors.getProjectEdits);
	}

	private EXCLUDES = ['id', 'code', 'operationType', 'patch', 'relations', 'questions', 'answers', 'relationType', 'order', 'geoObjId'];
	modifiedAttributes(o: any) {
		return Object.keys(o).filter(o => this.EXCLUDES.indexOf(o) < 0);
	}

	showValue(v: any) {
		if (v === null)
			return '';
		else if (typeof v === 'object' && v !== null) {
			if (v['infoValue'] != null)
				return v['infoValue'];
			else if (v['code'] != null)
				return v['code'];
			else
				return JSON.stringify(v);
		} else
			return v;
	}

	expandedMasks = [];
	isExpandedMask(code: string) {
		return this.expandedMasks.indexOf(code) >= 0;
	}

	toggleMask(m: string) {
		const index = this.expandedMasks.indexOf(m);
		if (index < 0)
			this.expandedMasks.push(m);
		else
			this.expandedMasks.splice(index, 1);
	}

	expandedGeoObjects = [];
	isExpandedGeoObject(code: string) {
		return this.expandedGeoObjects.indexOf(code) >= 0;
	}

	toggleGeoObject(m: string) {
		const index = this.expandedGeoObjects.indexOf(m);
		if (index < 0)
			this.expandedGeoObjects.push(m);
		else
			this.expandedGeoObjects.splice(index, 1);
	}

	undoMask(m: _Mask, e: MouseEvent) {
		e.stopPropagation();
		if (confirm('Annullare tutte le modifiche effettuate alla Maschera ' + m.code + '?'))
			this.utilityStore.dispatch(new utilityActions.UndoEdits({ type: 'Mask', code: m.code }));
	}

	undoGeoObject(g: _Mask, e: MouseEvent) {
		e.stopPropagation();
		if (confirm("Annullare tutte le modifiche effettuate alla relazioni dell'Elemento di Rete " + g.code + '?'))
			this.utilityStore.dispatch(new utilityActions.UndoEdits({ type: 'GeoObject', code: g.code }));
	}
}
