import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSubscribeComponent } from './group-subscribe.component';

describe('GroupSubscribeComponent', () => {
  let component: GroupSubscribeComponent;
  let fixture: ComponentFixture<GroupSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
