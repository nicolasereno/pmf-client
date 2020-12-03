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
		id: null, code: null, description: null, tisp: null, tecnicalMask: null, version: null, paymentList: null, techSite: null, questions: this.fb.array([]),
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
		this.data.questions.forEach((q) => {
			this.addQuestion();
			q.answers.forEach((a) => this.addAnswer(this.questionControls().length - 1));
		});
		// Decodifiche
		this.utilityStore.select(utilitySelectors.getTechSites).pipe(filter(d => d != null), take(1)).subscribe(d => this.techSites = d);
		this.utilityStore.select(utilitySelectors.getPaymentLists).pipe(filter(d => d != null), take(1)).subscribe(d => this.paymentLists = d);
		this.utilityStore.select(utilitySelectors.getCategories).pipe(filter(d => d != null), take(1)).subscribe(d => this.categories = d);
		this.utilityStore.select(utilitySelectors.getDataTypes).pipe(filter(d => d != null), take(1)).subscribe(d => this.dataTypes = d);
		this.utilityStore.select(utilitySelectors.getMeasurementUnits).pipe(filter(d => d != null), take(1)).subscribe(d => this.measurementUnits = d);
		this.utilityStore.select(utilitySelectors.getQuestionTypes).pipe(filter(d => d != null), take(1)).subscribe(d => this.questionTypes = d);
		this.utilityStore.select(utilitySelectors.getExecutors).pipe(filter(d => d != null), take(1)).subscribe(d => this.executors = d);

		this.maskAnagForm.setValue(this.data);
	}

	questionControls() {
		return (<FormArray>this.maskAnagForm.controls.questions).controls;
	}

	answerControls(i: number) {
		return (<FormArray>(<FormGroup>this.questionControls()[i]).controls.answers).controls;
	}

	questionFormGroup(i: number) {
		return (<FormGroup>this.questionControls()[i]);
	}

	answerFormGroup(i: number, j: number) {
		return (<FormGroup>this.answerControls(i)[j]);
	}

	addQuestion() {
		const answers = this.fb.array([]);
		(<FormArray>this.maskAnagForm.controls.questions).push(this.fb.group({
			id: null, code: null, description: null, priority: null, category: null, type: null, dataType: null, maxLength: null, measurementUnit: null, visibilityCond: null, visibilityFlag: null, requiredFlag: null, modFlag: null, copyFlag: null, note: null, answers: answers
		}));
		if ((<FormArray>this.maskAnagForm.controls.questions).length > this.data.questions.length)
			this.data.questions.push({ answers: [] });
	}

	addAnswer(i: number) {
		(<FormArray>(<FormGroup>this.questionControls()[i]).controls.answers).push(this.fb.group({
			id: null, code: null, description: null, priority: null, type: null, highLimit: null, lowLimit: null, category: null, citAnag: null, defaultAns: null, executor: null, visibilityCond: null, note: null,
		}));
		if ((<FormArray>(<FormGroup>this.questionControls()[i]).controls.answers).length > this.data.questions[i].answers.length)
			this.data.questions[i].answers.push({});
	}

	removeQuestion(i: number, e?: MouseEvent) {
		if (e)
			e.stopPropagation();
		if (this.questionFormGroup(i).controls['id'].value == null) {
			// non presente in db: lo elimino
			this.questionControls().splice(i, 1);
			this.data.questions.splice(i, 1);
		} else
			this.questionFormGroup(i).controls['id'].setValue(-1 * this.questionFormGroup(i).controls['id'].value);
	}

	removeAnswer(i: number, j: number, e?: MouseEvent) {
		if (e)
			e.stopPropagation();
		if (this.answerFormGroup(i, j).controls['id'].value == null) {
			// non presente in db: lo elimino
			this.answerControls(i).splice(j, 1);
			this.data.questions[i].answers.splice(j, 1);
		} else
			this.answerFormGroup(i, j).controls['id'].setValue(-1 * this.answerFormGroup(i, j).controls['id'].value);
	}

	onSubmit() {
		const difference = this.diff.createMaskDifference(this.data, this.maskAnagForm.value);
	}
}
