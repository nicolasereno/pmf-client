import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MasksRoutingModule } from './masks-routing.module';
import { GeoObjectListComponent } from './geo-object-list/geo-object-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromMasks from './store/masks.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MasksEffects } from './store/masks.effects';
import { SharedModule } from '../material/shared.module';
import { GeoObjectDetailsComponent } from './geo-object-details/geo-object-details.component';
import { MaskListComponent } from './mask-list/mask-list.component';
import { MaskDetailsComponent } from './mask-details/mask-details.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { MetricCalculationListComponent } from './metric-calculation-list/metric-calculation-list.component';


@NgModule({
	declarations: [GeoObjectListComponent, GeoObjectDetailsComponent, MaskListComponent, MaskDetailsComponent, QuestionListComponent, AnswerListComponent, MetricCalculationListComponent],
	imports: [
		CommonModule,
		MasksRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		StoreModule.forFeature(fromMasks.masksFeatureKey, fromMasks.reducer),
		EffectsModule.forFeature([MasksEffects])
	]
})
export class MasksModule { }
