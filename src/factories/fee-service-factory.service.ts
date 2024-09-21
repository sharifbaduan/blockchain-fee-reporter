import { Injectable, Inject } from '@nestjs/common';
import { IFeeRetrievalService } from 'src/common/interfaces/fee-retrieval.interface';
import { BitcoinFeeRetrievalService } from 'src/services/crypto/bitcoin-fee-retrieval.service';

@Injectable()
export class FeeServiceFactoryService {
  constructor(
    @Inject(BitcoinFeeRetrievalService)
    private readonly bitcoinFeeRetrievalService: BitcoinFeeRetrievalService,
  ) {}

  createFeeRetrievalService(cryptoName: string): IFeeRetrievalService {
    switch (cryptoName.toLowerCase()) {
      case 'bitcoin':
        return this.bitcoinFeeRetrievalService;
      default:
        throw new Error(`No fee retrieval service found for ${cryptoName}`);
    }
  }
}
