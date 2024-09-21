import { BitcoinFeeAPIResponse } from 'src/common/types/bitcoin-fee-retrieval.types';
import { BaseFeeCalculationService } from '../base-fee-calculation.service';

export class BitcoinFeeCalculationService extends BaseFeeCalculationService {
  protected readonly transactionSize: number = 140;
  protected readonly nextThreeBlocks: string = '30';
  protected readonly bitcoinToSatoshiRate: number = 100_000_000;

  calculateFee(data: BitcoinFeeAPIResponse): number {
    const nextThreeBlocksEstimate = data.estimates[this.nextThreeBlocks];
    return (
      (nextThreeBlocksEstimate.sat_per_vbyte * this.transactionSize) /
      this.bitcoinToSatoshiRate
    );
  }
}
