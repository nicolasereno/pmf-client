import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'pmf-check-element',
	templateUrl: './check-element.component.html',
	styleUrls: ['./check-element.component.css']
})
export class CheckElementComponent {

	@Input() form: NgForm;
	@Input() name: string;
	@Input() label: string;

}
