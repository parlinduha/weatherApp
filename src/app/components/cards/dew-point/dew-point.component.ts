import { Component, OnInit } from '@angular/core';
interface CommonListItem {
  id: string;
  val: string;
  unit: string;
  name: string;
}
@Component({
  selector: 'app-dew-point',
  templateUrl: './dew-point.component.html',
  styleUrls: ['./dew-point.component.scss'],
})
export class DewPointComponent implements OnInit {
  dataValue: string = '';
  dataUnit: string = '';
  errorMessage: string = '';
  constructor() {}

  ngOnInit() {
    this.get_dew_point();
    this.get_unit();
  }

  get_dew_point() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      );
      if (localStorageData.common_list) {
        const dewPointData = localStorageData.common_list.find(
          (item: CommonListItem) => item.id == '0x03'
        );
        // console.log('object found', dewPointData);
        if (dewPointData) {
          this.dataValue = dewPointData.val;
          this.dataUnit = dewPointData.unit;
          // console.log('data value', this.dataValue);
        }
      } else {
        this.errorMessage = 'No data available';
      }
    } catch (error) {}
  }

  get_unit(): string {
    if (this.dataUnit == 'C') {
      return 'Celcius';
    } else if (this.dataUnit == 'F') {
      return 'Fahrenheit';
    } else {
      return '';
    }
  }
}
