import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {}

  initMembersFolder(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/init-members', { responseType: 'json' });
  }

  makeMembersFolder(folderPath: string, folderName: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/make-members-folder', { responseType: 'text', params: { folderPath, folderName } });
  }

  readMemberFolderLists(folderId: string, folderName: string, folderPath: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/read-member-folder-list', {
      responseType: 'json',
      params: { folderId, folderName, folderPath }
    });
  }

  delMemberFolder(selectedList: any): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/delete-members-folder', { responseType: 'text', params: { selectedList } });
  }
}
