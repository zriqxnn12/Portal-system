import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  addFeedback(data: any) {
    return this.http.post(`${ROOT_API}/feedbacks`, data);
  }
}
