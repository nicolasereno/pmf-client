import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, ValidationErrors, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, filter, startWith, debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { GeoObjectResponse } from '@enel/pmf-be';
import { MaskAnagsControllerService } from '@enel/pmf-mock-be';
import { ReferenceString } from '@enel/pmf-mock-be/model/referenceString';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';

@Component({
	selector: 'pmf-geo-object-details',
	templateUrl: './geo-object-details.component.html',
	styleUrls: ['./geo-object-details.component.less']
})
export class GeoObjectDetailsComponent implements OnInit {

	objectTypes = ['E', 'P'];
	maskTypes = ['ADDING', 'DEMOLITION'];

	geoObjectForm: FormGroup = this.fb.group({
		id: { value: null, disabled: true },
		code: [null, Validators.required],
		description: [null, Validators.required],
		version: [null, Validators.required],
		copyable: null,
		objectType: [null, Validators.required],
		masks: this.fb.array([])
	});

	addMaskForm: FormGroup = this.fb.group({
		type: null,
		order: [null, Validators.required],
		mask: [null, Validators.required],
	});

	editMode = false;
	id: number;
	data: {
		id: number,
		code: string,
		description: string,
		version: string,
		masks: { order: number, type: string, mask: string }[];
	} = { id: null, code: null, description: null, version: null, masks: [] };

	masksAutoComplete$: Observable<ReferenceString[]>;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private utilityStore: Store<fromUtility.State>,
		private proxyMA: MaskAnagsControllerService) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.editMode = (this.id != null);
		if (this.editMode)
			this.geoObjectForm.disable();
		if (this.editMode) {
			this.utilityStore.select(utilitySelectors.getGeoObjects).pipe(
				filter(d => d != null),
				take(1)).subscribe(d => {
					let val: GeoObjectResponse = (d.filter(e => e['qgoId'] == this.id)[0]) as GeoObjectResponse;
					this.data.id = val.qgoId;
					this.data.code = val.qgoCode;
					this.data.description = val.qgoDescription;
					this.data.version = val.qgoVersion;
					val.geoObjectMasks.forEach(m => {
						(<FormArray>this.geoObjectForm.controls.masks).push(this.fb.group({ type: null, order: null, mask: null, }));
						this.data.masks.push({ order: m.qqqMaskOrder, type: m.qrdInfoValue, mask: m.qmaMaskCode });
					});
					this.sortByProperty(this.data.masks, 'type', 'order');
					this.geoObjectForm.patchValue(this.data);
				})
		}
		this.masksAutoComplete$ = this.addMaskForm.controls['mask'].valueChanges.pipe(
			startWith(''), debounceTime(300),
			// use switch map so as to cancel previous subscribed events, before creating new once
			switchMap(value => {
				if (value != null && value !== '') {
					// lookup from github
					return this.lookup(value);
				} else {
					// if no value is pressent, return null
					return of(null);
				}
			})
		);
	}

	lookup(value: string): Observable<ReferenceString[]> {
		return this.proxyMA.getMaskAnagsReference(value.toLowerCase()).pipe(
			// catch errors
			catchError(_ => {
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
