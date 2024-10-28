import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWind, faDroplet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-currentweather',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule, FontAwesomeModule],
  templateUrl: './currentweather.component.html',
  styleUrl: './currentweather.component.css',
})
export class CurrentweatherComponent implements OnInit {
  data: any;
  faWind = faWind;
  faDroplet = faDroplet;
  constructor(private service: WeatherService) {}
  ngOnInit() {
    console.log('next');

    this.service.getWeather().subscribe({
      next: (res) => {
        this.data = res;
        console.log(res);
      },
    });
  }
}
