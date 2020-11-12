import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pmf-mask-details',
  templateUrl: './mask-details.component.html',
  styleUrls: ['./mask-details.component.css']
})
export class MaskDetailsComponent implements OnInit {

	id: number;

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.id = +this.route.snapshot.paramMap.get('id');
	}


}
