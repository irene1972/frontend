import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseUrl=`${environment.apiUrl}/articulos/`;
      httpClient=inject(HttpClient);
    
     getArticlesByUser(user_id:number):Observable<any>{
      return this.httpClient.get<any>(this.baseUrl+`usuario/${user_id}/publicados`);
    }

    getArticleById(id:number): Observable<any> {
      return this.httpClient.get<any>(this.baseUrl + id);
    }
}
