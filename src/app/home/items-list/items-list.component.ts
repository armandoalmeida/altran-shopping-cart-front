import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ItemListService } from './item-list.service'
import { ItemService } from '../../items/items.service'
import { ItemModel } from '../../items/item.model'
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service'
import { ShoppingCartModel } from '../shopping-cart/shopping-cart.model'
import { Router, NavigationEnd } from '@angular/router';

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sc-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  items: ItemModel[]
  @Output() cartOutput = new EventEmitter<ShoppingCartModel>();
  edit: boolean;

  constructor(
    private itemListService: ItemListService,
    private shoppingCartService: ShoppingCartService,
    private itemService: ItemService,
    private router: Router,
  ) {
    this.edit = this.router.url == '/items'
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemListService.getItens().subscribe(items => {
      this.items = items;
    });
  }

  addItemToShoppingCart(item: ItemModel): void {
    this.shoppingCartService.addItem(item).subscribe(cart => {
      this.cartOutput.emit(cart);
    })
  }

  deleteItem(item: ItemModel) {
    this.itemService.del(item).subscribe(
      item => { this.loadItems() },
      err => { alert(err.error.message) }
    );
  }

}
