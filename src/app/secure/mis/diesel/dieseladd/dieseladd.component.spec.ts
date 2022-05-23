import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DieseladdComponent } from './dieseladd.component';

describe('DieseladdComponent', () => {
  let component: DieseladdComponent;
  let fixture: ComponentFixture<DieseladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DieseladdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DieseladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
