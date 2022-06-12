import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerExcelIconComponent } from './spinner-excel-icon.component';

describe('SpinnerExcelIconComponent', () => {
  let component: SpinnerExcelIconComponent;
  let fixture: ComponentFixture<SpinnerExcelIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerExcelIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerExcelIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
