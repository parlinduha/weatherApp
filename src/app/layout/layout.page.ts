import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  temperatureUnit = 'C';

  constructor() {}

  ngOnInit() {}

  toggleSidebar() {}
  convertCelsiusToFahrenheit(celsius: number) {
    return (celsius * 9) / 5 + 32;
  }

  toggleTemperatureUnit() {
    this.temperatureUnit = this.temperatureUnit === 'C' ? 'F' : 'C';
  }
}
