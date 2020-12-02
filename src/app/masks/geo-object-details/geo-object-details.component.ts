import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, filter, startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';

import { Mask, RemapType } from 'src/app/model/model';

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
	masksAutoComplete$: Observable<Mask[]>;

	geoObjectForm: FormGroup = this.fb.group({
		id: null,
		code: null,
		description: Validators.required,
		version: Validators.required,
		masks: this.fb.array([])
	});

	addMaskForm: FormGroup = this.fb.group({
		type: null,
		order: [null, Validators.required],
		mask: [null, Validators.required],
	});

	data: {
		id: number,
		code: string,
		description: string,
		version: string,
		masks: { order: number, type: string, mask: string }[];
	};

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private utilityStore: Store<fromUtility.State>) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.editMode = (this.id != null);
		this.utilityStore.select(utilitySelectors.getMaskRelationTypes).pipe(
			filter(d => d != null), take(1)).subscribe(d => this.maskRelationTypes = d);

		if (this.id) {
			this.utilityStore.select(utilitySelectors.getGeoObjects).pipe(
				filter(d => d != null),
				take(1), map(d => d.filter(e => e['id'] == this.id)[0])).subscribe((val) => {
					this.data = {
						id: val.id,
						code: val.code,
						description: val.description,
						version: val.version,
						masks: []
					};
					val.relations.forEach(m => {
						(<FormArray>this.geoObjectForm.controls.masks).push(this.fb.group({ type: null, order: null, mask: null, }));
						this.data.masks.push({ order: m.order, type: m.relationType, mask: m.mask.code });
					});
					this.sortByProperty(this.data.masks, 'type', 'order');
					this.geoObjectForm.patchValue(this.data);
				})
		}
		this.setupMaskAutoComplete();
	}

	setupMaskAutoComplete() {
		this.masksAutoComplete$ = this.addMaskForm.controls['mask'].valueChanges.pipe(
			startWith(''), debounceTime(300),
			// use switch map so as to cancel previous subscribed events, before creating new once
			switchMap(value => {
				// Logica di lookup asincrono
				if (value != null && value !== '')
					return this.utilityStore.select(utilitySelectors.getMaskAnags).pipe(
						filter(d => d != null), take(1),
						map(d => d.filter(m => value != null && m.code.toUpperCase().indexOf(value?.toUpperCase()) >= 0)));
				else
					return of(null);
			})
		);
	}

	onRemoveMask(i: number) {
		(<FormArray>this.geoObjectForm.controls.masks).removeAt(i);
		this.data.masks.slice(i, i);
	}

	maskControls(): AbstractControl[] {
		return (<FormArray>this.geoObjectForm.controls.masks).controls;
	}

	onAddMask() {
		(<FormArray>this.geoObjectForm.controls.masks).push(this.fb.group({ type: null, order: null, mask: null, }));
		this.data.masks.push(this.addMaskForm.value);
		this.addMaskForm.reset();
		this.addMaskForm.clearValidators();
		this.sortByProperty(this.data.masks, 'type', 'order');
		this.geoObjectForm.patchValue(this.data);
		console.log(JSON.stringify(this.data.masks));
	}

	onSubmit() {
		this.geoObjectForm.enable();
		console.log(JSON.stringify(this.geoObjectForm.value));
		this.geoObjectForm.disable();
	}

	sortByProperty<T>(array: T[], prop1: keyof T, prop2: keyof T): void {
		array.sort((a, b) => {
			if (a[prop1] < b[prop1])
				return -1;
			if (a[prop1] > b[prop1])
				return 1;
			if (a[prop2] < b[prop2])
				return -1;
			if (a[prop2] > b[prop2])
				return 1;
			return 0;
		});
	}
}
