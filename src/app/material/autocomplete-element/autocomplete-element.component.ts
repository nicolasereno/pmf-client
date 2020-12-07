import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';

@Component({
	selector: 'pmf-autocomplete-element',
	templateUrl: './autocomplete-element.component.html',
	styleUrls: ['./autocomplete-element.component.css']
})
export class AutocompleteElementComponent implements OnInit {

	@Input() form: NgForm;
	@Input() name: string;
	@Input() label: string;
	@Input() view?: string;
	@Input() get?: string;
	@Input() options: any[];
	filteredOptions$: Observable<any[]>;

	constructor() { }

	ngOnInit(): void {
		this.filteredOptions$ = this.form.controls[this.name].valueChanges
			.pipe(
				startWith(''),
				map(value => typeof value === 'string' ? value : value[this.view]),
				map(name => name ? this.filter(name) : this.options.slice())
			);
	}

	private filter(name: string): any[] {
		const filterValue = name.toLowerCase();
		return this.options.filter(option => option[this.view].toLowerCase().indexOf(filterValue) >= 0);
	}

//FIXME: Non prende correttamente il view
	display(data: any): string {
		return data && data['description'] ? data['description'] : '';
//		return data && data[this.view] ? data[this.view] : '';
	}
}
