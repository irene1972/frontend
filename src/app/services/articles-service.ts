import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IArticle } from '../interfaces/i-article';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseUrl=`${environment.apiUrl}/articulos/`;

  httpClient=inject(HttpClient);

  getArticleById(id:string):Promise<IArticle>{
    return lastValueFrom(this.httpClient.get<IArticle>(this.baseUrl+`${id}`));
  }

  getArticlesByUser(user_id:number):Observable<any>{
  return this.httpClient.get<any>(this.baseUrl+`usuario/${user_id}/publicados`);
  }

  getArticlesRecentlyUploaded():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+`recientes`);
  }

  getArticlesBestSellers():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+`mas-vendidos`);
  }


}
