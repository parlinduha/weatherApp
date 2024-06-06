import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { WeatherService } from './utils/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private swUpdate: SwUpdate,
    private weatherService: WeatherService
  ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe((event) => {
        if (event.type === 'VERSION_READY') {
          if (confirm('New version available. Load New Version?')) {
            window.location.reload();
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.weatherService.service_get_data_live().subscribe((response) => {
      localStorage.setItem('ombrometer', JSON.stringify(response));
      // console.log('API Response:', response);
    });
  }
}
