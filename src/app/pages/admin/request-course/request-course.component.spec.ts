import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCourseComponent } from './request-course.component';

describe('RequestCourseComponent', () => {
  let component: RequestCourseComponent;
  let fixture: ComponentFixture<RequestCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
