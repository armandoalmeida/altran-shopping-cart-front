import { Component, OnInit } from '@angular/core';
import { CartModel } from '../carts/cart.model'
import { ShoppingCartService } from './shopping-cart/shopping-cart.service'

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  shoppingCart: CartModel;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.shoppingCartService.getCart().then(cart => {
      this.shoppingCart = cart;
    })
  }

  updateCart($event) {
    this.shoppingCart = $event;
  }

}
