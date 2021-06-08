import { Component, ViewChild } from "@angular/core";
import { GoogleChartInterface } from "ng2-google-charts";

@Component({
  selector: "app-rsi-chart",
  templateUrl: "./rsi-chart.component.html",
  styleUrls: ["./rsi-chart.component.css"],
})
export class RsiChartComponent {
  private relativeStrengthIndex: number;
  private relativeStrength: number;
  private averageUp: number;
  private averageDown: number;
  private periodN: number;

  private barChart: GoogleChartInterface;
  @ViewChild("bcc", { static: false })
  chartComponent;

  private isReady: boolean = false;

  constructor() {}

  calculateRSI(data: OHLC[]) {
    this.isReady = false;
    let downMoves = [];
    let upMoves = [];
    this.periodN = 14; // Must be made adjustable by user.
    for (
      let index = data.length - 1; // Begin at the last value
      index > data.length - this.periodN; //Only the last periodN items
      index-- // Going back to front
    ) {
      let change = data[index].close - data[index - 1].close;
      if (change <= 0) {
        downMoves.push(change);
      } else {
        upMoves.push(change);
      }
    }
    this.averageUp = this.calculateAverage(upMoves, this.periodN);
    this.averageDown = this.calculateAverage(downMoves, this.periodN);
    this.relativeStrength = this.averageUp / this.averageDown;
    this.relativeStrengthIndex = 100 - 100 / (1 + this.relativeStrength);
    let barChartData: any[] = [];
    barChartData.push(["RSI(14)", this.relativeStrengthIndex]);
    this.barChart = this.generateChart(barChartData);
    this.isReady = true;
    this.chartComponent.draw(this.barChart);
  }

  private calculateAverage(data: number[], periodN: number) {
    let sum = 0;
    data.forEach((element) => {
      sum += Math.abs(element);
    });
    return sum / periodN;
  }

  private generateChart(data: any[]) {
    return {
      chartType: "BarChart",
      dataTable: data,
      firstRowIsData: true,
      options: {
        bars: "horizontal",
        height: 100,
        hAxis: {
          maxValue: 100,
          minValue: 0,
        },
      },
    };
  }
}
