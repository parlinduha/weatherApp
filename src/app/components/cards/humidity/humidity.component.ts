import { Component, OnInit } from '@angular/core';

interface CommonListItem {
  id: string;
  val: string;
  unit: string;
  name: string;
}
@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.scss'],
})
export class HumidityComponent implements OnInit {
  dataValue: string = '';
  errorMessage: string = '';
  constructor() {}

  ngOnInit() {
    this.get_humidity();
  }

  get_humidity() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      );
      if (localStorageData.common_list) {
        const data = localStorageData.common_list.find(
          (item: CommonListItem) => item.id == '0x07'
        );
        // console.log('object found', data);
        if (data) {
          this.dataValue = data.val;
        }
      } else {
        this.errorMessage = 'No data available';
      }
    } catch (error) {}
  }
}
