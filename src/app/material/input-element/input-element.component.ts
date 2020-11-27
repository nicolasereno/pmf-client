import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'pmf-input-element',
	templateUrl: './input-element.component.html',
	styleUrls: ['./input-element.component.css']
})
export class InputElementComponent {

	@Input() form: NgForm;
	@Input() name: string;
	@Input() label: string;
	@Input() type: string = 'text';

}
