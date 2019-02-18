import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

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

    getIngredient(index: number){
        return this.ingredients[index];
    }

    updateIngredient(index: number, newIngredient: Ingredient)
    {
        this.ingredients[index] = newIngredient;
        this.notifyIngredientChanged();
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.notifyIngredientChanged();
    }

}
