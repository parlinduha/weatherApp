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
  created_at: string;
}
interface RangeData {
  low: string;
  max: string;
  unit: string;
}

@Component({
  selector: 'app-dew-point',
  templateUrl: './dew-point.component.html',
  styleUrls: ['./dew-point.component.scss'],
})
export class DewPointComponent implements OnInit {
  rainRange: RangeData | null = null;

  constructor() {}

  ngOnInit() {
    this.getRainFall();
  }

  getRainFall() {
    const localStorageData = localStorage.getItem('ombrometer');
    if (localStorageData) {
      const parsedData: WindDirectionData = JSON.parse(localStorageData);

      if (parsedData && parsedData.sensor) {
        const rainSensor = parsedData.sensor.find(
          (sensor: Sensor) => sensor.title === 'Rainfall'
        );
        // console.log('object is rain', JSON.stringify(rainSensor));
        if (rainSensor) {
          const rangeMatch = rainSensor.range?.match(
            /(\d+\.?\d*)\s*(mm)\s*to\s*(\d+\.?\d*)/
          );

          this.rainRange = rangeMatch
            ? {
                low: `${rangeMatch[1]}`,
                max: `${rangeMatch[3]}`,
                unit: `${rangeMatch[2]}`,
              }
            : null;
        }
      }
    }
  }
}
