import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'pmf-geo-object-details',
	templateUrl: './geo-object-details.component.html',
	styleUrls: ['./geo-object-details.component.css']
})
export class GeoObjectDetailsComponent implements OnInit {

	id: number;

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
	}

}
