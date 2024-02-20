import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePassingComponent } from './vehicle-passing.component';

describe('VehiclePassingComponent', () => {
  let component: VehiclePassingComponent;
  let fixture: ComponentFixture<VehiclePassingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclePassingComponent]
    });
    fixture = TestBed.createComponent(VehiclePassingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
