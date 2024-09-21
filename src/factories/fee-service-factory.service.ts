import { Injectable, Inject } from '@nestjs/common';
import { IFeeCalculationService } from 'src/common/interfaces/fee-calculation.interface';
import { IFeeRetrievalService } from 'src/common/interfaces/fee-retrieval.interface';
import { BitcoinFeeCalculationService } from 'src/services/crypto/bitcoin-fee-calculation.service';
import { BitcoinFeeRetrievalService } from 'src/services/crypto/bitcoin-fee-retrieval.service';

@Injectable()
export class FeeServiceFactoryService {
  constructor(
    @Inject(BitcoinFeeRetrievalService)
    private readonly bitcoinFeeRetrievalService: BitcoinFeeRetrievalService,
    private readonly bitcoinFeeCalculationService: BitcoinFeeCalculationService,
  ) {}

  createFeeRetrievalService(cryptoName: string): IFeeRetrievalService {
    switch (cryptoName.toLowerCase()) {
      case 'bitcoin':
        return this.bitcoinFeeRetrievalService;
      default:
        throw new Error(`No fee retrieval service found for ${cryptoName}`);
    }
  }

  createFeeCalculationService(cryptoName: string): IFeeCalculationService {
    switch (cryptoName.toLowerCase()) {
      case 'bitcoin':
        return this.bitcoinFeeCalculationService;
      default:
        throw new Error(`No fee calculation service found for ${cryptoName}`);
    }
  }
}
