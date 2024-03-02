import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAgreementComponent } from './detail-agreement.component';

describe('DetailAgreementComponent', () => {
  let component: DetailAgreementComponent;
  let fixture: ComponentFixture<DetailAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAgreementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
