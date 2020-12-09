import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UtilityEffects } from './store/utility.effects';
import * as fromUtility from './store/utility.reducer';


@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(fromUtility.utilityFeatureKey, fromUtility.reducer),
		EffectsModule.forFeature([UtilityEffects])
	]
})
export class UtilityModule { }
