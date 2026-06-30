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
  
   registerUser(body: any): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, body);
  }

   getAllUsers():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl);
  }

  getUserById(id:string):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+`${id}`);
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

  updateBlock(user_id:number,body:any,bloqueo:number):Observable<any>{
    return this.httpClient.patch(this.baseUrl + `${user_id}/bloqueado/${bloqueo}`,body,{})
  }

  updateUser(user_id: number, body: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + `${user_id}`, body);
  }

  updateRole(user_id:number,body:any,role:string):Observable<any>{
    return this.httpClient.patch(this.baseUrl + `${user_id}/rol/${role}`,body,{})
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `${id}`, {});
  }
}
