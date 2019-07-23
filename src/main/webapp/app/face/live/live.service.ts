import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  constructor(private http: HttpClient) {}

  save(state: String): Observable<any> {
    console.log('on off state : ' + state);
    return this.http.post(SERVER_API_URL + 'api/camera/camera-state', state, { responseType: 'blob' });
  }
}
