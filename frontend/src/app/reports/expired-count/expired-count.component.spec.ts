import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredCountComponent } from './expired-count.component';

describe('ExpiredCountComponent', () => {
  let component: ExpiredCountComponent;
  let fixture: ComponentFixture<ExpiredCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
