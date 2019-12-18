import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { CartModel } from '../cart.model';
import { CartService } from '../cart.service'

@Component({
  selector: 'sc-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.cart = new CartModel(null, null, null, null);
    let itemId = this.route.snapshot.paramMap.get("id");
    if (itemId) {
      this.cartService.get(itemId).subscribe(cart => {
        this.cart = this.orderItems(cart);
      });
    }
  }

  closeCart() {
    this.cartService.close(this.cart.id).subscribe(cart => {
      this.router.navigate(['/carts']);
    });
  }

  orderItems(cart: CartModel): CartModel {
    cart.items.sort((item1, item2) => {
        return item1.item.value-item2.item.value;
    })
    return cart;
}

}
