import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface IsDirty {
	isDirty(): boolean;
}

@Injectable({
	providedIn: 'root'
})
export class DirtyGuard implements CanDeactivate<IsDirty> {

	canDeactivate(component: IsDirty): boolean | Observable<boolean> {
		return !component.isDirty();
	}
}
