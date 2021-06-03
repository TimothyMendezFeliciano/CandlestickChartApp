import {
  OnInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { BinanceAPIService } from "../../services/binance-api.service";
import { GoogleChartInterface } from "ng2-google-charts";

interface verifiedValues {
  marketPair: string;
  interval: string;
  limit: number;
}

@Component({
  selector: "app-candlestick-chart",
  templateUrl: "./candlestick-chart.component.html",
  styleUrls: ["./candlestick-chart.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandlestickChartComponent implements OnInit {
  @Input() marketPair: string;
  @Input() interval: string;
  @Input() limit: number;

  @Output() candleStickReadyEvent = new EventEmitter<boolean>(true);

  private defaultMarketPair = "BTCUSDT";
  private defaultInterval = "1d";
  private defaultLimit = 14;
  private candleStickChart: GoogleChartInterface;

  private isReady: boolean = false;

  @ViewChild("gcc", { static: false })
  chartComponent;

  constructor(private binanceAPI: BinanceAPIService) {}

  ngOnInit() {
    // this.verifyInputParameters(this.marketPair, this.interval, this.limit);
    if (this.marketPair === "" || this.marketPair === undefined) {
      this.marketPair = this.defaultMarketPair;
    }
    if (this.interval === "" || this.interval === undefined) {
      this.interval = this.defaultInterval;
    }
    if (this.limit <= 14 || this.limit === undefined) {
      this.limit = this.defaultLimit;
    }
    this.getCandleData(this.marketPair, this.interval, this.limit);
  }

  getCandleData(marketPair: string, interval: string, limit: number) {
    this.isReady = false;
    this.binanceAPI.getCandleStickData(marketPair, interval, limit).subscribe({
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
        this.candleStickChart = this.generateChart(data);
      },
      complete: () => {
        this.isReady = true;
        this.candleStickReadyEvent.emit(this.isReady);
        this.chartComponent.draw(this.candleStickChart);
      },
    });
  }

  private generateChart(data: any[]) {
    return {
      chartType: "CandlestickChart",
      dataTable: data,
      firstRowIsData: true,
      options: {
        candlestick: {
          fallingColor: { fill: "#FF0000", stroke: "#FF0000" },
          risingColor: { fill: "47FF00", stroke: "47FF00" },
        },
        title: "CandleStick Chart",
        titlePosition: "out",
        titleTextStyle: {
          color: "#000000",
          fontSize: 24,
          bold: true,
        },
        vAxis: {
          title: this.marketPair,
        },
        hAxis: {
          title: this.interval,
        },
        height: 500,
        backgroundColor: {
          stroke: "black",
          strokeWidth: 5,
        },
      },
    };
  }

  generateNewGraph(marketPair: string, interval: string, limit: number) {
    let verifiedValues = this.verifyInputParameters(
      marketPair,
      interval,
      limit
    );
    this.getCandleData(
      verifiedValues.marketPair,
      verifiedValues.interval,
      verifiedValues.limit
    );
  }

  private verifyInputParameters(
    marketPair: string,
    interval: string,
    limit: number
  ) {
    let mP = marketPair;
    let i = interval;
    let l = limit;
    if (mP === "" || mP === undefined) {
      mP = this.defaultMarketPair;
    }
    if (i === "" || i === undefined) {
      i = this.defaultInterval;
    }
    if (l <= 14 || l === undefined) {
      l = this.defaultLimit;
    }
    return { marketPair: mP, interval: i, limit: l };
  }
}
