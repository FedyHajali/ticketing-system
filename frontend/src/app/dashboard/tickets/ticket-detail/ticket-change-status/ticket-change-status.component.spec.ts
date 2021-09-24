import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketChangeStatusComponent } from './ticket-change-status.component';

describe('TicketChangeStatusComponent', () => {
  let component: TicketChangeStatusComponent;
  let fixture: ComponentFixture<TicketChangeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketChangeStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
