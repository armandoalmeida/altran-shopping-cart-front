import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './auth/login/login.component'
import { UsersComponent } from './auth/users/users.component'
import { ItemComponent } from './items/item/item.component'
import { ItemsListComponent } from './home/items-list/items-list.component'
import { CartComponent } from './carts/cart/cart.component'
import { CartsListComponent } from './carts/carts-list/carts-list.component'

import { LoggedInGuard } from './auth/loggedin.guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: '', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'items', component: ItemsListComponent, canActivate: [LoggedInGuard] },
  { path: 'add-item', component: ItemComponent, canActivate: [LoggedInGuard] },
  { path: 'edit-item/:id', component: ItemComponent, canActivate: [LoggedInGuard] },
  { path: 'profile', component: UsersComponent, canActivate: [LoggedInGuard] },
  { path: 'carts', component: CartsListComponent, canActivate: [LoggedInGuard] },
  { path: 'cart/:id', component: CartComponent, canActivate: [LoggedInGuard] },
  // { path:'**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AppRoutingModule { }
