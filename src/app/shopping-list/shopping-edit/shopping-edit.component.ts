import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store'

import * as SLActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  //editedItemIndex: number;
  editedItem : Ingredient;

  constructor(/*private shoppingListService: ShoppingListService,*/ private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {

    //NgRx Store
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          } else {
            this.editMode = false;
          }
        }
      );

    // Services  
    /*
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
    */
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(
      value.name,
      value.amount
    );
    if (this.editMode){
      //Services
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);

      //NgRx Store
      this.store.dispatch(new SLActions.UpdateIngredient({ ingredient: newIngredient}))
    }
    else{
      //Using Services
      //this.shoppingListService.addIngredient(newIngredient);

      //Using NgRx Store
      this.store.dispatch(new SLActions.AddIngredient(newIngredient)); 
    }

    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    //Services
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);

    //NgRx Store
    this.store.dispatch(new SLActions.DeleteIngredient());

    this.onClear();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SLActions.StopEdit())
    this.subscription.unsubscribe();
  }

}
