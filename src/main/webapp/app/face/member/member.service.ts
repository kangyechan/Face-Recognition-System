import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable, ObservedValueOf } from 'rxjs';

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

  delMemberFolder(selectedList: any): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/delete-members-folder', {
      responseType: 'text',
      params: { selectedList }
    });
  }

  getImagePath(selectPath: string): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/member/get-member-image', {
      responseType: 'json',
      params: { selectPath }
    });
  }

  copySelectMember(destPath: string, copyList: any, copyNameList: any): Observable<any> {
    console.log(copyNameList);
    return this.http.get(SERVER_API_URL + 'api/member/copy-member-list', {
      responseType: 'text',
      params: { copyList, copyNameList, destPath }
    });
  }
}
