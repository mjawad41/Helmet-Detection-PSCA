import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedchallanlistComponent } from './unverifiedchallanlist.component';

describe('UnverifiedchallanlistComponent', () => {
  let component: UnverifiedchallanlistComponent;
  let fixture: ComponentFixture<UnverifiedchallanlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnverifiedchallanlistComponent]
    });
    fixture = TestBed.createComponent(UnverifiedchallanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
