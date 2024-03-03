import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageIconComponent } from './message-icon.component';

describe('MessageIconComponent', () => {
  let component: MessageIconComponent;
  let fixture: ComponentFixture<MessageIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
