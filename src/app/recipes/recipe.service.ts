import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {
 
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [ 
        new Recipe(
            'A test Recipe', 
            'This is a test description', 
            'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ] 
        ),
        new Recipe(
            'A test Recipe2', 
            'This is a test description2', 
            'https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ] 
        )
      ];

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.notifyRecipesChanged();
      }

      notifyRecipesChanged(){
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipeById(id: number) {
        return this.recipes[id];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.notifyRecipesChanged();
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.notifyRecipesChanged();
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.notifyRecipesChanged();
      }


}