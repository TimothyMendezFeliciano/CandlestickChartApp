import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CandleStick } from "../models/candlestick.model";
import { map } from "rxjs/operators";
import { ExchangeInformationInterface } from "../models/exchange-information.model";

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
    return this.http.get<ExchangeInformationInterface>(
      baseEndpoint + routes.exchangeInfo
    );
  }

  getSymbolsPair() {
    let symbolsPair = [];
    return this.http
      .get<ExchangeInformationInterface>(baseEndpoint + routes.exchangeInfo)
      .pipe(
        map((exchangeInfo) => {
          for (let i = 0; i < 100; i++) {
            symbolsPair.push(exchangeInfo.symbols[i].symbol);
          }
          return symbolsPair;
        })
      );
  }

  getCandleStickData(marketPair: string, interval: string, limit: number) {
    let params: HttpParams = new HttpParams()
      .set("symbol", marketPair)
      .set("interval", interval)
      // .set("limit", limit);
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
