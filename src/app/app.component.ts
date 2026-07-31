import { Component , HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isMenuOpen: boolean = false; // To control the menu state
  isDropdownOpen: boolean = false; // To control the dropdown state
  isToolsOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isDropdownOpen = false; // Close dropdown when the menu closes
    }
  }

  toggleTools(event: Event) {
    event.preventDefault();
    this.isToolsOpen = !this.isToolsOpen;
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle dropdown open/close
  }

 closeMenu() {
  this.isMenuOpen = false;
  this.isDropdownOpen = false;
  this.isToolsOpen = false; // Close tools as well
}

  isDesktop(): boolean {
    return window.innerWidth > 768; // Change 768 to your desired breakpoint
  }

  
}