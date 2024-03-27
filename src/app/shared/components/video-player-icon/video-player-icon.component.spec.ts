import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerIconComponent } from './video-player-icon.component';

describe('VideoPlayerIconComponent', () => {
  let component: VideoPlayerIconComponent;
  let fixture: ComponentFixture<VideoPlayerIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoPlayerIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPlayerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
