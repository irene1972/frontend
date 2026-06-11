import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl=`${environment.apiUrl}/login/`;
  httpClient=inject(HttpClient);

 loginUser(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, body, {})
  }
}
