import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
	@Effect()
	recipeFetch = this.action$.pipe(
		ofType(RecipeActions.FETCH_RECIPES),
		switchMap((action: RecipeActions.FetchRecipe) => {
			return this.httpClient.get<Recipe[]>('https://angularlearn-recipe-book.firebaseio.com/recipes.json', {
				observe: 'body',
				responseType: 'json'
			});
		}),
		map((recipes) => {
			console.log(recipes);
			for (let recipe of recipes) {
				if (!recipe['ingredients']) {
					recipe['ingredients'] = [];
				}
			}
			return {
				type: RecipeActions.SET_RECIPES,
				payload: recipes
			};
		})
	);

	@Effect({ dispatch: false })
	recipeStore = this.action$.pipe(
		ofType(RecipeActions.STORE_RECIPES),
		withLatestFrom(this.store.select('recipes')),
		switchMap(([ action, state ]) => {
			const req = new HttpRequest(
				'PUT',
				'https://angularlearn-recipe-book.firebaseio.com/recipes.json',
				state.recipes,
				{ reportProgress: true }
			);
			return this.httpClient.request(req);
		})
	);

	constructor(
		private action$: Actions,
		private httpClient: HttpClient,
		private store: Store<fromRecipe.FeatureState>
	) {}
}
