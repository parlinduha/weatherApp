import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { WeatherService } from '../utils/weather.service';
import { HttpErrorResponse } from '@angular/common/http';

interface WeatherData {
  id: number;
  sensor_id: string;
  value: string;
  unit: string | null;
  name: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  temperatureUnit = 'C';
  dataWeather: WeatherData[] = [];
  dataWh25: any[] = [];
  feelsLike: string = '';
  currentDate: string = '';
  currentDay: string = '';
  humidity: string = '';
  dewPointValue: string = '';
  dewPointUnit: string = '';
  pressure: string = '';
  pressureInhumi: string = '';
  pressureIntemp: string = '';
  pressureUnit: string = '';
  wind: string = '';
  windPeakSpeed: string = '';
  solarIrradiance: string = '';
  gustSpeed: string = '';
  rain: string = '';
  uv: string = '';
  latitude: string = '';
  longitude: string = '';

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit() {
    this.printCurrentPosition();
    this.setCurrentDate();
    this.getDataLive();
  }

  getDataLive() {
    this.weatherService.service_get_data_live().subscribe(
      (response: any) => {
        localStorage.setItem('response', JSON.stringify(response));
        this.dataWeather = response.data.weather;
        this.dataWh25 = response.data.wh25;
        console.log('ini data wh25', this.dataWh25);

        // Find the "Feels Like" data
        const feelsLikeData = this.dataWeather.find(
          (item) => item.name === 'Feels Like'
        );
        if (feelsLikeData) {
          this.feelsLike = feelsLikeData.value;
        }
        // Find additional data
        const humidityData = this.dataWeather.find(
          (item) => item.name === 'Outdoor Humidity'
        );
        if (humidityData) {
          this.humidity = humidityData.value;
          console.log('Humidity data', this.humidity);
        }
        const firstWh25Data = this.dataWh25[0];
        if (firstWh25Data) {
          this.pressure = firstWh25Data.abs;
          this.pressureInhumi = firstWh25Data.inhumi;
          this.pressureIntemp = firstWh25Data.intemp;
          this.pressureUnit = firstWh25Data.unit;
          console.log('Pressure data', this.pressure);
        }

        const dewPointData = this.dataWeather.find(
          (item) => item.name === 'Dew Point'
        );
        if (dewPointData) {
          this.dewPointValue = dewPointData.value;
          this.dewPointUnit = dewPointData.unit!;
          console.log('Humidity data', this.humidity);
        }
        // Find additional data
        const windData = this.dataWeather.find(
          (item) => item.name === 'Wind Speed'
        );
        if (windData) {
          this.wind = windData.value;
        }

        // wind speak data
        const windSpeakData = this.dataWeather.find(
          (item) => item.name === 'Day Wind Max'
        );
        if (windSpeakData) {
          this.windPeakSpeed = windSpeakData.value;
        }

        // solar irradiance data
        const solarIrradianceData = this.dataWeather.find(
          (item) => item.name === 'Solar Irradiance'
        );
        if (solarIrradianceData) {
          this.solarIrradiance = solarIrradianceData.value;
        }

        // gust speed data
        const gustSpeedData = this.dataWeather.find(
          (item) => item.name === 'Gust Speed'
        );
        if (gustSpeedData) {
          this.gustSpeed = gustSpeedData.value;
        }

        // Set UV Index value
      },
      (error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        // Handle error here
      }
    );
  }

  printCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    this.latitude = coordinates.coords.latitude.toString();
    this.longitude = coordinates.coords.longitude.toString();

    console.log('Current position:', coordinates);
  };

  toggleSidebar() {}

  convertCelsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  toggleTemperatureUnit() {
    this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';
  }

  getFeelsLikeTemperature() {
    const feelsLikeCelsius = parseFloat(this.feelsLike);
    if (this.temperatureUnit === 'C') {
      return `${feelsLikeCelsius}°C`;
    } else {
      const feelsLikeFahrenheit =
        this.convertCelsiusToFahrenheit(feelsLikeCelsius);
      return `${feelsLikeFahrenheit.toFixed(1)}°F`;
    }
  }

  setCurrentDate() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    this.currentDay = formattedDate.split(',')[0];
    this.currentDate = formattedDate.split(',')[1].trim().replace(/\/|-/g, ' ');
  }

  showLink() {
    this.router.navigate(['/show-data']);
  }
}
