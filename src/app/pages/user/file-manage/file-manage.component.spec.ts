import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManageComponent } from './file-manage.component';

describe('FileManageComponent', () => {
  let component: FileManageComponent;
  let fixture: ComponentFixture<FileManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
