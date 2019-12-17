import { Injectable } from '@angular/core';
import { ShoppingCartModel } from './shopping-cart.model';
import { ItemModel } from '../../items/item.model';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../auth/login/login.service'
import { Observable } from 'rxjs';

import { environment as env } from '../../../environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ShoppingCartService {
    cart: ShoppingCartModel;
    shoppingCartUrl: string;

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) {
        this.shoppingCartUrl = env.backEndUrl + "/carts";
    }

    getOpenedCart(): Observable<ShoppingCartModel> {
        let getOpenedCartUrl = `${this.shoppingCartUrl}/open/${this.loginService.getUserInfo().sub}`
        return this.http.get<ShoppingCartModel>(getOpenedCartUrl, { headers: this.loginService.getHeaders() });
    }

    getCart(): Promise<ShoppingCartModel> {
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

    addItem(item: ItemModel): Observable<ShoppingCartModel> {
        return this.http.post<ShoppingCartModel>(this.getItemUrl(item), {},
            { headers: this.loginService.getHeaders() });
    }

    removeItem(item: ItemModel): Observable<ShoppingCartModel> {
        return this.http.delete<ShoppingCartModel>(this.getItemUrl(item),
            { headers: this.loginService.getHeaders() });
    }

    removeAllItems(item: ItemModel): Observable<ShoppingCartModel> {
        return this.http.delete<ShoppingCartModel>(this.getItemUrl(item).replace("item", "all"),
            { headers: this.loginService.getHeaders() });
    }
}