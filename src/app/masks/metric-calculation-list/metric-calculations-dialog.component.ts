import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { MetricCalculation } from 'src/app/model/model';
import * as masksActions from '../store/masks.actions';
import * as fromMasks from '../store/masks.reducer';


@Component({
	selector: 'pmf-metric-calculations-dialog',
	templateUrl: './metric-calculations-dialog.component.html',
	styleUrls: ['./metric-calculations-dialog.component.css']
})
export class MetricCalculationsDialogComponent implements OnInit {

	constructor(
		private masksStore: Store<fromMasks.State>,
		private dialogRef: MatDialogRef<MetricCalculationsDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: MetricCalculation[]) { }

	ngOnInit() {
		this.dialogRef.beforeClosed().pipe(take(1)).subscribe(() => this.masksStore.dispatch(new masksActions.LoadMetricCalculationsSuccess(null)));
	}
}
