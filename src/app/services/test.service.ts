import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  baseUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}`);
  }
}
