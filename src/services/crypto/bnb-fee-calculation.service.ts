import { BnbFeeAPIResponse } from 'src/common/types/bnb-fee-retrieval.types';
import { BaseFeeCalculationService } from '../base-fee-calculation.service';

export class BnbFeeCalculationService extends BaseFeeCalculationService {
  private readonly gasLimit: number = 55_000;
  private readonly weiToBnbRatio: number = 1e18;

  calculateFee(data: BnbFeeAPIResponse): number {
    const feeWei = this.gasLimit * parseInt(data.result, 16);
    return feeWei / this.weiToBnbRatio;
  }
}
