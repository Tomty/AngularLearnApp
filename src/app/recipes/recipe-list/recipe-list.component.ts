import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipesState: Observable<fromRecipe.State>;

  constructor(private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }
}
