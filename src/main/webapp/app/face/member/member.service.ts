import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {}

  initMembersFolder(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/init-members', {
      responseType: 'json'
    });
  }

  makeMembersFolder(folderPath: string, folderName: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/make-members-folder', {
      responseType: 'text',
      params: { folderPath, folderName }
    });
  }

  readMemberFolderLists(folderId: string, folderName: string, folderPath: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/read-member-folder-list', {
      responseType: 'json',
      params: { folderId, folderName, folderPath }
    });
  }

  getImagePath(selectPath: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/get-member-image', {
      responseType: 'json',
      params: { selectPath }
    });
  }

  getSingleImagePath(selectPath: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/get-single-member-image', {
      responseType: 'json',
      params: { selectPath }
    });
  }

  delMemberFolder(selectedList: any): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/delete-members-folder', {
      responseType: 'text',
      params: { selectedList }
    });
  }

  copySelectMember(destPath: string, copyList: any, copyNameList: any): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/copy-member-list', {
      responseType: 'text',
      params: { copyList, copyNameList, destPath }
    });
  }
}
