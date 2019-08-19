import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LnbService {
  constructor(private http: HttpClient) {}

  makeAligndata(): Observable<any> {
    return this.http.get(SERVER_API_URL + ' api/lnb/make-align-data', { responseType: 'text' });
  }

  makeClassifier(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/lnb/make-classifier', { responseType: 'text' });
  }
}
