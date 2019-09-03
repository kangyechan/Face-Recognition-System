import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FLASK_SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LnbService {
  constructor(private http: HttpClient) {}

  preProcessing(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'lnb/preprocessing', { responseType: 'json' });
  }

  learning(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'lnb/learning', { responseType: 'json' });
  }

  reStart(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'recognition/restart');
  }
}
