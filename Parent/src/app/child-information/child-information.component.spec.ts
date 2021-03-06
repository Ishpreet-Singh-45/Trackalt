import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildInformationComponent } from './child-information.component';

describe('ChildInformationComponent', () => {
  let component: ChildInformationComponent;
  let fixture: ComponentFixture<ChildInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
