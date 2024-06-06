import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  // api_url = 'http://172.15.2.170:80/api/get-ombrometer';
  api_url = 'http://172.15.2.170:80/api/sensor/data/weather';

  constructor(private http: HttpClient) {}

  service_get_data_live(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    // Return the Observable without subscribing
    return this.http.get(this.api_url, httpOptions).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
