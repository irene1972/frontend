import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl=`${environment.apiUrl}/usuarios/`;
    httpClient=inject(HttpClient);
  
   getAllUsers():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl);
  }

  getCount():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'count');
  }

  getCountRol():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'count/rol/Moderador');
  }

  getCountBlocked():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl + 'count/bloqueado/1');
  }
}
