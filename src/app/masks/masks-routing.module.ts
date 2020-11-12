import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoObjectListComponent } from './geo-object-list/geo-object-list.component';
import { GeoObjectDetailsComponent } from './geo-object-details/geo-object-details.component';
import { MaskListComponent } from './mask-list/mask-list.component';
import { MaskDetailsComponent } from './mask-details/mask-details.component';
import { QuestionListComponent } from './question-list/question-list.component';

const routes: Routes = [
	{ path: 'geo-object-list', component: GeoObjectListComponent },
	{ path: 'geo-object-details/:id', component: GeoObjectDetailsComponent },
	{ path: 'mask-list', component: MaskListComponent },
	{ path: 'mask-details/:id', component: MaskDetailsComponent },

	// TEMP
	{ path: 'question-list', component: QuestionListComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MasksRoutingModule { }
