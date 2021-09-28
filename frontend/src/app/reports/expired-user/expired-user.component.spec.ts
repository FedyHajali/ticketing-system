import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredUserComponent } from './expired-user.component';

describe('ExpiredUserComponent', () => {
  let component: ExpiredUserComponent;
  let fixture: ComponentFixture<ExpiredUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
