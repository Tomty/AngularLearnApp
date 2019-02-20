import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { HttpRequest, HttpClient } from '@angular/common/http';


@Injectable()
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService){}

    storeRecipes(){
        /*
        const token = this.authService.getToken();

        return this.http.put('https://angularlearn-recipe-book.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipes());
        */
        const req = new HttpRequest('PUT', 'https://angularlearn-recipe-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true});
        return this.httpClient.request(req);
    }

    getRecipes() {

        /*
        const token = this.authService.getToken();

        this.http.get('https://angularlearn-recipe-book.firebaseio.com/recipes.json?auth='+token)
            .pipe(
                map((response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if(!recipe['ingredients']){
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                })
            ).subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
        */
        this.httpClient.get<Recipe[]>(
            'https://angularlearn-recipe-book.firebaseio.com/recipes.json', 
            { observe: 'body', responseType: 'json'})
                .pipe(
                    map(
                        (recipes) => {
                          console.log(recipes);
                          for (let recipe of recipes) {
                            if (!recipe['ingredients']) {
                              recipe['ingredients'] = [];
                            }
                          }
                          return recipes;
                        }
                      )
                ).subscribe(
                    (recipes: Recipe[]) => {
                      this.recipeService.setRecipes(recipes);
                    }
                  );

    }

}