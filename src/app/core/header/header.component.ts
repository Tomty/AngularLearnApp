import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  authState: Observable<fromAuth.State>;

  constructor(private dataService: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData(){
    /*
    this.dataService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
    );
    */
   this.dataService.storeRecipes()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  onFetchData(){
    this.dataService.getRecipes();
  }

  onLogout(){
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.Logout());
  }

}
