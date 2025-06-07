import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeaturedCategoriesComponent } from './manage-featured-categories.component';

describe('ManageFeaturedCategoriesComponent', () => {
  let component: ManageFeaturedCategoriesComponent;
  let fixture: ComponentFixture<ManageFeaturedCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFeaturedCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFeaturedCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
