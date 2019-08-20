import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FLASK_SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  constructor(private http: HttpClient) {}

  doorOpen(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'door/open');
  }
}
