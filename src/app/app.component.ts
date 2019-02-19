import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseEnv } from '../environments/firebaseEnv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
