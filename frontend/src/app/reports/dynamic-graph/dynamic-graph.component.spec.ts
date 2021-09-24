import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicGraphComponent } from './dynamic-graph.component';

describe('DynamicGraphComponent', () => {
  let component: DynamicGraphComponent;
  let fixture: ComponentFixture<DynamicGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
