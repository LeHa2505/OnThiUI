import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLessonComponent } from './check-lesson.component';

describe('CheckLessonComponent', () => {
  let component: CheckLessonComponent;
  let fixture: ComponentFixture<CheckLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckLessonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
