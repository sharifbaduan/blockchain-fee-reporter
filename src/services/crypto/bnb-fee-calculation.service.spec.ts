import { BnbFeeCalculationService } from './bnb-fee-calculation.service';
import { BnbFeeAPIResponse } from 'src/common/types/bnb-fee-retrieval.types';

describe('BnbFeeCalculationService', () => {
  let service: BnbFeeCalculationService;
  const weiToBnb = 1e18;
  const gasLimit = 55_000;

  beforeEach(() => {
    service = new BnbFeeCalculationService();
  });

  it('should correctly calculate the fee in BNB from the API response', () => {
    const mockData: BnbFeeAPIResponse = {
      result: '0x1bc16d674ec8000',
    };

    const fee = service.calculateFee(mockData);

    const expectedFee = (gasLimit * parseInt(mockData.result, 16)) / weiToBnb;
    expect(fee).toBe(expectedFee);
  });

  it('should return 0 if the result is 0', () => {
    const mockData: BnbFeeAPIResponse = {
      result: '0x0',
    };

    const fee = service.calculateFee(mockData);

    expect(fee).toBe(0);
  });

  it('should handle very large gas prices correctly', () => {
    const mockData: BnbFeeAPIResponse = {
      result: '0x1fffffffffffffff',
    };

    const fee = service.calculateFee(mockData);

    const expectedFee = (gasLimit * parseInt(mockData.result, 16)) / weiToBnb;
    expect(fee).toBe(expectedFee);
  });
});
