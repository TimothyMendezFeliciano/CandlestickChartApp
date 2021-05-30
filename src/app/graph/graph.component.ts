import { Component, OnInit } from "@angular/core";
import { BinanceAPIService } from "../services/binance-api.service";
import { GoogleChartsDataTableInterface } from "ng2-google-charts/lib/google-charts-datatable";
import { GoogleChartInterface } from "ng2-google-charts";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements OnInit {
  private candleStickChart: GoogleChartInterface;
  private isReady: boolean = false;

  selectedTimeFrame: string = "";
  availableTimeFrames: string[] = ["1m", "15m", "1h", "4h", "1d", "3d"];

  constructor(private binanceAPI: BinanceAPIService) {}

  ngOnInit() {
    this.binanceAPI
      .getCandleStickData()
      .pipe(
        finalize(() => {
          console.log("The Chart", this.candleStickChart);
          this.isReady = true;
        })
      )
      .subscribe({
        next: (result) => {
          let data = [];
          result.forEach((candle) => {
            data.push([
              candle.openTime.toString().slice(0, 4),
              +candle.low,
              +candle.open,
              +candle.close,
              +candle.high,
            ]);
          });

          this.candleStickChart = {
            chartType: "CandlestickChart",
            dataTable: data,
            firstRowIsData: true,
          };
        },
      });
  }
}
