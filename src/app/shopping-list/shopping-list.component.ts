import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as SLActions from './store/shopping-list.actions';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *',[ 
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void',[ 
        animate(300, 
          style({
            opacity: 0,
            transform: 'translateX(100px)'
          })
        )
      ])
    ])
  ]
})
export class ShoppingListComponent implements OnInit/*, OnDestroy */{

  ingredients: Ingredient[];

  //NgRx Store
  ShoppingListState : Observable<{ingredients: Ingredient[]}>;

  //Services
  //private subscription: Subscription

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }

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
