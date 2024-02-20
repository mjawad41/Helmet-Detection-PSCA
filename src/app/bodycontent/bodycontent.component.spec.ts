import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodycontentComponent } from './bodycontent.component';

describe('BodycontentComponent', () => {
  let component: BodycontentComponent;
  let fixture: ComponentFixture<BodycontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodycontentComponent]
    });
    fixture = TestBed.createComponent(BodycontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
