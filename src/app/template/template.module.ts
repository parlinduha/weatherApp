import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplatePageRoutingModule } from './template-routing.module';

import { TemplatePage } from './template.page';
import { SharedModule } from '../components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatePageRoutingModule,
    SharedModule
  ],
  declarations: [TemplatePage]
})
export class TemplatePageModule {}
