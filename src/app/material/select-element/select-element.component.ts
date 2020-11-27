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

}
