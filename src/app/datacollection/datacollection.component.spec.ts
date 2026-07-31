import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacollectionComponent } from './datacollection.component';

describe('DatacollectionComponent', () => {
  let component: DatacollectionComponent;
  let fixture: ComponentFixture<DatacollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatacollectionComponent]
    });
    fixture = TestBed.createComponent(DatacollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
