import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDateComponent } from './generic-date.component';

describe('GenericDateComponent', () => {
  let component: GenericDateComponent;
  let fixture: ComponentFixture<GenericDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
