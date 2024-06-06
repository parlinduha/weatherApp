import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.scss'],
})
export class PressureComponent implements OnInit {
  dataValueAbs: string = '';
  dataUnitAbs: string = '';
  dataValueRel: string = '';
  dataUnitRel: string = '';
  errorMessage: string = '';

  constructor() {}

  ngOnInit() {
    this.get_pressure();
  }

  get_pressure() {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem('ombrometer') || '{}'
      );
      // console.log('localStorageData', JSON.stringify(localStorageData));
      if (localStorageData) {
        const data = localStorageData.wh25[0];
        console.log('object found', data);
        if (data) {
          const valArrayAbs = data.abs.split(' ');
          this.dataValueAbs = valArrayAbs[0];
          this.dataUnitAbs = valArrayAbs[1];
          console.log('data unit Abs', this.dataUnitAbs);
          console.log('data value Abs', this.dataValueAbs);
          const valArrayRel = data.rel.split(' ');
          this.dataValueRel = valArrayRel[0];
          this.dataUnitRel = valArrayRel[1];
          console.log('data unit Rel', this.dataUnitRel);
          console.log('data value Rel', this.dataValueRel);
        }
      } else {
        this.errorMessage = 'No data available';
      }
    } catch (error) {
      console.error(error);
    }
  }
}
