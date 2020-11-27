import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromUtility from './store/utility.reducer';
import { UtilityEffects } from './store/utility.effects';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(fromUtility.utilityFeatureKey, fromUtility.reducer),
		EffectsModule.forFeature([UtilityEffects])
	]
})
export class UtilityModule { }
