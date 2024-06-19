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
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.scss'],
})
export class PowerComponent implements OnInit {
  dataValue: string = '';
  dataUnit: string = '';
  errorMessage: string = '';
  isBatteryOn: boolean = false;

  constructor() {}

  ngOnInit() {
    this.statusBattery();
  }

  statusBattery() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      ) as WindDirectionData;

      const batteryData = localStorageData.battery;
      if (batteryData) {
        this.dataValue = batteryData.list[0];
        this.isBatteryOn = this.dataValue === 'All battery are ok';
      } else {
        this.errorMessage = "Can't find battery data";
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Error getting data from local storage';
    }
  }
}
