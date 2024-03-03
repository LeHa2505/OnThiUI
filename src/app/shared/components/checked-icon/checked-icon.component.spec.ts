import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedIconComponent } from './checked-icon.component';

describe('CheckedIconComponent', () => {
  let component: CheckedIconComponent;
  let fixture: ComponentFixture<CheckedIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckedIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckedIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
