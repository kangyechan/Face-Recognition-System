import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  constructor(private http: HttpClient) {}

  listen(state: string): Observable<any> {
    console.log(state);
    return this.http.post(SERVER_API_URL + 'api/stream/live', state);
  }

  doorOpen(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/camera/door-open');
  }

  getCaptureURL() {
    // return require('/Users/kang-yechan/Desktop/jhipster-frs/src/main/resources/images/live.jpg');
  }
}
