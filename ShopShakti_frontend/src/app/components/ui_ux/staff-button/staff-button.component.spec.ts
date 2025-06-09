import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffButtonComponent } from './staff-button.component';

describe('StaffButtonComponent', () => {
  let component: StaffButtonComponent;
  let fixture: ComponentFixture<StaffButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
