import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAgreementComponent } from './new-agreement.component';

describe('NewAgreementComponent', () => {
  let component: NewAgreementComponent;
  let fixture: ComponentFixture<NewAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
