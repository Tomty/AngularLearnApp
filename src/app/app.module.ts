import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    ShoppingListModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
