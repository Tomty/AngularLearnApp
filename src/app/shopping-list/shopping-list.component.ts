import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as SLActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit/*, OnDestroy */{

  ingredients: Ingredient[];

  //NgRx Store
  ShoppingListState : Observable<{ingredients: Ingredient[]}>;

  //Services
  //private subscription: Subscription

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    // Using Services
    //this.ingredients = this.shoppingListService.getIngredients();
    /*
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
      */

     //Using NgRx Store  
     this.ShoppingListState = this.store.select('shoppingList');
  }

  //Services
  /*
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  */

  onEditItem(index: number){
    //Services
    //this.shoppingListService.startedEditing.next(index);

    //NgRx Store
    this.store.dispatch(new SLActions.StartEdit(index));
  }
}
