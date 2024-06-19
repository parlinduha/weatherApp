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
  selector: 'app-solar-irradiance',
  templateUrl: './solar-irradiance.component.html',
  styleUrls: ['./solar-irradiance.component.scss'],
})
export class SolarIrradianceComponent implements OnInit {
  solar: number | null = null;
  unit: string = '';
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getSolar();
  }

  getSolar() {
    // const localStorageData = localStorage.getItem('anemometer');
    this.weatherService.service_get_data_live().subscribe((data) => {
      const parsedData: WindDirectionData = data;
      // console.log('object is', parsedData);

      if (parsedData && parsedData.sensor) {
        const windSensor = parsedData.sensor.find(
          (sensor: Sensor) => sensor.title === 'Solar'
        );
        if (windSensor) {
          const windSpeedData = windSensor.list.find(
            (item: [string, string, string]) => item[0] === 'Light'
          );
          if (windSpeedData) {
            this.solar = parseFloat(windSpeedData[1]);
            this.unit = windSpeedData[2];
          }
        }
      }
    });
  }
  getHumidityDisplay(): string {
    return this.solar !== null ? this.solar.toString() : '--/--';
  }
}
