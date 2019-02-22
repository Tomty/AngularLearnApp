import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseEnv } from '../environments/firebaseEnv';
import { RouterOutlet } from '@angular/router';
import { slider } from './app-route.animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ],
	animations: [ slider ]
})
export class AppComponent implements OnInit {
	title = 'my-first-app';
	loadedFeature: string = 'recipe';

	ngOnInit() {
		firebase.initializeApp({
			apiKey: firebaseEnv.apiKey,
			authDomain: firebaseEnv.authDomain
		});
	}

	onNavigate(feature: string) {
		this.loadedFeature = feature;
	}

	prepareRoute(outlet: RouterOutlet) {
		return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
	}
}
