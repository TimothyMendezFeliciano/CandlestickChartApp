import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RsiChartComponent } from './rsi-chart.component';

describe('RsiChartComponent', () => {
  let component: RsiChartComponent;
  let fixture: ComponentFixture<RsiChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RsiChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsiChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
