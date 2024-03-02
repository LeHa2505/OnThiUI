import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLCComponent } from './request-lc.component';

describe('RequestLCComponent', () => {
  let component: RequestLCComponent;
  let fixture: ComponentFixture<RequestLCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestLCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestLCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
