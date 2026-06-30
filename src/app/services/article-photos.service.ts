import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IArticlePhoto } from '../interfaces/i-article-photo.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlePhotosService {
  private baseUrl = `${environment.apiUrl}/articulo_fotos`;
  private httpClient = inject(HttpClient);

  getAllArticlePhotos(): Observable<IArticlePhoto[]> {
    return this.httpClient.get<IArticlePhoto[]>(this.baseUrl);
  }

  getArticlePhotoById(id: number): Observable<IArticlePhoto> {
    return this.httpClient.get<IArticlePhoto>(`${this.baseUrl}/${id}`);
  }

  postPhotoByArticleId(file: File, principal: number, articulos_id: number): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('url_photo', "");
    formData.append('principal', String(principal));
    formData.append('articulos_id', String(articulos_id));
    return this.httpClient.post<any>(this.baseUrl, formData);
  }
}
