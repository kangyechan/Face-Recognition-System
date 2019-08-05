import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {}

  makeFolder(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/make-member', { responseType: 'text' });
  }
}
