import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { Vendor } from '../modules/vendor/models/Vendor';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  getVendors() {
    return this.http.get(env.baseUrl + 'Vendor');
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Vendor', { params: queryParam });
  }

  getVendor(id: number) {
    return this.http.get(env.baseUrl + 'Vendor/' + id);
  }

  createVendors(vendor: Vendor) {
    return this.http.post(env.baseUrl + 'Vendor', vendor);
  }

  updateVendors(vendor: Vendor, id: number) {
    return this.http.put(env.baseUrl + 'Vendor/' + id, vendor);
  }

  removeVendors(id: number) {
    return this.http.delete(env.baseUrl + 'Vendor/' + id);
  }
}
