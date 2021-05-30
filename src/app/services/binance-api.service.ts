import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CandleStick } from "../models/candlestick.model";
import { map } from "rxjs/operators";

const baseEndpoint: string = "https://api.binance.com";

const routes = {
  testConnectivity: "/api/v3/ping",
  candleStick: "/api/v3/klines",
  exchangeInfo: "/api/v3/exchangeInfo",
};
@Injectable({
  providedIn: "root",
})
export class BinanceAPIService {
  constructor(private http: HttpClient) {}

  testConnectivity() {
    return this.http.get(baseEndpoint + routes.testConnectivity);
  }

  getExchangeInfo() {
    // let headers: HttpHeaders = new HttpHeaders().set(
    //   "X-MBX-APIKEY",
    //   environment.binanceAPIKey
    // );
    return this.http.get(baseEndpoint + routes.exchangeInfo);
  }

  getCandleStickData() {
    let params: HttpParams = new HttpParams()
      .set("symbol", "BTCUSDT")
      .set("interval", "4h")
      .set("limit", "30");
    return this.http
      .get<CandleStick[]>(baseEndpoint + routes.candleStick, {
        params: params,
      })
      .pipe(
        map((candlestick) => {
          let result: CandleStick[] = [];
          for (let i = 0; i < candlestick.length; i++) {
            for (let j = 0; j < 1; j++) {
              result.push({
                openTime: new Date(candlestick[i][0]),
                open: candlestick[i][1],
                high: candlestick[i][2],
                low: candlestick[i][3],
                close: candlestick[i][4],
                volume: candlestick[i][5],
                closeTime: new Date(candlestick[i][6]),
                quoteAssetVolume: candlestick[i][7],
                numberOfTrades: candlestick[i][8],
                buyBaseAssetVolume: candlestick[i][9],
                buyQuoteAssetVolume: candlestick[i][10],
                ignore: candlestick[i][11],
              });
            }
          }
          return result;
        })
      );
  }
}
