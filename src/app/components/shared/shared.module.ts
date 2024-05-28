import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CompasComponent } from '../compas/compas/compas.component';
import { UvIndexComponent } from '../uv-index/uv-index.component';

@NgModule({
  declarations: [NavbarComponent, SidebarComponent, CompasComponent, UvIndexComponent],
  imports: [CommonModule, RouterModule, IonicModule, FormsModule],
  exports: [NavbarComponent, SidebarComponent, CompasComponent, UvIndexComponent],
})
export class SharedModule {}
