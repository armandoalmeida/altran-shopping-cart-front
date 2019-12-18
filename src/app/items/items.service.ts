import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../auth/login/login.service'
import { ItemModel } from './item.model'
import { environment as env } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private itemsUrls: string;

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) {
        this.itemsUrls = env.backEndUrl + '/items';
    }

    getItemIdUrl(itemId: string): string {
        return `${this.itemsUrls}/${itemId}`
    }

    get(itemId: string): Observable<ItemModel> {
        return this.http.get<ItemModel>(this.getItemIdUrl(itemId), { headers: this.loginService.getHeaders() });
    }

    save(item: ItemModel, editing: boolean) {
        if (editing)
            return this.http.put(this.getItemIdUrl(item.id), item, { headers: this.loginService.getHeaders() });
        return this.http.post(this.itemsUrls, item, { headers: this.loginService.getHeaders() });
    }

    del(item: ItemModel) {
        return this.http.delete(this.getItemIdUrl(item.id), { headers: this.loginService.getHeaders() });
    }

}
