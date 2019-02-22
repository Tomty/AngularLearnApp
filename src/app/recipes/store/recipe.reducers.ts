import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
	recipes: State;
}

export interface State {
	recipes: Recipe[];
}

const initialState: State = {
	recipes: [
		new Recipe(
			'A test Recipe',
			'This is a test description',
			'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg',
			[ new Ingredient('Meat', 1), new Ingredient('French Fries', 20) ]
		),
		new Recipe(
			'A test Recipe2',
			'This is a test description2',
			'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg',
			[ new Ingredient('Buns', 2), new Ingredient('Meat', 1) ]
		)
	]
};

export function recipeReducers(state = initialState, action: RecipeActions.RecipeActions) {
	switch (action.type) {
		case RecipeActions.SET_RECIPES:
			return {
				...state,
				recipes: [ ...action.payload ]
			};
		case RecipeActions.ADD_RECIPE:
			return {
				...state,
				recipes: [ ...state.recipes, action.payload ]
			};
		case RecipeActions.UPDATE_RECIPE:
			const recipe = state.recipes[action.payload.index];
			const updatedRecipe = {
				...recipe,
				...action.payload.updatedRecipe
			};
			const recipes = [ ...state.recipes ];
			recipes[action.payload.index] = updatedRecipe;
			return {
				...state,
				recipes: recipes
			};
		case RecipeActions.DELETE_RECIPE:
			const newRecipes = [ ...state.recipes ];
			newRecipes.splice(action.payload, 1);
			return {
				...state,
				recipes: newRecipes
			};
		default:
			return state;
	}

	return state;
}
