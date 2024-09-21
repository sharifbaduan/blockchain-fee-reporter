import { Injectable, Inject } from '@nestjs/common';
import { IFeeCalculationService } from 'src/common/interfaces/fee-calculation.interface';
import { IFeeReportingService } from 'src/common/interfaces/fee-reporting.interface';
import { IFeeRetrievalService } from 'src/common/interfaces/fee-retrieval.interface';
import { BitcoinFeeCalculationService } from 'src/services/crypto/bitcoin-fee-calculation.service';
import { BitcoinFeeRetrievalService } from 'src/services/crypto/bitcoin-fee-retrieval.service';
import { FeeReportingService } from 'src/services/fee-reporting.service';

@Injectable()
export class FeeServiceFactoryService {
  constructor(
    @Inject(BitcoinFeeRetrievalService)
    private readonly bitcoinFeeRetrievalService: BitcoinFeeRetrievalService,
    private readonly bitcoinFeeCalculationService: BitcoinFeeCalculationService,
    private readonly feeReportingService: FeeReportingService,
  ) {}

  createFeeRetrievalService(cryptoName: string): IFeeRetrievalService {
    switch (cryptoName.toLowerCase()) {
      case 'btc':
        return this.bitcoinFeeRetrievalService;
      default:
        throw new Error(`No fee retrieval service found for ${cryptoName}`);
    }
  }

  createFeeCalculationService(cryptoName: string): IFeeCalculationService {
    switch (cryptoName.toLowerCase()) {
      case 'btc':
        return this.bitcoinFeeCalculationService;
      default:
        throw new Error(`No fee calculation service found for ${cryptoName}`);
    }
  }

  createFeeReportingService(): IFeeReportingService {
    return this.feeReportingService;
  }
}
