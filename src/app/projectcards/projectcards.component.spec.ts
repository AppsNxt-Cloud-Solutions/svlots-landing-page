import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectcardsComponent } from './projectcards.component';

describe('ProjectcardsComponent', () => {
  let component: ProjectcardsComponent;
  let fixture: ComponentFixture<ProjectcardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectcardsComponent]
    });
    fixture = TestBed.createComponent(ProjectcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
