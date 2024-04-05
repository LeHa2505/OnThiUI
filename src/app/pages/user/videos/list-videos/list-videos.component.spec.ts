import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVideosComponent } from './list-videos.component';

describe('ListVideosComponent', () => {
  let component: ListVideosComponent;
  let fixture: ComponentFixture<ListVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
