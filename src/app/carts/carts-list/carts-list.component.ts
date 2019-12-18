import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartModel } from '../cart.model';
import { CartService } from '../cart.service'

@Component({
  selector: 'sc-carts-list',
  templateUrl: './carts-list.component.html',
  styleUrls: ['./carts-list.component.css']
})
export class CartsListComponent implements OnInit {
  carts: CartModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.carts = [];
    this.cartService.getAllCarts().subscribe(carts => {
      this.carts = carts;
    });
  }

  viewCart(cart: CartModel) {
    this.router.navigate([`/cart/${cart.id}`]);
  }

}
