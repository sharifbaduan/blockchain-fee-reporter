import { Injectable } from '@nestjs/common';
import { IFeeCalculationService } from 'src/common/interfaces/fee-calculation.interface';
import { IFeeReportingService } from 'src/common/interfaces/fee-reporting.interface';
import { IFeeRetrievalService } from 'src/common/interfaces/fee-retrieval.interface';
import { BitcoinFeeCalculationService } from 'src/services/crypto/bitcoin-fee-calculation.service';
import { BitcoinFeeRetrievalService } from 'src/services/crypto/bitcoin-fee-retrieval.service';
import { BnbFeeCalculationService } from 'src/services/crypto/bnb-fee-calculation.service';
import { BnbFeeRetrievalService } from 'src/services/crypto/bnb-fee-retrieval.service';
import { FeeReportingService } from 'src/services/fee-reporting.service';

@Injectable()
export class FeeServiceFactoryService {
  constructor(
    private readonly bitcoinFeeRetrievalService: BitcoinFeeRetrievalService,
    private readonly bitcoinFeeCalculationService: BitcoinFeeCalculationService,
    private readonly bnbFeeRetrievalService: BnbFeeRetrievalService,
    private readonly bnbFeeCalculationService: BnbFeeCalculationService,
    private readonly feeReportingService: FeeReportingService,
  ) {}

  createFeeRetrievalService(cryptoName: string): IFeeRetrievalService {
    switch (cryptoName.toLowerCase()) {
      case 'btc':
        return this.bitcoinFeeRetrievalService;
      case 'bnb':
        return this.bnbFeeRetrievalService;
      default:
        throw new Error(`No fee retrieval service found for ${cryptoName}`);
    }
  }

  createFeeCalculationService(cryptoName: string): IFeeCalculationService {
    switch (cryptoName.toLowerCase()) {
      case 'btc':
        return this.bitcoinFeeCalculationService;
      case 'bnb':
        return this.bnbFeeCalculationService;
      default:
        throw new Error(`No fee calculation service found for ${cryptoName}`);
    }
  }

  createFeeReportingService(): IFeeReportingService {
    return this.feeReportingService;
  }
}
