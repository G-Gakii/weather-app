import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  latitude = signal(0);
  longitude = signal(0);

  constructor(private http: HttpClient) {}

  getLocation(): Observable<void> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.latitude.set(latitude);
          this.longitude.set(longitude);
          observer.next();
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  getWeather(): Observable<any> {
    return this.getLocation().pipe(
      switchMap(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude()}&lon=${this.longitude()}&appid=${
          environment.apiKey
        }`;
        return this.http.get(apiUrl);
      })
    );
  }
}
