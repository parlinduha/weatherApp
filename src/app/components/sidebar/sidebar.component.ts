import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  link: string;
  selected: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'home', link: '/dashboard', selected: false },
    { title: 'Settings', icon: 'settings', link: '/settings', selected: false },
  ];
  constructor(private router: Router) {
    this.setSelectedMenuItem();
  }

  ngOnInit() {}

  setSelectedMenuItem() {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      item.selected = item.link === currentRoute;
    });
  }
}
