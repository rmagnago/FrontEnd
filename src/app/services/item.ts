import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private apiUrl = 'http://localhost:8080/api/item';

    constructor(private http: HttpClient) { }

    getItens(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl);
    }

    getItemById(id: number): Observable<Item> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Item>(url);
    }

    criarItem(Item: Item): Observable<Item> {
        const url = `${this.apiUrl}/novo`;
        return this.http.post<Item>(url, Item);
    }

    atualizarItem(Item: Item, id: number): Observable<Item> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.put<Item>(url, Item);
    }

    deletarItem(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}