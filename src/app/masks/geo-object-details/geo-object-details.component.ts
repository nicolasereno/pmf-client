import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, take, takeWhile } from 'rxjs/operators';
import { GeoObject, MaskRef, RemapType } from 'src/app/model/model';
import { inOptions } from '../../material/autocomplete-element/autocomplete-element.component';
import { IsDirty } from '../../utility/dirty.guard';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { DifferencesService } from '../differences.service';


@Component({
	selector: 'pmf-geo-object-details',
	templateUrl: './geo-object-details.component.html',
	styleUrls: ['./geo-object-details.component.css']
})
export class GeoObjectDetailsComponent implements OnInit, OnDestroy, IsDirty {

	active = true;
	ngOnDestroy() {
		this.active = false;
	}

	id: number;
	mode: 'edit' | 'view' | 'create' = 'view';

	objectTypes = ['E', 'P'];
	maskRelationTypes: RemapType[];
	maskRefs: MaskRef[];

	geoObjectForm: FormGroup = this.fb.group({
		id: null,
		code: null,
		description: Validators.required,
		version: Validators.required,
		relations: this.fb.array([])
	});

	data: GeoObject;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private diff: DifferencesService,
		private utilityStore: Store<fromUtility.State>) { }

	isDirty() {
		const modified = this.diff.createMaskDifference(this.data, this.geoObjectForm.value) != null;
		if (modified)
			confirm('Le modifiche fatte alle relazini e non salvate saranno perse. Continuare?');
		return modified;
	}

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.setState(<'edit' | 'view' | 'create'>this.route.snapshot.paramMap.get('mode'));

		// Per reindirizzamento a modalit� di modifica
		this.route.paramMap.pipe(takeWhile(() => this.active))
			.subscribe(m => this.setState(<'edit' | 'view' | 'create'>m.get('mode')));

		this.utilityStore.select(utilitySelectors.getMaskRelationTypes).pipe(
			filter(d => d != null), take(1)).subscribe(d => this.maskRelationTypes = d);
		this.utilityStore.select(utilitySelectors.getMaskAnags).pipe(filter(d => d != null),
			take(1), map(d => d.map(e => <MaskRef>{ id: e.id, code: e.code, description: e.description })))
			.subscribe(d => this.maskRefs = d);

		if (this.id) {
			this.utilityStore.select(utilitySelectors.getGeoObjects).pipe(
				filter(d => d != null),
				take(1), map(d => d.filter(e => e['id'] == this.id)[0])).subscribe((val) => {
					this.data = JSON.parse(JSON.stringify(val));
					this.data.relations.forEach(() => { this.addRelation(); });
					this.geoObjectForm.patchValue(this.data);
				})
		}
	}

	setState(m: 'edit' | 'view' | 'create') {
		this.mode = m;
		if (this.mode == 'view')
			this.geoObjectForm.disable({onlySelf: false});
		else
			this.geoObjectForm.enable({onlySelf: false});
	}

	edit() {
		this.router.navigate(['masks', 'geo-object-details', 'edit', this.id]);
	}

	relationsControls(): AbstractControl[] {
		return (<FormArray>this.geoObjectForm.controls.relations).controls;
	}

	relationsFormGroup(i: number) {
		return (<FormGroup>this.relationsControls()[i]);
	}

	addRelation() {
		(<FormArray>this.geoObjectForm.controls.relations).push(this.fb.group({
			id: null, order: null, relationType: null, mask: [null, inOptions(this.maskRefs)]
		}));
		if ((<FormArray>this.geoObjectForm.controls.relations).length > this.data.relations.length)
			this.data.relations.push({});
		if (this.mode == 'view')
			(<FormArray>this.geoObjectForm.controls.relations).disable();
	}

	removeRelation(i: number, e?: MouseEvent) {
		e.stopPropagation();
		if(!confirm('Eliminare la domanda?'))
			return;
		if (this.relationsFormGroup(i).controls['id'].value == null) {
			// non presente in db: lo elimino
			this.relationsControls().splice(i, 1);
			this.geoObjectForm.value.relations.splice(i, 1);
			this.data.relations.splice(i, 1);
		} else
			this.relationsFormGroup(i).controls['id'].setValue(-1 * this.relationsFormGroup(i).controls['id'].value);
	}

	onSubmit() {
		const difference = this.diff.createGeoObjectDifference(this.data, this.geoObjectForm.value);
	}

}
