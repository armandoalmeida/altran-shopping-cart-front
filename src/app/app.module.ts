import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './home/items-list/items-list.component';
import { ShoppingCartComponent } from './home/shopping-cart/shopping-cart.component';
import { ItemListService } from './home/items-list/item-list.service'
import { ShoppingCartService } from './home/shopping-cart/shopping-cart.service';
import { LoginComponent } from './auth/login/login.component'
import { LoginService } from './auth/login/login.service';
import { UsersComponent } from './auth/users/users.component';
import { UsersService } from './auth/users/users.service';
import { AddItemComponent } from './items/add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ItemsListComponent,
    ShoppingCartComponent,
    LoginComponent,
    UsersComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [
    ItemListService,
    ShoppingCartService,
    LoginService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
