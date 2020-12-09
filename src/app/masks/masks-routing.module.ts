import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeoObjectListComponent } from './geo-object-list/geo-object-list.component';
import { GeoObjectDetailsComponent } from './geo-object-details/geo-object-details.component';
import { MaskListComponent } from './mask-list/mask-list.component';
import { MaskDetailsComponent } from './mask-details/mask-details.component';
import { MaskDetailsResolverService } from './mask-details/mask-details-resolver.service';

const routes: Routes = [
	{ path: 'geo-object-list', component: GeoObjectListComponent },
	{ path: 'geo-object-details/:mode', component: GeoObjectDetailsComponent },
	{ path: 'geo-object-details/:mode/:id', component: GeoObjectDetailsComponent },
	{ path: 'mask-list', component: MaskListComponent },
	{ path: 'mask-details/:mode', component: MaskDetailsComponent, resolve: { data: MaskDetailsResolverService } },
	{ path: 'mask-details/:mode/:id', component: MaskDetailsComponent, resolve: { data: MaskDetailsResolverService } },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MasksRoutingModule { }
