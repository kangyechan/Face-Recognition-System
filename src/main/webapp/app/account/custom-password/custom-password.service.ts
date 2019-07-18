import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomPasswordService {
  constructor(private http: HttpClient) {}

  save(newPassword: string, currentPassword: string): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/account/custom-change-password', { currentPassword, newPassword });
  }
}
