import { SymbolInterface } from "./symbol.model";
export interface ExchangeInformationInterface {
  timezone: string;
  serverTime: number;
  symbols: SymbolInterface[];
}
