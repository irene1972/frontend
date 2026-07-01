import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArticlePhoto } from '../interfaces/i-article-photo.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlePhotoService {

  private baseUrl = `${environment.apiUrl}/articulo_fotos/`;
  httpClient = inject(HttpClient);

  getFotosByArticuloId(articuloId: number): Observable<IArticlePhoto[]>{
    return this.httpClient.get<IArticlePhoto[]>(this.baseUrl + `get-all-by-article/${articuloId}`)
  }
  insertFoto(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, body, {});
  }
  
}
