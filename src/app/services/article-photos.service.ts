import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlePhotosService {
  private baseUrl = `${environment.apiUrl}/articulo_fotos`;
  private httpClient = inject(HttpClient);

  getAllArticlePhotos(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }

  getArticlePhotoById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }
}
