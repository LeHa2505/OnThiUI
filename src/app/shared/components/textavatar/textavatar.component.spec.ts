import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TextavatarComponent } from './textavatar.component';

describe('TextavatarComponent', () => {
  let component: TextavatarComponent;
  let fixture: ComponentFixture<TextavatarComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextavatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
