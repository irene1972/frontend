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
  
   getAllPhotos():Observable<any>{
    return this.httpClient.get<any>(this.baseUrl);
  }
}
