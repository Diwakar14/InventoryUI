import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(queryParam?: HttpParams) {
    return this.http.get(env.baseUrl + 'Order', { params: queryParam });
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Order', { params: queryParam });
  }

  getOrder(id: number) {
    return this.http.get(env.baseUrl + 'Order/' + id);
  }

  createOrders(order: any) {
    return this.http.post(env.baseUrl + 'Order', order);
  }

  updateOrders(order: any, id: number) {
    return this.http.put(env.baseUrl + 'Order/' + id, order);
  }

  removeOrders(id: number) {
    return this.http.delete(env.baseUrl + 'Order/' + id);
  }
}
