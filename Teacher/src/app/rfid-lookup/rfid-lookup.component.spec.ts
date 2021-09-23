import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidLookupComponent } from './rfid-lookup.component';

describe('RfidLookupComponent', () => {
  let component: RfidLookupComponent;
  let fixture: ComponentFixture<RfidLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
