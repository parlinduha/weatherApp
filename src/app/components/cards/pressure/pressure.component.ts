import { Component, OnInit } from '@angular/core';

interface Sensor {
  title: string;
  list: [string, string, string][];
}

interface WindDirectionData {
  status: string;
  message: string;
  data: {
    sensor: Sensor[];
    battery: {
      title: string;
      list: string[];
    };
    created_at: string;
  };
}

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss'],
})
export class PressureComponent implements OnInit {
  absolute: number | null = null;
  unitAbs: string = '';
  relative: number | null = null;
  unitRel: string = '';

  constructor() {}

  ngOnInit() {
    this.getPressure();
  }

  getPressure() {
    const anemometerData = localStorage.getItem('ombrometer');
    if (anemometerData !== null) {
      const jsonData = JSON.parse(anemometerData);
      const pressureSensor = jsonData.sensor.find(
        (sensor: any) => sensor.title === 'Pressure'
      );
      const absolutePressure = pressureSensor.list.find(
        (list: any) => list[0] === 'Absolute'
      );
      const relativePressure = pressureSensor.list.find(
        (list: any) => list[0] === 'Relative'
      );

      this.absolute = parseFloat(absolutePressure[1]);
      this.unitAbs = absolutePressure[2];
      this.relative = parseFloat(relativePressure[1]);
      this.unitRel = relativePressure[2];

      return; // menambahkan return untuk menghentikan eksekusi fungsi
    } else {
      return 'none';
    }
  }

  getPressureRelative(): string {
    return this.relative !== null ? this.relative.toFixed(2) : '--/--';
  }

  getPressureAbsolute(): string {
    return this.absolute !== null ? this.absolute.toFixed(2) : '--/--';
  }
}
