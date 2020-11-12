import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface MenuItem {
	label: string;
	icon: string;
	route: string;
}

@Component({
	selector: 'pmf-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.less']
})
export class NavComponent {

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	menuItems: MenuItem[] = [
		{ label: 'Home', icon: 'home', route: '/home' },
		{ label: 'Geo Objects', icon: 'dashboard', route: '/masks/geo-object-list' },
		{ label: 'Masks', icon: 'fact_check', route: '/masks/mask-list' },
	];

	constructor(private breakpointObserver: BreakpointObserver) { }

}
