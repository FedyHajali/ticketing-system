import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketAddReceiverComponent } from './ticket-add-receiver.component';

describe('TicketAddReceiverComponent', () => {
  let component: TicketAddReceiverComponent;
  let fixture: ComponentFixture<TicketAddReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketAddReceiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketAddReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
