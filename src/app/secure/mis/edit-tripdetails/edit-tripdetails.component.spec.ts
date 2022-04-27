import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripdetailsComponent } from './edit-tripdetails.component';

describe('EditTripdetailsComponent', () => {
  let component: EditTripdetailsComponent;
  let fixture: ComponentFixture<EditTripdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTripdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
