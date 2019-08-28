import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FLASK_SERVER_API_URL, SERVER_API_URL } from 'app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DetectCaptureService {
  constructor(private http: HttpClient) {}

  getDetectList(): Observable<any> {
    return this.http.get(FLASK_SERVER_API_URL + 'detect/infolist');
  }

  getDetectImage(info: string, nameList: any, checkList: any): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/detect/get-detect-image', {
      responseType: 'json',
      params: { info, nameList, checkList }
    });
  }
}
