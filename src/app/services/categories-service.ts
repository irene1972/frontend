import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private baseUrl=`${environment.apiUrl}/categorias/`;
    httpClient=inject(HttpClient);
  
   getAllCategories():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl);
  }

  getCategoryById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `${id}`);
  }

  updateCategory(id:number,body:any):Observable<any>{
    return this.httpClient.put(this.baseUrl + `${id}`,body,{})
  }

  insertCategory(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, body, {});
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `${id}`, {});
  }
}
