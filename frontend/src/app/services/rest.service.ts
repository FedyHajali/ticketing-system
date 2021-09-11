import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../models/Ticket';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  baseUrl = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  getTicketReceiverList(receiver?: string) {
    return this.httpClient.get<Ticket[]>(
      this.baseUrl + '/api/ticket-list-dest/' + receiver
    );
  }
}
