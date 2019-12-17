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

    getItemIdUrl(item: ItemModel): string {
        return `${this.itemsUrls}/${item.id}`
    }

    save(item: ItemModel): Observable<any> {
        return this.http.post(this.itemsUrls, item, { headers: this.loginService.getHeaders() });
    }

    del(item: ItemModel) {
        return this.http.delete(this.getItemIdUrl(item), { headers: this.loginService.getHeaders() });
    }

}
