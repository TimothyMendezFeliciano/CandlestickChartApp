import { Component, ViewChild } from "@angular/core";
import { GoogleChartInterface } from "ng2-google-charts";
import { OHLC } from "src/app/models/OHCL.model";

interface RelativeStrenghIndexStatus {
  color: string[];
  state: string;
}

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

  public barChart: GoogleChartInterface;
  @ViewChild("bcc")
  chartComponent;

  public isReady: boolean = false;

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
    let rsiStatus = this.calculateRSIStatus(barChartData[0]);
    this.barChart = this.generateChart(
      barChartData,
      rsiStatus.color,
      rsiStatus.state
    );
    this.isReady = true;
    this.chartComponent.draw(this.barChart);
  }

  private calculateRSIStatus(data: any[]): RelativeStrenghIndexStatus {
    if (data[1] <= 30)
      return { color: ["#E7010B"], state: "Extremely Oversold" };
    if (data[1] <= 50) return { color: ["#E75252"], state: "Oversold" };
    if (data[1] <= 70) return { color: ["#96E752"], state: "Overbought" };
    if (data[1] <= 100)
      return { color: ["#3FFF00"], state: "Extremely Overbought" };
  }

  private calculateAverage(data: number[], periodN: number) {
    let sum = 0;
    data.forEach((element) => {
      sum += Math.abs(element);
    });
    return sum / periodN;
  }

  private generateChart(data: any[], rsiStatus: string[], rsiState: string) {
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
        colors: rsiStatus,
        title: rsiState,
        titlePosition: "out",
      },
    };
  }
}
