import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectEdits } from 'src/app/model/model';
import * as fromUtility from '../utility/store/utility.reducer';
import * as utilitySelectors from '../utility/store/utility.selectors';


@Component({
	selector: 'pmf-modifications',
	templateUrl: './modifications.component.html',
	styleUrls: ['./modifications.component.css']
})
export class ModificationsComponent implements OnInit {

	projectEdits$: Observable<ProjectEdits>;

	constructor(private utilityStore: Store<fromUtility.State>) { }

	ngOnInit(): void {
		this.projectEdits$ = this.utilityStore.select(utilitySelectors.getProjectEdits);
	}

}
