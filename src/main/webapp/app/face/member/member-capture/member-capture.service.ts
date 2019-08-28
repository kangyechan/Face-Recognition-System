import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FLASK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MemberCaptureService {
  constructor(private http: HttpClient) {}

  getMatchList(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'match/namelist');
  }

  getOriginImage(name: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/match/get-origin-image', {
      responseType: 'json',
      params: { name }
    });
  }
}
