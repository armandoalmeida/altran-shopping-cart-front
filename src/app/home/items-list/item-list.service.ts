import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ItemListModel } from './item-list.model'
import { LoginService } from '../../auth/login/login.service'

import { environment as env } from '../../../environments/environment'

@Injectable()
export class ItemListService {
    items: ItemListModel[] = []

    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) { }

    getItens(): Observable<ItemListModel[]> {
        return this.http.get<ItemListModel[]>(
            `${env.backEndUrl}/items`, { headers: this.loginService.getHeaders() }
        ).pipe(tap(items => this.items = items));

        // return this.items;
        // return [
        //     new ItemListModel("1", "Teste 1", 123),
        //     new ItemListModel("2", "Teste 2", 456),
        //     new ItemListModel("3", "Teste 3", 789),
        // ]
    }
}