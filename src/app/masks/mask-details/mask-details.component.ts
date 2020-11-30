import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { PaymentList, TechSite } from '@enel/pmf-be';
import { filter, take } from 'rxjs/operators';
import { MaskAnagComplete } from './mask-details-resolver.service';

@Component({
	selector: 'pmf-mask-details',
	templateUrl: './mask-details.component.html',
	styleUrls: ['./mask-details.component.css']
})
export class MaskDetailsComponent implements OnInit {

	id: number;
	editMode = false;

	paymentLists: PaymentList[];
	techSites: TechSite[];

	maskAnagForm: FormGroup = this.fb.group({
		id: null,
		code: null,
		description: null,
		tisp: null,
		technicalMask: null,
		version: null,
		paymentList: null,
		techSite: null,
		questions: this.fb.array([]),
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private utilityStore: Store<fromUtility.State>) { }

	data: MaskAnagComplete;

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.editMode = (this.id != null);
		this.data = this.route.snapshot.data['data'];

		console.log(this.data);
		this.data.questions.forEach((q) => this.addQuestion(q.answers.length));

		this.utilityStore.select(utilitySelectors.getPaymentLists).pipe(
			filter(d => d != null), take(1)).subscribe(d => {
				this.paymentLists = d;
				this.maskAnagForm.patchValue(this.data);
			});
	}
	
	questionControls() {
		return (<FormArray>this.maskAnagForm.controls.questions).controls;
	}

	answerControls(i: number) {
		return (<FormArray>(<FormGroup>(<FormArray>this.maskAnagForm.controls.questions).controls[i]).controls.answers).controls;
	}

	addQuestion(n: number) {
		const answers = this.fb.array([]);
		(<FormArray>this.maskAnagForm.controls.questions).push(this.fb.group({ id: null, code: null, description: null, visibilityCond: null, visibilityFlag: null, priority: null, note: null, answers: answers}));
		for (let i = 0; i < n; i++) 
			answers.push(this.fb.group({ id: null, code: null, description: null, priority: null, note: null}));
	}

	onSubmit() {
		console.log(JSON.stringify(this.maskAnagForm.value));
	}
}
