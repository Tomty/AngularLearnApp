import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 10)
      ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.notifyIngredientChanged();
    }

    addIngredientFromShoppingList(ingredients: Ingredient[])
    {
        this.ingredients.push(...ingredients);
        this.notifyIngredientChanged();
    }

    private notifyIngredientChanged(){
        this.ingredientsChanged.next(this.ingredients.slice());
    }


}