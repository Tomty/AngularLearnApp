import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

export class RecipeService {
 
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

      getRecipes() {
          return this.recipes.slice();
      }

      getRecipeById(id: number) {
        return this.recipes[id];
      }

}