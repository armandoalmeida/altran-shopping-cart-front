import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ItemModel } from '../../items/item.model'
import { LoginService } from '../../auth/login/login.service'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class ItemListService {
    items: ItemModel[] = []

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) { }

    getItens(): Observable<ItemModel[]> {
        return this.http.get<ItemModel[]>(
            `${env.backEndUrl}/items`, { headers: this.loginService.getHeaders() }
        ).pipe(tap(items => this.items = items));
    }
}