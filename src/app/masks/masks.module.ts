import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../material/shared.module';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { FixMaskCodePipe } from './fix-mask-code.pipe';
import { GeoObjectDetailsComponent } from './geo-object-details/geo-object-details.component';
import { GeoObjectListComponent } from './geo-object-list/geo-object-list.component';
import { MaskDetailsComponent } from './mask-details/mask-details.component';
import { MaskListComponent } from './mask-list/mask-list.component';
import { MasksRoutingModule } from './masks-routing.module';
import { MetricCalculationListComponent } from './metric-calculation-list/metric-calculation-list.component';
import { MetricCalculationsDialogComponent } from './metric-calculation-list/metric-calculations-dialog.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { MasksEffects } from './store/masks.effects';
import * as fromMasks from './store/masks.reducer';


@NgModule({
	declarations: [
		GeoObjectListComponent,
		GeoObjectDetailsComponent,
		MaskListComponent,
		MaskDetailsComponent,
		QuestionListComponent,
		AnswerListComponent,
		MetricCalculationListComponent,
		FixMaskCodePipe,
		MetricCalculationsDialogComponent,
	],
	imports: [
		CommonModule,
		MasksRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		StoreModule.forFeature(fromMasks.masksFeatureKey, fromMasks.reducer),
		EffectsModule.forFeature([MasksEffects])
	],
	entryComponents: [
		MetricCalculationsDialogComponent
	],
})
export class MasksModule { }
