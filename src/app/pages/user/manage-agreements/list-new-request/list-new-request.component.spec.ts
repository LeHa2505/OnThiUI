import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewRequestComponent } from './list-new-request.component';

describe('ListNewRequestComponent', () => {
  let component: ListNewRequestComponent;
  let fixture: ComponentFixture<ListNewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
