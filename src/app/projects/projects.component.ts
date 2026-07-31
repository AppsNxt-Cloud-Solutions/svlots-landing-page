import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent
 
{
  constructor(
    private router: Router,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  
  ngAfterViewInit(): void {
    const sections = this.el.nativeElement.querySelectorAll(".project-section , .project-section1");

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


  goToHome() {
    this.router.navigate(['/main']);
  }

}
