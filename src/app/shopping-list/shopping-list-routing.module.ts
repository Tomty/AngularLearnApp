import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";

const shoppingRoutes: Routes = [
    { path: 'shopping-list', component: ShoppingListComponent, data: { animation: 'isRight' } }
];

@NgModule({
    imports: [RouterModule.forChild(shoppingRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule {

}