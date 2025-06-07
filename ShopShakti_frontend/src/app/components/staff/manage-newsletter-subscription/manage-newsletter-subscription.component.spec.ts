import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsletterSubscriptionComponent } from './manage-newsletter-subscription.component';

describe('ManageNewsletterSubscriptionComponent', () => {
  let component: ManageNewsletterSubscriptionComponent;
  let fixture: ComponentFixture<ManageNewsletterSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageNewsletterSubscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNewsletterSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
