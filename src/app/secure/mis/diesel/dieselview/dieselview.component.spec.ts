import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieselviewComponent } from './dieselview.component';

describe('DieselviewComponent', () => {
  let component: DieselviewComponent;
  let fixture: ComponentFixture<DieselviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieselviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DieselviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
