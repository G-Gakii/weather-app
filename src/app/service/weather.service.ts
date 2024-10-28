import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Weather } from '../interface/weather';
import MyLocation from './myLocation';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getLocation(): Observable<MyLocation> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let myLocation = new MyLocation(latitude, longitude);

          observer.next(myLocation);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  getWeather(): Observable<Weather> {
    return this.getLocation().pipe(
      switchMap((myLocation: MyLocation) => {
        console.log('my location', myLocation);
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLocation.latitude}&lon=${myLocation.longitude}&appid=${environment.apiKey}`;
        return this.http.get<Weather>(apiUrl);
      })
    );
  }
}
