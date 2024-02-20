import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceverificationComponent } from './faceverification.component';

describe('FaceverificationComponent', () => {
  let component: FaceverificationComponent;
  let fixture: ComponentFixture<FaceverificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaceverificationComponent]
    });
    fixture = TestBed.createComponent(FaceverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
