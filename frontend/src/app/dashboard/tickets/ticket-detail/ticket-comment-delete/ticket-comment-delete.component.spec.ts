import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCommentDeleteComponent } from './ticket-comment-delete.component';

describe('TicketCommentDeleteComponent', () => {
  let component: TicketCommentDeleteComponent;
  let fixture: ComponentFixture<TicketCommentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCommentDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCommentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
