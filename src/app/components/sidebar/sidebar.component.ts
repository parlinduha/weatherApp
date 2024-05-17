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
  themeToggle = false;

  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'home', link: '/dashboard', selected: false },
    { title: 'Settings', icon: 'settings', link: '/settings', selected: false },
  ];
  constructor(private router: Router) {
    this.setSelectedMenuItem();
  }

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) =>
      this.initializeDarkTheme(mediaQuery.matches)
    );
  }

  setSelectedMenuItem() {
    const currentRoute = this.router.url;
    this.menuItems.forEach((item) => {
      item.selected = item.link === currentRoute;
    });
  }
  // Check/uncheck the toggle and update the theme based on isDark
  initializeDarkTheme(isDark:any) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark theme
  toggleChange(ev:any) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  // Add or remove the "dark" class on the document body
  toggleDarkTheme(shouldAdd:any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
