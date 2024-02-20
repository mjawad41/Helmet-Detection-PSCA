import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsmComponent } from './asm.component';

describe('AsmComponent', () => {
  let component: AsmComponent;
  let fixture: ComponentFixture<AsmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsmComponent]
    });
    fixture = TestBed.createComponent(AsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
