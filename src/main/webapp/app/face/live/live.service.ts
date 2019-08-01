import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  constructor(private http: HttpClient) {}

  listen(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/camera/live', { responseType: 'text' });
  }

  doorOpen(state: String): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/camera/door-open', state);
  }

  getCaptureURL() {
    return SERVER_API_URL + 'api/camera/live';
  }
}
