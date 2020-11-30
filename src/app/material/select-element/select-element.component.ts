import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'pmf-select-element',
	templateUrl: './select-element.component.html',
	styleUrls: ['./select-element.component.css']
})
export class SelectElementComponent {

	@Input() form: NgForm;
	@Input() name: string;
	@Input() label: string;
	@Input() view?: string;
	@Input() get?: string;
	@Input() options: [];

	compareObjects(o1: any, o2: any): boolean {
		if (o1 == null || o2 == null)
			return false;
		if (this.get)
			return o1[this.get] === o2[this.get];
		else 
			return o1['id'] === o2['id'];
	}

}
