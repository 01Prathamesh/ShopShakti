import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBenefitsComponent } from './manage-benefits.component';

describe('ManageBenefitsComponent', () => {
  let component: ManageBenefitsComponent;
  let fixture: ComponentFixture<ManageBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBenefitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
