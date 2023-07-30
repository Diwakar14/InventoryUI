import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { Catalog } from '../modules/catalog/models/Catalog';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getCatalogs() {
    return this.http.get(env.baseUrl + 'Catalog');
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Catalog', { params: queryParam });
  }

  getCatalog(id: number) {
    return this.http.get(env.baseUrl + 'Catalog/' + id);
  }

  createCatalogs(catalog: Catalog) {
    return this.http.post(env.baseUrl + 'Catalog', catalog);
  }

  updateCatalogs(catalog: Catalog, id: number) {
    return this.http.put(env.baseUrl + 'Catalog/' + id, catalog);
  }

  removeCatalogs(id: number) {
    return this.http.delete(env.baseUrl + 'Catalog/' + id);
  }
}
