import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/env/env';
import { Batch } from '../models/Batch';

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  constructor(private http: HttpClient) {}

  getBatchs() {
    return this.http.get(env.baseUrl + 'Batch');
  }

  search(queryParam: HttpParams) {
    return this.http.get(env.baseUrl + 'Batch', { params: queryParam });
  }

  getBatch(vendorId: number) {
    return this.http.get(env.baseUrl + 'Batch/' + vendorId);
  }

  createBatchs(batch: Batch) {
    return this.http.post(env.baseUrl + 'Batch', batch);
  }

  updateBatchs(batch: Batch, id: number) {
    return this.http.put(env.baseUrl + 'Batch/' + id, batch);
  }

  removeBatchs(id: number) {
    return this.http.delete(env.baseUrl + 'Batch/' + id);
  }
}
