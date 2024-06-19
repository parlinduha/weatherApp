import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

// Define the CommonListItem interface
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
  selector: 'app-uv-index',
  templateUrl: './uv-index.component.html',
  styleUrls: ['./uv-index.component.scss'],
})
export class UvIndexComponent implements OnInit {
  dataValue = 0; // Replace with actual UV index data
  maxValue = 10; // Maximum possible UV index
  minRotation = 70; // Minimum rotation angle (in degrees)
  maxRotation = 202; // Maximum rotation angle (in degrees)
  errorMessage: string = '';

  constructor() {}

  ngOnInit() {
    this.get_uv_index();
    this.getUvIndexCategory();
  }

  getGaugeTransform(): string {
    const clampedPercentage = Math.min(
      Math.max(this.dataValue / this.maxValue, 0),
      1
    ); // Clamp percentage to 0-1
    const degrees =
      clampedPercentage * (this.maxRotation - this.minRotation) +
      this.minRotation;
    return `rotate(${degrees}deg)`;
  }

  get_uv_index() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      ) as WindDirectionData;
      console.log('localStorageData', JSON.stringify(localStorageData));

      const uvSensor = localStorageData.sensor.find(
        (sensor: Sensor) => sensor.title === 'Solar'
      );
      if (uvSensor) {
        const uvIndexData = uvSensor.list.find((list) => list[0] === 'UVI');
        console.log("object: " + uvIndexData);
        if (uvIndexData) {
          this.dataValue = parseFloat(uvIndexData[1]);
        }
      } else {
        this.errorMessage = "Can't find UVI data";
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Error getting data from local storage';
    }
  }

  getUvIndexCategory(): string {
    if (this.dataValue >= 0 && this.dataValue <= 2) {
      return 'Low ';
    } else if (this.dataValue >= 3 && this.dataValue <= 5) {
      return 'Moderate ';
    } else if (this.dataValue >= 6 && this.dataValue <= 7) {
      return 'High ';
    } else if (this.dataValue >= 8 && this.dataValue <= 10) {
      return 'Very High ';
    } else if (this.dataValue > 11) {
      return 'Extreme ';
    } else {
      return '';
    }
  }
}
