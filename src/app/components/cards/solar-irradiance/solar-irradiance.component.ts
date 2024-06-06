import { Component, OnInit } from '@angular/core';
interface CommonListItem {
  id: string;
  val: string;
  unit: string;
  name: string;
}
@Component({
  selector: 'app-solar-irradiance',
  templateUrl: './solar-irradiance.component.html',
  styleUrls: ['./solar-irradiance.component.scss'],
})
export class SolarIrradianceComponent implements OnInit {
  dataValue: string = '';
  dataUnit: string = '';
  errorMessage: string = '';
  constructor() {}

  ngOnInit() {
    this.get_solarIrradiance();
  }

  get_solarIrradiance() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      );
      if (localStorageData.common_list) {
        const data = localStorageData.common_list.find(
          (item: CommonListItem) => item.id == '0x15'
        );
        // console.log('object found', data);
        if (data) {
          const valArray = data.val.split(' ');
          this.dataValue = valArray[0];
          this.dataUnit = valArray[1];
          // console.log('data unit', this.dataUnit);
          // console.log('data value', this.dataValue);
        }
      } else {
        this.errorMessage = 'No data available';
      }
    } catch (error) {
      console.error(error);
    }
  }
}
