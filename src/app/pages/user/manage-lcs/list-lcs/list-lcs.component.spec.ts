import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLCsComponent } from './list-lcs.component';

describe('ListLCsComponent', () => {
  let component: ListLCsComponent;
  let fixture: ComponentFixture<ListLCsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLCsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
