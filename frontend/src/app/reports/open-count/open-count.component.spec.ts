import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCountComponent } from './open-count.component';

describe('OpenCountComponent', () => {
  let component: OpenCountComponent;
  let fixture: ComponentFixture<OpenCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
