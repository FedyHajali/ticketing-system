import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSubscribeComponent } from './topic-subscribe.component';

describe('TopicSubscribeComponent', () => {
  let component: TopicSubscribeComponent;
  let fixture: ComponentFixture<TopicSubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
