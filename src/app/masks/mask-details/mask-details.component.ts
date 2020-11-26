import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { MaskResponse, PaymentList } from '@enel/pmf-be';
import { filter, take } from 'rxjs/operators';

@Component({
	selector: 'pmf-mask-details',
	templateUrl: './mask-details.component.html',
	styleUrls: ['./mask-details.component.css']
})
export class MaskDetailsComponent implements OnInit {

	id: number;
	editMode = false;

	paymentLists: PaymentList[];

	maskAnagForm: FormGroup = this.fb.group({
		id: null,
		code: [null, Validators.required],
		paymentList: null,
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private utilityStore: Store<fromUtility.State>) { }

	data: MaskResponse = {
		id: null,
		code: null,
		paymentList: null,
	}

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.editMode = (this.id != null);

		this.utilityStore.select(utilitySelectors.getPaymentLists).pipe(
			filter(d => d != null), take(1)).subscribe(d => this.paymentLists = d);
	}

	onSubmit() {
		console.log(JSON.stringify(this.maskAnagForm.value));
	}
}
