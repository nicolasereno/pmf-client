import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, take, takeWhile } from 'rxjs/operators';
import { Cit, Mask, MetricCalculation, PaymentList, RemapType, TechSite } from 'src/app/model/model';
import * as fromUtility from '../../utility/store/utility.reducer';
import * as utilitySelectors from '../../utility/store/utility.selectors';
import { DifferencesService } from '../differences.service';
import { MetricCalculationsDialogComponent } from '../metric-calculation-list/metric-calculations-dialog.component';
import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';
import * as maskSelectors from '../store/masks.selectors';


@Component({
	selector: 'pmf-mask-details',
	templateUrl: './mask-details.component.html',
	styleUrls: ['./mask-details.component.css']
})
export class MaskDetailsComponent implements OnInit, OnDestroy {

	active = true;
	ngOnDestroy() {
		this.active = false;
	}

	id: number;
	mode: 'edit' | 'view' | 'create' = 'view';

	paymentLists: PaymentList[];
	techSites: TechSite[];
	executors: RemapType[];
	categories: RemapType[];
	dataTypes: RemapType[];
	measurementUnits: RemapType[];
	questionTypes: RemapType[];
	cits: Cit[];

	flags = [{ id: null, description: '' }, { id: 'Y', description: 'SI' }, { id: 'N', description: 'NO' }];

	maskAnagForm: FormGroup = this.fb.group({
		id: null, code: null, description: null, tisp: null, tecnicalMask: null, version: null, paymentList: null, techSite: null, questions: this.fb.array([]),
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private utilityStore: Store<fromUtility.State>,
		private masksStore: Store<fromMasks.State>,
		private diff: DifferencesService,
		private dialog: MatDialog) { }

	data: Mask;

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
		this.setState(<'edit' | 'view' | 'create'>this.route.snapshot.paramMap.get('mode'));

		// Per reindirizzamento a modalit� di modifica
		this.route.paramMap.pipe(takeWhile(() => this.active))
			.subscribe(m => this.setState(<'edit' | 'view' | 'create'>m.get('mode')));

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
		this.utilityStore.select(utilitySelectors.getCits).pipe(filter(d => d != null), take(1)).subscribe(d => this.cits = d);

		this.masksStore.select(maskSelectors.getMetricCalculations).pipe(filter(d => d != null && d.length > 0), takeWhile(() => this.active)).subscribe(d => this.openDialog(d));

		this.maskAnagForm.patchValue(this.data);
	}

	setState(m: 'edit' | 'view' | 'create') {
		this.mode = m;
		if (this.mode == 'view')
			this.maskAnagForm.disable({ onlySelf: false });
		else
			this.maskAnagForm.enable({ onlySelf: false });
	}

	edit() {
		this.router.navigate(['masks', 'mask-details', 'edit', this.id]);
	}

	showMetricCalculations(answerCode: string, e: MouseEvent) {
		e.stopPropagation();
		this.masksStore.dispatch(new masksActions.LoadMetricCalculations(answerCode));
	}

	openDialog(data: MetricCalculation[]): void {
		this.dialog.open(MetricCalculationsDialogComponent, {
			width: '80vw',
			data: data,
		});
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
		if (this.mode == 'view')
			(<FormArray>this.maskAnagForm.controls.questions).disable();

	}

	addAnswer(i: number) {
		(<FormArray>(<FormGroup>this.questionControls()[i]).controls.answers).push(this.fb.group({
			id: null, code: null, description: null, priority: null, type: null, highLimit: null, lowLimit: null, category: null, cit: null, defaultAns: null, executor: null, visibilityCond: null, note: null,
		}));
		if ((<FormArray>(<FormGroup>this.questionControls()[i]).controls.answers).length > this.data.questions[i].answers.length)
			this.data.questions[i].answers.push({});
		if (this.mode == 'view')
			(<FormArray>(<FormGroup>this.questionControls()[i]).controls.answers).disable();
	}

	removeQuestion(i: number, e?: MouseEvent) {
		e.stopPropagation();
		if (!confirm('Eliminare la domanda?'))
			return;
		if (this.questionFormGroup(i).controls['id'].value == null) {
			// non presente in db: lo elimino
			this.questionControls().splice(i, 1);
			this.data.questions.splice(i, 1);
		} else
			this.questionFormGroup(i).controls['id'].setValue(-1 * this.questionFormGroup(i).controls['id'].value);
	}

	removeAnswer(i: number, j: number, e?: MouseEvent) {
		e.stopPropagation();
		if (!confirm('Eliminare la risposta?'))
			return;
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
