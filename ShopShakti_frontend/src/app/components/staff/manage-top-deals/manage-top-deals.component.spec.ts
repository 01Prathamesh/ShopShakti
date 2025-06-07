import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTopDealsComponent } from './manage-top-deals.component';

describe('ManageTopDealsComponent', () => {
  let component: ManageTopDealsComponent;
  let fixture: ComponentFixture<ManageTopDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTopDealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTopDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
