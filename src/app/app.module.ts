import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApiModule as MockApiModule, Configuration as MockConfiguration } from '@enel/pmf-mock-be';
import { ApiModule as ApiModule, Configuration } from '@enel/pmf-be';


import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './material/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		SharedModule,
		HttpClientModule,
		MockApiModule.forRoot(() => new MockConfiguration()),
		ApiModule.forRoot(() => new Configuration()),
		StoreModule.forRoot({}),
		EffectsModule.forRoot([]),
		StoreDevtoolsModule.instrument({
			name: 'PMF DevTools',
			maxAge: 25,
			logOnly: environment.production,
		}),
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatRadioModule,
		MatCardModule,
		ReactiveFormsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
