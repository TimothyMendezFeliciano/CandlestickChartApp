export interface CandleStick {
  openTime: Date;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: Date;
  quoteAssetVolume: string;
  numberOfTrades: number;
  buyBaseAssetVolume: string;
  buyQuoteAssetVolume: string;
  ignore: string;
}
