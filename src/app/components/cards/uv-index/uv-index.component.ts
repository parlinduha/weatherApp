import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/utils/weather.service';

// Define the CommonListItem interface
interface CommonListItem {
  id: string;
  val: string;
  unit: string;
  name: string;
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
      );
      // console.log('local storage: ' + JSON.stringify(localStorageData));
      if (localStorageData.common_list) {
        // Use the explicitly typed 'item' parameter
        const uvIndexData = localStorageData.common_list.find(
          (item: CommonListItem) => item.id === '0x17' // Change this line to check for the id
        );
        // console.log('object UV Index: ' + JSON.stringify(uvIndexData));
        if (uvIndexData && uvIndexData.val) {
          this.dataValue = parseFloat(uvIndexData.val);
          // console.log(
          //   'object UV Index data value: ' + JSON.stringify(this.dataValue)
          // );
        }
      }
    } catch (error) {
      console.error(error);
      this.errorMessage = '--/--';
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
