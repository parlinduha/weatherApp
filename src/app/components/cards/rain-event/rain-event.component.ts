import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rain-event',
  templateUrl: './rain-event.component.html',
  styleUrls: ['./rain-event.component.scss'],
})
export class RainEventComponent implements OnInit {
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
      );
      // console.log('localStorageData', JSON.stringify(localStorageData));
      if (localStorageData) {
        const data = localStorageData.piezoRain.find(
          (item: any) => item.id === '0x0D'
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
