import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl=`${environment.apiUrl}/estadisticas/`;
      httpClient=inject(HttpClient);
    
     getStatisticsByPeriod(period:string):Observable<any>{
      return this.httpClient.get<any>(this.baseUrl+`dashboard?temporalidad=${period}`);
    }

    getMonthlySales(meses:number):Observable<any>{
      return this.httpClient.get<any>(this.baseUrl+`ventas-mensuales?meses=${meses}`);
    }
}
