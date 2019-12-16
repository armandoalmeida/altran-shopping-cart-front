import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartModel } from './shopping-cart.model'
import { ItemListModel } from '../items-list/item-list.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service'

import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'sc-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() cart: ShoppingCartModel;
  @Output() cartOutput = new EventEmitter<ShoppingCartModel>();

  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  addItem(item: ItemListModel) {
    this.shoppingCartService.addItem(item).subscribe(cart => {
      this.cartOutput.emit(cart);
      this.cart = cart;
    })
  }

  removeItem(item: ItemListModel) {
    this.shoppingCartService.removeItem(item).subscribe(cart => {
      this.cartOutput.emit(cart);
      this.cart = cart;
    })
  }

  removeAllItems(item: ItemListModel) {
    this.shoppingCartService.removeAllItems(item).subscribe(cart => {
      this.cartOutput.emit(cart);
      this.cart = cart;
    })
  }

}
