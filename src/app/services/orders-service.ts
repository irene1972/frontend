import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl=`${environment.apiUrl}/pedidos/`;
      httpClient=inject(HttpClient);
    
     getOrdersByUser(user_id:number):Observable<any>{
      return this.httpClient.get<any>(this.baseUrl+`usuario/${user_id}/ventas`);
    }
}
