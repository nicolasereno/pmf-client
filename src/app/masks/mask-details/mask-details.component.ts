import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { filter, take } from 'rxjs/operators';

import { Mask, PaymentList, TechSite, RemapType } from 'src/app/model/model';
import { DifferencesService } from '../differences.service';


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
	executors: RemapType[];
	categories: RemapType[];
	dataTypes: RemapType[];
	measurementUnits: RemapType[];
	questionTypes: RemapType[];

	flags = [null, "Y", "N"];
	flagsPlus = [null, "Y", "N", "X"];

	maskAnagForm: FormGroup = this.fb.group({
		id: null,
		code: null,
		description: null,
		tisp: null,
		tecnicalMask: null,
		version: null,
		paymentList: null,
		techSite: null,
		questions: this.fb.array([]),
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private utilityStore: Store<fromUtility.State>,
		private diff: DifferencesService) { }

	data: Mask;

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.editMode = (this.id != null);
		this.data = this.route.snapshot.data['data'];
		this.data.questions.forEach((q) => this.addQuestion(q.answers.length));
		// Decodifiche
		this.utilityStore.select(utilitySelectors.getTechSites).pipe(filter(d => d != null), take(1)).subscribe(d => this.techSites = d);
		this.utilityStore.select(utilitySelectors.getPaymentLists).pipe(filter(d => d != null), take(1)).subscribe(d => this.paymentLists = d);
		this.utilityStore.select(utilitySelectors.getCategories).pipe(filter(d => d != null), take(1)).subscribe(d => this.categories = d);
		this.utilityStore.select(utilitySelectors.getDataTypes).pipe(filter(d => d != null), take(1)).subscribe(d => this.dataTypes = d);
		this.utilityStore.select(utilitySelectors.getMeasurementUnits).pipe(filter(d => d != null), take(1)).subscribe(d => this.measurementUnits = d);
		this.utilityStore.select(utilitySelectors.getQuestionTypes).pipe(filter(d => d != null), take(1)).subscribe(d => this.questionTypes = d);
		this.utilityStore.select(utilitySelectors.getExecutors).pipe(filter(d => d != null), take(1)).subscribe(d => this.executors = d);

		console.log(JSON.stringify(this.data));
		this.maskAnagForm.setValue(this.data);
	}

	questionControls() {
		return (<FormArray>this.maskAnagForm.controls.questions).controls;
	}

	answerControls(i: number) {
		return (<FormArray>(<FormGroup>(<FormArray>this.maskAnagForm.controls.questions).controls[i]).controls.answers).controls;
	}

	addQuestion(n: number) {
		const answers = this.fb.array([]);
		(<FormArray>this.maskAnagForm.controls.questions).push(this.fb.group({
			id: null,
			code: null,
			description: null,
			priority: null,
			category: null,
			type: null,
			dataType: null,
			maxLength: null,
			measurementUnit: null,
			visibilityCond: null,
			visibilityFlag: null,
			requiredFlag: null,
			modFlag: null,
			copyFlag: null,
			note: null,
			answers: answers
		}));
		for (let i = 0; i < n; i++)
			this.addAnswer(answers);
	}

	addAnswer(answers: FormArray) {
		answers.push(this.fb.group({
				id: null,
				code: null,
				description: null,
				priority: null,
				type: null,
				highLimit: null,
				lowLimit: null,
				category: null,
				citAnag: null,
				defaultAns: null,
				executor: null,
				visibilityCond: null,
				note: null,
			}));
	}

	onSubmit() {
		const difference = this.diff.createMaskDifference(this.data, this.maskAnagForm.value);
		console.log('DIFFERENCE: ' + JSON.stringify(difference));
	}
}
