import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get(env.baseUrl + 'Customer');
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Customer', { params: queryParam });
  }

  get(id: number) {
    return this.http.get(env.baseUrl + 'Customer/' + id);
  }

  create(customer: Customer) {
    return this.http.post(env.baseUrl + 'Customer', customer);
  }

  update(customer: Customer, id: number) {
    return this.http.put(env.baseUrl + 'Customer/' + id, customer);
  }

  remove(id: number) {
    return this.http.delete(env.baseUrl + 'Customer/' + id);
  }
}
