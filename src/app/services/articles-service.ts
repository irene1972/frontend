import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IArticle, INewArticleWithPhoto } from '../interfaces/i-article';
import {
  IExploreArticulosParams,
  IExploreArticulosResponse,
} from '../interfaces/i-explore-articulos';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseUrl = `${environment.apiUrl}/articulos/`;
  httpClient = inject(HttpClient);

  getArticlesExplore(params: IExploreArticulosParams = {}): Observable<IExploreArticulosResponse> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.httpClient.get<IExploreArticulosResponse>(`${this.baseUrl}explorar`, {
      params: httpParams,
    });
  }

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

  getArticleById(id: number): Observable<IArticle> {
    return this.httpClient.get<IArticle>(this.baseUrl + id);
  }

  updateArticle(id: number, article: any): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl + id, article);
  }

  createArticleWithPhotos(data: INewArticleWithPhoto): Observable<any> {
    const formData = new FormData();
    
    formData.append('usuarios_id', data.usuarios_id.toString());
    formData.append('titulo', data.titulo);
    formData.append('descripcion', data.descripcion);
    formData.append('categorias_id', data.categorias_id.toString());
    formData.append('precio', Number(data.precio).toFixed(2).toString());
    formData.append('estado_conservacion_id',data.estado_conservacion_id);
    formData.append('estado_articulo_id', data.estado_articulo_id);
    formData.append('principal_index', data.principal_index.toString());
    data.photos.filter((photo): photo is File => photo !== null).forEach((photo) => formData.append('photos', photo));
    return this.httpClient.post<INewArticleWithPhoto>(this.baseUrl + 'con-fotos', formData);
  }


  updateArticleAndCP(id:number,body:any):Observable<any>{
    return this.httpClient.put(this.baseUrl + `${id}/cp`,body,{})
  }

  updateArticleVendido(id:number,body:any):Observable<any>{
    return this.httpClient.patch(this.baseUrl + `${id}/actualiza-estado-vendido`,body,{})
  }

  deleteArticle(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + `${id}`, {});
  }
}

