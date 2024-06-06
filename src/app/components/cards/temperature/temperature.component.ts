import { Component, OnInit } from '@angular/core';

interface CommonListItem {
  id: string;
  val: string;
  unit: string;
  name: string;
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
  constructor() {}

  ngOnInit() {
    this.getFeels();
    this.outdoor_temperature();
  }

  getFeels() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      );
      // console.log('local storage: ' + JSON.stringify(localStorageData));
      if (localStorageData.common_list) {
        // Use the explicitly typed 'item' parameter
        const feelsLikeData = localStorageData.common_list.find(
          (item: CommonListItem) => item.id === '3' // Change this line to check for the id
        );
        // console.log('object feelsLikeData: ' + JSON.stringify(feelsLikeData));
        if (feelsLikeData && feelsLikeData.val) {
          this.dataValue = parseFloat(feelsLikeData.val);
          this.dataUnit = feelsLikeData.unit;
          // console.log(
          //   'data value feels like: ' + JSON.stringify(this.dataValue)
          // );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  outdoor_temperature() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      );
      // console.log('local storage: ' + JSON.stringify(localStorageData));
      if (localStorageData.common_list) {
        // Use the explicitly typed 'item' parameter
        const temperatureData = localStorageData.common_list.find(
          (item: CommonListItem) => item.id === '0x02' // Change this line to check for the id
        );
        // console.log('object temperature: ' + JSON.stringify(temperatureData));
        if (temperatureData && temperatureData.val) {
          this.tempValue = parseFloat(temperatureData.val);
          this.tempUnit = temperatureData.unit;
          // console.log(
          //   'data value feels like: ' + JSON.stringify(this.dataValue)
          // );
        } else {
          this.errorMessage = 'No data available';
        }
      } else {
        this.errorMessage = 'No data available';
      }
    } catch (error) {
      console.log(error);
      this.errorMessage = 'No data available';
    }
  }
}
