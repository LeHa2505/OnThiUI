import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ConfirmbuttonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
