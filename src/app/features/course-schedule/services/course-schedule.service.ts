import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';

const ROOT_API = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class CourseScheduleService {
  constructor(private http: HttpClient) {}

  getCourseSchedules(startDate: string, endDate: string) {
    return this.http.get(`${ROOT_API}/course-schedules`, {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
  }

  generateToOnprogress(id: number) {
    return this.http.put(`${ROOT_API}/course-schedules/${id}/onProgress`, {});
  }

  addAttendance(id: number, data: any) {
    return this.http.post(
      `${ROOT_API}/course-schedules/${id}/attendances`,
      data
    );
  }
}
