import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as SLActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService, 
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromShoppingList.AppState>
            ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {this.id = +params['id'];
      this.recipe = this.recipeService.getRecipeById(this.id);}
    );
  }

  toShoppingList(){
    //Services
    //this.shoppingListService.addIngredientFromShoppingList(this.recipe.ingredients);

    //NgRx Store
    this.store.dispatch(new SLActions.AddIngredients(this.recipe.ingredients));
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
