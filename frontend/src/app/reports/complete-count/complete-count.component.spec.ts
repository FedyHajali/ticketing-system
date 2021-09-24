import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCountComponent } from './complete-count.component';

describe('CompleteCountComponent', () => {
  let component: CompleteCountComponent;
  let fixture: ComponentFixture<CompleteCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
