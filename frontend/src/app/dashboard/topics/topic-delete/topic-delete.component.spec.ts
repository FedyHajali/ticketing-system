import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDeleteComponent } from './topic-delete.component';

describe('TopicDeleteComponent', () => {
  let component: TopicDeleteComponent;
  let fixture: ComponentFixture<TopicDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
