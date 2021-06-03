import { Component, OnInit, ViewChild } from "@angular/core";
import { BinanceAPIService } from "../services/binance-api.service";
import { finalize } from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { CandlestickChartComponent } from "./candlestick-chart/candlestick-chart.component";

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements OnInit {
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

  defaultLimit: number = 14;
  availableLimit: number[] = [14, 30, 50, 100, 250, 500, 1000];

  private options: FormGroup;

  @ViewChild(CandlestickChartComponent, { static: false })
  candleStickChild!: CandlestickChartComponent;
  constructor(private binanceAPI: BinanceAPIService, private fb: FormBuilder) {
    this.options = this.fb.group({
      timeFrame: new FormControl(""),
      marketPair: new FormControl(""),
      limit: new FormControl(""),
    });
  }

  ngOnInit() {
    this.getSymbolsPair();
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

  onSubmit() {
    this.candleStickChild.generateNewGraph(
      this.options.value.marketPair,
      this.options.value.timeFrame,
      this.options.value.limit
    );
  }

  isReadyVerification(isReady: boolean) {}
}
