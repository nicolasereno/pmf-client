import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';

import { GeoObject, RemapType, MaskRef } from 'src/app/model/model';

import { inOptions } from '../../material/autocomplete-element/autocomplete-element.component'
import { DifferencesService } from '../differences.service';

@Component({
	selector: 'pmf-geo-object-details',
	templateUrl: './geo-object-details.component.html',
	styleUrls: ['./geo-object-details.component.css']
})
export class GeoObjectDetailsComponent implements OnInit {

	id: number;
	editMode = false;

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
		private diff: DifferencesService,
		private utilityStore: Store<fromUtility.State>) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.editMode = (this.id != null);
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

	onRemoveMask(i: number) {
		(<FormArray>this.geoObjectForm.controls.masks).removeAt(i);
		this.data.relations.slice(i, i);
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
	}

	removeRelation(i: number, e?: MouseEvent) {
		if (e)
			e.stopPropagation();
		if (this.relationsFormGroup(i).controls['id'].value == null) {
			// non presente in db: lo elimino
			this.relationsControls().splice(i, 1);
			this.data.relations.splice(i, 1);
		} else
			this.relationsFormGroup(i).controls['id'].setValue(-1 * this.relationsFormGroup(i).controls['id'].value);
	}

	onSubmit() {
		const difference = this.diff.createGeoObjectDifference(this.data, this.geoObjectForm.value);
	}

}