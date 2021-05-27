import { TestBed } from '@angular/core/testing';

import { BinanceAPIService } from './binance-api.service';

describe('BinanceAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinanceAPIService = TestBed.get(BinanceAPIService);
    expect(service).toBeTruthy();
  });
});
