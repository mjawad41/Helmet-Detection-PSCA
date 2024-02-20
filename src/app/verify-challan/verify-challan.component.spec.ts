import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyChallanComponent } from './verify-challan.component';

describe('VerifyChallanComponent', () => {
  let component: VerifyChallanComponent;
  let fixture: ComponentFixture<VerifyChallanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyChallanComponent]
    });
    fixture = TestBed.createComponent(VerifyChallanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
