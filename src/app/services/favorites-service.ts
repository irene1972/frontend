import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl=`${environment.apiUrl}/favoritos/`;
    httpClient=inject(HttpClient);
  
   getAllFavoritesByUser(user_id:number):Observable<any>{
    return this.httpClient.get<any>(this.baseUrl+`get-all/usuario/${user_id}`);
  }
}
