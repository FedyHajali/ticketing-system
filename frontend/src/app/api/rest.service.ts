import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  baseUrl = 'http://localhost:8000';
  constructor(private httpClient: HttpClient) {}

  
}
