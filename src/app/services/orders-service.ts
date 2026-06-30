import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ICreateOrderRequest,
  ICreateOrderResponse,
  IUserPurchase,
  IUserPurchaseSales
} from '../interfaces/i-purchase';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = `${environment.apiUrl}/pedidos/`;
  httpClient = inject(HttpClient);

  getOrdersByUser(user_id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `usuario/${user_id}/ventas`);
  }

  getPurchasesByUser(user_id: number): Observable<IUserPurchase[]> {
    return this.httpClient.get<IUserPurchase[]>(this.baseUrl + `usuario/${user_id}`);
  }

  getAllDataOrderById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `${id}/todos-datos`);
  }

  createOrder(body: ICreateOrderRequest): Observable<ICreateOrderResponse> {
    return this.httpClient.post<ICreateOrderResponse>(this.baseUrl, body);
  }

  getSalesByUser(user_id: number): Observable<IUserPurchaseSales> {
    return this.httpClient.get<IUserPurchaseSales>(this.baseUrl + `usuario/${user_id}/ventas`);
  }

}
