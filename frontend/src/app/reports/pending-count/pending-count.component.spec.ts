import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCountComponent } from './pending-count.component';

describe('PendingCountComponent', () => {
  let component: PendingCountComponent;
  let fixture: ComponentFixture<PendingCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
