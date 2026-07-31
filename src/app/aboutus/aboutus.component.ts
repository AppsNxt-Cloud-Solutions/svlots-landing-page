// import { Component } from '@angular/core';
import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent {

  constructor(
    private router: Router,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  goToHome() {
    this.router.navigate(['/main']);
  }
  ngAfterViewInit(): void {
    const sections = this.el.nativeElement.querySelectorAll(".about-section, .why-section, .visionary-section, .mentor-section, .vision-section, .mission-section");

    const observerOptions = {
      threshold: 0.1  // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add 'visible' class when the section is in view
          this.renderer.addClass(entry.target, 'visible');
        } else {
          // Remove 'visible' class when the section leaves view to reset animation
          this.renderer.removeClass(entry.target, 'visible');
        }
      });
    }, observerOptions);

    sections.forEach((section: Element) => {
      observer.observe(section);
    });
  }
}