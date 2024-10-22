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
  getlocation(): Promise<void> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.latitude.set(latitude);
          this.longitude.set(longitude);
          resolve();
        },
        (error) => reject(error)
      );
    });
  }

  getWeather(): Observable<any> {
    return from(this.getlocation()).pipe(
      switchMap(() => {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude()}&lon=${this.longitude()}&appid=${
          environment.apiKey
        }`;
        return this.http.get(apiUrl);
      })
    );
  }
}
