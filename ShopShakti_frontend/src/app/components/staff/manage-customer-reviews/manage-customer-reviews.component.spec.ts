import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomerReviewsComponent } from './manage-customer-reviews.component';

describe('ManageCustomerReviewsComponent', () => {
  let component: ManageCustomerReviewsComponent;
  let fixture: ComponentFixture<ManageCustomerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCustomerReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCustomerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
