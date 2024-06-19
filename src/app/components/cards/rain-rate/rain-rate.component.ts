import { Component, OnInit } from '@angular/core';

interface Sensor {
  title: string;
  list: [string, string, string][];
  range?: string;
}

interface WindDirectionData {
  sensor: Sensor[];
  battery: {
    title: string;
    list: string[];
  };
}
@Component({
  selector: 'app-rain-rate',
  templateUrl: './rain-rate.component.html',
  styleUrls: ['./rain-rate.component.scss'],
})
export class RainRateComponent implements OnInit {
  dataValue: string = '';
  dataUnit: string = '';
  errorMessage: string = '';

  constructor() {}

  ngOnInit() {
    this.get_rainRate();
  }

  get_rainRate() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      ) as WindDirectionData;

      const rainSensor = localStorageData.sensor.find(
        (sensor: Sensor) => sensor.title === 'Rainfall'
      );
      if (rainSensor) {
        const rate = rainSensor.list.find((list) => list[0] === 'Rate');
        // console.log('localStorageData', JSON.stringify(rate));
        if (rate) {
          this.dataValue = rate[1];
          this.dataUnit = rate[2];
        } else {
          this.errorMessage = "Can't find Rainfall Rate data";
        }
      } else {
        this.errorMessage = "Can't find Rainfall sensor data";
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Error getting data from local storage';
    }
  }
}
