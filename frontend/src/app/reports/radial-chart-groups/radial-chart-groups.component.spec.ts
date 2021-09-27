import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialChartGroupsComponent } from './radial-chart-groups.component';

describe('RadialChartGroupsComponent', () => {
  let component: RadialChartGroupsComponent;
  let fixture: ComponentFixture<RadialChartGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadialChartGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialChartGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
