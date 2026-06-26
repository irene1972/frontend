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

<<<<<<< HEAD
  getRatingByID(rating_id:number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `${rating_id}`);
=======
  getDetailRatingsByUser(user_id:number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `usuario/get-all/${user_id}`);
  }

  insertRating(body: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, body, {});
>>>>>>> 0e3e87984c4e53db8e2ee60e5a1283436be17f4f
  }
}
