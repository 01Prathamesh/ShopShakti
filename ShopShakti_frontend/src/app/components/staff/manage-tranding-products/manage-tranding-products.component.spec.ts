import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrandingProductsComponent } from './manage-tranding-products.component';

describe('ManageTrandingProductsComponent', () => {
  let component: ManageTrandingProductsComponent;
  let fixture: ComponentFixture<ManageTrandingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTrandingProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrandingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
