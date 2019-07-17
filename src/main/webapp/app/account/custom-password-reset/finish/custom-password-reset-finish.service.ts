import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPasswordResetFinishService {
  constructor(private http: HttpClient) {}

  save(keyAndPassword: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/account/custom-reset-password/finish', keyAndPassword);
  }
}
