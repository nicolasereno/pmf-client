import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as masksSelectors from '../store/masks.selectors';
import { take } from 'rxjs/operators';
import { GeoObjectResponse } from '@enel/pmf-be/model/geoObjectResponse';

@Component({
	selector: 'pmf-geo-object-details',
	templateUrl: './geo-object-details.component.html',
	styleUrls: ['./geo-object-details.component.less']
})
export class GeoObjectDetailsComponent implements OnInit {

	objectTypes = ['E', 'P'];

	geoObjectForm = this.fb.group({
		id: null,
		code: [null, Validators.required],
		description: [null, Validators.required],
		version: [null, Validators.required],
		copyable: false,
		objectType: [null, Validators.required]
	});

	editMode = false;
	id: number;

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private masksStore: Store<fromMasks.State>) { }

	ngOnInit(): void {
		this.id = this.route.snapshot.params['id'];
		this.editMode = (this.id != null);
		if (this.editMode) {
			this.masksStore.select(masksSelectors.getGeoObjects).pipe(take(1)).subscribe(d => {
				let val: GeoObjectResponse = (d.filter(e => e['qgoId'] == this.id)[0]) as GeoObjectResponse;
				console.log({ id: val.qgoId, code: val.qgoCode, description: val.qgoDescription, version: val.qgoVersion });
				this.geoObjectForm.patchValue({ id: val.qgoId, code: val.qgoCode, description: val.qgoDescription, version: val.qgoVersion });
			})
		}
	}

	onSubmit() {
		console.log(JSON.stringify(this.geoObjectForm.value));
	}
}
