import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from '../../carts/cart.model'
import { ItemModel } from '../../items/item.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service'

import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'sc-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() cart: CartModel;
  @Output() cartOutput = new EventEmitter<CartModel>();

  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  addItem(item: ItemModel) {
    this.shoppingCartService.addItem(item).subscribe(cart => {
      this.cartOutput.emit(cart);
      this.cart = this.shoppingCartService.orderItems(cart);
    })
  }

  removeItem(item: ItemModel) {
    this.shoppingCartService.removeItem(item).subscribe(cart => {
      this.cartOutput.emit(cart);
      this.cart = this.shoppingCartService.orderItems(cart);
    })
  }

  removeAllItems(item: ItemModel) {
    this.shoppingCartService.removeAllItems(item).subscribe(cart => {
      this.cartOutput.emit(cart);
      this.cart = this.shoppingCartService.orderItems(cart);
    })
  }

  closeCart() {
    this.router.navigate([`/cart/${this.cart.id}`]);
  }

}
