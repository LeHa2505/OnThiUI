import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventContractComponent } from './event-contract.component';

describe('EventContractComponent', () => {
  let component: EventContractComponent;
  let fixture: ComponentFixture<EventContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
