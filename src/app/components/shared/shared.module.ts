import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule],
  exports: [
    NavbarComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
