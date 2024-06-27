import { UvIndexComponent } from './../cards/uv-index/uv-index.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DewPointComponent } from '../cards/dew-point/dew-point.component';
import { HumidityComponent } from '../cards/humidity/humidity.component';
import { PowerComponent } from '../cards/power/power.component';
import { PressureComponent } from '../cards/pressure/pressure.component';
import { RainEventComponent } from '../cards/rain-event/rain-event.component';
import { RainRateComponent } from '../cards/rain-rate/rain-rate.component';
import { TemperatureComponent } from '../cards/temperature/temperature.component';
import { SolarIrradianceComponent } from '../cards/solar-irradiance/solar-irradiance.component';

@NgModule({
  declarations: [
    DewPointComponent,
    HumidityComponent,
    PowerComponent,
    PressureComponent,
    RainEventComponent,
    RainRateComponent,
    TemperatureComponent,
    UvIndexComponent,
    SolarIrradianceComponent,
  ],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule],
  exports: [
    DewPointComponent,
    HumidityComponent,
    PowerComponent,
    PressureComponent,
    RainEventComponent,
    RainRateComponent,
    TemperatureComponent,
    UvIndexComponent,
    SolarIrradianceComponent,
  ],
})
export class SharedModule {}
