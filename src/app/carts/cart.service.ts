import { Injectable } from '@angular/core';
import { CartModel } from './cart.model';
import { ItemModel } from '../items/item.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../auth/login/login.service'
import { Observable } from 'rxjs';

import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartModel;
  cartUrl: string;

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    this.cartUrl = env.backEndUrl + "/carts";
  }

  getOpenedCart(): Observable<CartModel> {
    let getOpenedCartUrl = `${this.cartUrl}/${this.loginService.getUserInfo().sub}/open`
    return this.http.get<CartModel>(getOpenedCartUrl, { headers: this.loginService.getHeaders() });
  }

  getAllCarts(): Observable<CartModel[]> {
    let getCartsUrl = `${this.cartUrl}/${this.loginService.getUserInfo().sub}/all`
    return this.http.get<CartModel[]>(getCartsUrl, { headers: this.loginService.getHeaders() });
  }

  getCartIdUrl(cartId: string): string {
    return `${this.cartUrl}/${cartId}`
  }

  get(cartId: string): Observable<CartModel> {
    return this.http.get<CartModel>(this.getCartIdUrl(cartId), { headers: this.loginService.getHeaders() });
  }

  close(cartId: string): Observable<CartModel> {
    return this.http.post<CartModel>(`${this.getCartIdUrl(cartId)}/close`, {},
      { headers: this.loginService.getHeaders() });
  }

  view() {

  }

}
