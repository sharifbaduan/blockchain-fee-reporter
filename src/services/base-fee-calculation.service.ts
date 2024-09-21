import { IFeeCalculationService } from 'src/common/interfaces/fee-calculation.interface';

export abstract class BaseFeeCalculationService
  implements IFeeCalculationService
{
  abstract calculateFee(data: any): number;
}
