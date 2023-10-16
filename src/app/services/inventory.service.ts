import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(env.baseUrl + 'Inventory');
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Inventory', { params: queryParam });
  }

  get(id: number) {
    return this.http.get(env.baseUrl + 'Inventory/' + id);
  }

  create(inventory: object) {
    return this.http.post(env.baseUrl + 'Inventory', inventory);
  }

  update(inventory: object) {
    return this.http.put(env.baseUrl + 'Inventory', inventory);
  }

  remove(id: number) {
    return this.http.delete(env.baseUrl + 'Inventory/' + id);
  }
}
