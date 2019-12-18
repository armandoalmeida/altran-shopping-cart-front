import { Injectable } from '@angular/core';
import { CartModel } from '../../carts/cart.model';
import { ItemModel } from '../../items/item.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/login/login.service'
import { Observable } from 'rxjs';

import { environment as env } from '../../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    cart: CartModel;
    shoppingCartUrl: string;

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) {
        this.shoppingCartUrl = env.backEndUrl + "/carts";
    }

    getOpenedCart(): Observable<CartModel> {
        let getOpenedCartUrl = `${this.shoppingCartUrl}/${this.loginService.getUserInfo().sub}/open`
        return this.http.get<CartModel>(getOpenedCartUrl, { headers: this.loginService.getHeaders() });
    }

    getCart(): Promise<CartModel> {
        return new Promise((resolve, reject) => {
            this.getOpenedCart().subscribe(cart => {
                this.cart = cart;
                resolve(this.cart)
            });
        })
    }

    getItemUrl(item: ItemModel): string {
        return `${this.shoppingCartUrl}/${this.cart.id}/item/${item.id}`;
    }

    addItem(item: ItemModel): Observable<CartModel> {
        return this.http.post<CartModel>(this.getItemUrl(item), {},
            { headers: this.loginService.getHeaders() });
    }

    removeItem(item: ItemModel): Observable<CartModel> {
        return this.http.delete<CartModel>(this.getItemUrl(item),
            { headers: this.loginService.getHeaders() });
    }

    removeAllItems(item: ItemModel): Observable<CartModel> {
        return this.http.delete<CartModel>(this.getItemUrl(item).replace("item", "all"),
            { headers: this.loginService.getHeaders() });
    }

    orderItems(cart: CartModel): CartModel {
        cart.items.sort((item1, item2) => {
            return item1.item.value-item2.item.value;
        })
        return cart;
    }
}