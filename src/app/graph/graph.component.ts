import { Component, OnInit } from "@angular/core";
import { BinanceAPIService } from "../services/binance-api.service";
import { CandleStick } from '../models/candlestick.model';

@Component({
  selector: "app-graph",
  templateUrl: "./graph.component.html",
  styleUrls: ["./graph.component.css"],
})
export class GraphComponent implements OnInit {

  private candleStickData: CandleStick[];
  constructor(private binanceAPI: BinanceAPIService) {}

  ngOnInit() {
    // this.binanceAPI.testConnectivity().subscribe({
    //   next: (test) => {
    //     console.log("Test", test);
    //   },
    // });

    // this.binanceAPI.getExchangeInfo().subscribe({
    //   next: (result) => {
    //     console.log("ExchangeInfo", result);
    //   },
    // });

    this.binanceAPI.getCandleStickData().subscribe({
      next: (result) => {
        this.candleStickData = result;
      },
    });
  }
}
