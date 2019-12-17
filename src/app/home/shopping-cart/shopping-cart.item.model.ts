import { ItemModel } from '../../items/item.model'

export class ShoppingCartItemModel {
    constructor(
        public item: ItemModel,
        public qtd: number
    ) { }
}