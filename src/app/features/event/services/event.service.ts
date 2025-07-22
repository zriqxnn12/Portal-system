import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get(`${ROOT_API}/events`);
  }

  getEvent(id: number) {
    return this.http.get(`${ROOT_API}/events/${id}`);
  }

  generateAsParticipant(eventId: number) {
    return this.http.post(`${ROOT_API}/events/${eventId}/participants`, {});
  }
}
