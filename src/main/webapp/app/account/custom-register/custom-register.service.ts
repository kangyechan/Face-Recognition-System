import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomRegisterService {
  constructor(private http: HttpClient) {}

  save(account: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }
}
