// import { Component } from '@angular/core';
import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  totalSlides = 3;
  currentIndex: number = 1; // Start at the first real slide
  slideInterval: any; // Holds the interval for auto-sliding
  slides: NodeListOf<Element> | undefined;


  constructor(
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.startAutoSlide();
  }


  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

 
  nextSlide() {
    const carousel = document.getElementById('carousel') as HTMLElement;
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    let index = this.currentIndex + 1;
  
    if (index >= totalSlides) {
      index = 0; // Reset to first slide instead of jumping
    }
  
    this.currentIndex = index;
    carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }
  

  prevSlide(): void {
    const carousel = document.querySelector('.carousel') as HTMLElement;
  
    if (this.slides && this.slides.length > 0) {
      this.currentIndex--;
      carousel.style.transition = 'transform 0.5s ease-in-out';
      carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  
      // Reset to the last real slide after the first duplicate
      if (this.currentIndex === 0) {
        setTimeout(() => {
          carousel.style.transition = 'none';
          this.currentIndex = this.slides!.length - 2; // Use non-null assertion operator
          carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }, 500); // Match the transition duration
      }
    } else {
      console.error('Slides are undefined or empty.');
    }
  }
  
  
  ngAfterViewInit(): void {
    const sections = this.el.nativeElement.querySelectorAll(".company-info , .why-section");

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

  // Show a specific slide
  showSlide(index: number): void {
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (index >= slides.length) {
      this.currentIndex = 0;
    } else if (index < 0) {
      this.currentIndex = slides.length - 1;
    } else {
      this.currentIndex = index;
    }

    const offset = -this.currentIndex * 100;
    const carousel = document.querySelector('.carousel') as HTMLElement;
    carousel.style.transform = `translateX(${offset}%)`;
  }

}
