import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripdetailsComponent } from './add-tripdetails.component';

describe('AddTripdetailsComponent', () => {
  let component: AddTripdetailsComponent;
  let fixture: ComponentFixture<AddTripdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTripdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
