import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FLASK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class MemberLiveService {
  constructor(private http: HttpClient) {}

  doorOpen(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'door/open');
  }

  delMember(selectedList: any): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/delete-members-folder', {
      responseType: 'text',
      params: { selectedList }
    });
  }
}
