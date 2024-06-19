import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

interface Sensor {
  title: string;
  list: [string, string, string][];
}

interface WindDirectionData {
  sensor: Sensor[];
  battery: {
    title: string;
    list: string[];
  };
}

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss'],
})
export class TemperatureComponent implements OnInit {
  dataValue: number = 0;
  dataUnit: string = '';
  tempValue: number = 0;
  tempUnit: string = '';
  errorMessage: string = '';
  temperature: number | null = null;
  unit: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getTemperature();
  }

  getTemperature() {
    const localStorageData = localStorage.getItem('ombrometer');
    if (localStorageData) {
      const parsedData: WindDirectionData = JSON.parse(localStorageData);
      if (parsedData &&  parsedData.sensor) {
        const windSensor = parsedData.sensor.find(
          (sensor: Sensor) => sensor.title === 'Outdoor'
        );
        // console.log('object temperature', JSON.stringify(windSensor));
        if (windSensor) {
          const windSpeedData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Temperature'
          );
          // console.log('temp: ' + windSpeedData);
          if (windSpeedData) {
            let temperature = parseFloat(windSpeedData[1]);
            let unit = windSpeedData[2];

            this.temperature = temperature;
            this.unit = unit;
          }
        }
      }
    }
  }

  getTemperatureDisplay(): string {
    return this.temperature !== null ? this.temperature.toString() : '--/--';
  }
}
