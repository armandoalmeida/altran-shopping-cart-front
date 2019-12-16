import { ItemListModel } from '../items-list/item-list.model'

export class ShoppingCartItemModel {
    constructor(
        public item: ItemListModel,
        public qtd: number
    ) { }
}