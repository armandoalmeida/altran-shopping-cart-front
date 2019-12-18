import { ShoppingCartItemModel } from '../home/shopping-cart/shopping-cart.item.model'

export class CartModel {
    constructor(
        public id: string,
        public items: ShoppingCartItemModel[],
        public status: string,
        public total: number
    ) { }
}