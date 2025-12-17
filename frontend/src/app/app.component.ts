import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface WeatherData {
  condition: string;
  temperature: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Hong Kong Current Weather';
  weather: WeatherData = { condition: 'Loading...', temperature: 'Loading...' };
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather(): void {
    this.http.get<WeatherData>('http://localhost:3001/weather').subscribe({
      next: (data) => {
        this.weather = data;
        this.error = null;
      },
      error: (err) => {
        this.error = 'Failed to load weather data';
        console.error(err);
      }
    });
  }
}