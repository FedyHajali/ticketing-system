import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteUserComponent } from './complete-user.component';

describe('CompleteUserComponent', () => {
  let component: CompleteUserComponent;
  let fixture: ComponentFixture<CompleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
