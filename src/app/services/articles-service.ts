import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseUrl = `${environment.apiUrl}/articulos/`;
  httpClient = inject(HttpClient);

  getArticlesByUser(user_id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `get-all/usuario/${user_id}`);
  }

  getCountArticlesByUser(user_id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `usuario/${user_id}/publicados`);
  }

  getArticlesRecentlyUploaded(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + 'recientes');
  }

  getArticlesBestSellers(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + 'mas-vendidos');
  }

  getArticleById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + id);
  }

  updateArticleAndCP(id:number,body:any):Observable<any>{
    return this.httpClient.put(this.baseUrl + `${id}/cp`,body,{})
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `${id}`, {});
  }
}