import { HttpClient, HttpParams } from '@angular/common/http';
import { env } from 'src/env/env';
import { Injectable } from '@angular/core';
import { Product } from '../modules/stock/models/Product';

@Injectable({ providedIn: 'root' })
export class StockService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(env.baseUrl + 'Product');
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Product', { params: queryParam });
  }

  getProduct(id: number) {
    return this.http.get(env.baseUrl + 'Product/' + id);
  }

  createProducts(product: Product) {
    return this.http.post(env.baseUrl + 'Product', product);
  }

  updateProducts(product: Product, id: number) {
    return this.http.put(env.baseUrl + 'Product/' + id, product);
  }

  removeProducts(id: number) {
    return this.http.delete(env.baseUrl + 'Product/' + id);
  }
}
