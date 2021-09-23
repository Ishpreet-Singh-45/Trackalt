import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictCalendarComponent } from './district-calendar.component';

describe('DistrictCalendarComponent', () => {
  let component: DistrictCalendarComponent;
  let fixture: ComponentFixture<DistrictCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
