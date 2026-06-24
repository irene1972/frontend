import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private baseUrl=`${environment.apiUrl}/articulo_fotos/`;
    httpClient=inject(HttpClient);
  
   getAllPhotosByArticle(article_id:number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+`get-all-by-article/${article_id}`);
  }
}
