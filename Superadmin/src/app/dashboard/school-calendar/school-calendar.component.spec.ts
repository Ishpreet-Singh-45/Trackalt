import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCalendarComponent } from './school-calendar.component';

describe('SchoolCalendarComponent', () => {
  let component: SchoolCalendarComponent;
  let fixture: ComponentFixture<SchoolCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
