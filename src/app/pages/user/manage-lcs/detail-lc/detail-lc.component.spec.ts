import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLcComponent } from './detail-lc.component';

describe('DetailLcComponent', () => {
  let component: DetailLcComponent;
  let fixture: ComponentFixture<DetailLcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailLcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
