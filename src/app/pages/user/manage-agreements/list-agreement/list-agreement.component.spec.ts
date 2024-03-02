import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAgreementComponent } from './list-agreement.component';

describe('ListAgreementComponent', () => {
  let component: ListAgreementComponent;
  let fixture: ComponentFixture<ListAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
