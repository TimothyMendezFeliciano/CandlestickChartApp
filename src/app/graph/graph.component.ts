import { Component, OnInit } from "@angular/core";
import { BinanceAPIService } from "../services/binance-api.service";
import { GoogleChartInterface } from "ng2-google-charts";
import { finalize } from "rxjs/operators";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements OnInit {
  private candleStickChart: GoogleChartInterface;
  private isReady: boolean = false;

  defaultTimeFrame: string = "1d";
  availableTimeFrames: string[] = [
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "8h",
    "12h",
    "1d",
    "3d",
    "1w",
    "1M",
  ];

  defaultMarketPair: string = "BTCUSDT";
  availableMarketPairs: string[];

  defaultLimit: number = 30;
  availableLimit: number[] = [14, 30, 50, 100, 250, 500, 1000];
  private options: FormGroup;
  constructor(private binanceAPI: BinanceAPIService, private fb: FormBuilder) {
    this.options = this.fb.group({
      timeFrame: new FormControl(""),
      marketPair: new FormControl(""),
      limit: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getSymbolsPair();
    this.getCandleData(
      this.defaultMarketPair,
      this.defaultTimeFrame,
      this.defaultLimit
    );
  }

  getSymbolsPair() {
    this.isReady = false;
    this.binanceAPI
      .getSymbolsPair()
      .pipe(
        finalize(() => {
          this.isReady = true;
        })
      )
      .subscribe({
        next: (marketPairs) => {
          this.availableMarketPairs = marketPairs;
        },
      });
  }

  getCandleData(marketPair: string, interval: string, limit: number) {
    this.isReady = false;
    this.binanceAPI
      .getCandleStickData(marketPair, interval, limit)
      .pipe(
        finalize(() => {
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
            options: {
              candlestick: {
                fallingColor: { fill: "#FF0000", stroke: "#FF0000" },
                risingColor: { fill: "47FF00", stroke: "47FF00" },
              },
              title: "Bit Barcode",
              titlePosition: "out",
              titleTextStyle: {
                color: "#000000",
                fontSize: 24,
                bold: true,
              },
              vAxis: {
                title: this.options.value.marketPair
                  ? this.options.value.marketPair
                  : this.defaultMarketPair,
              },
              hAxis: {
                title: "TimeFrame",
              },
              height: 500,
              backgroundColor: {
                stroke: "black",
                strokeWidth: 5,
              },
            },
          };
        },
      });
  }

  onSubmit() {
    let mP = this.defaultMarketPair;
    let tF = this.defaultTimeFrame;
    let l = this.defaultLimit;
    if (this.options.value.marketPair) {
      mP = this.options.value.marketPair;
    }
    if (this.options.value.timmeFrame) {
      tF = this.options.value.timmeFrame;
    }
    if (this.options.value.limit) {
      l = this.options.value.limit;
    }

    this.getCandleData(mP, tF, l);
  }
}
