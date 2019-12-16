import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ItemListService } from './item-list.service'
import { ItemListModel } from './item-list.model'
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service'
import { ShoppingCartModel } from '../shopping-cart/shopping-cart.model'

@Component({
  selector: 'sc-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: ItemListModel[]
  @Output() cartOutput = new EventEmitter<ShoppingCartModel>();

  constructor(
    private itemListService: ItemListService,
    private shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.itemListService.getItens().subscribe(items => {
      this.items = items;
    });
  }

  addItemToShoppingCart(item: ItemListModel): void {
    this.shoppingCartService.addItem(item).subscribe(cart => {
      this.cartOutput.emit(cart);
    })
  }

}
