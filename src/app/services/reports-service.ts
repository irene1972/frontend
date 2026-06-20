import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl = `${environment.apiUrl}/reportes`;
  private httpClient = inject(HttpClient);

  getAllReports(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl);
  }
}
