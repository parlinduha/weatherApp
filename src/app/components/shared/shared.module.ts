import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ContentComponent } from '../content/content.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule],
  exports: [
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    DashboardComponent,
  ],
})
export class SharedModule {}
