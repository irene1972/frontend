import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private baseUrl = `${environment.apiUrl}/valoraciones/`;
  httpClient = inject(HttpClient);

  getRatingsByUser(user_id:number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `usuario/${user_id}/promedio`);
  }

  getRatingByID(rating_id:number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `${rating_id}`);
  }
}
