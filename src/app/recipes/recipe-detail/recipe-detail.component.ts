import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import * as SLActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';import { Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import { take } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService, 
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>
            ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
      }
    );
  }

  toShoppingList(){
    //Services
    //this.shoppingListService.addIngredientFromShoppingList(this.recipe.ingredients);

    //NgRx Store
    this.store.select('recipes').pipe(take(1)).subscribe(
      (recipeState: fromRecipe.State) => {
        this.store.dispatch(new SLActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      }
    );
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['recipes']);
  }

}
