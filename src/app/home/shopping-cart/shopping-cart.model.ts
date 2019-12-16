import { ShoppingCartItemModel } from './shopping-cart.item.model'

export class ShoppingCartModel {
    constructor(
        public id: string,
        public items: ShoppingCartItemModel[],
        public status: string,
        public total: number
    ) { }
}