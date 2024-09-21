import { BitcoinFeeCalculationService } from './bitcoin-fee-calculation.service';
import { BitcoinFeeAPIResponse } from 'src/common/types/bitcoin-fee-retrieval.types';

describe('BitcoinFeeCalculationService', () => {
  let service: BitcoinFeeCalculationService;

  beforeEach(() => {
    service = new BitcoinFeeCalculationService();
  });

  it('should calculate the correct fee based on the provided estimates', () => {
    const satPervB = 5;
    const transactionSize = 140;
    const bitcoinToSatochi = 100_000_000;
    const mockData: BitcoinFeeAPIResponse = {
      estimates: {
        '30': {
          sat_per_vbyte: satPervB,
        },
      },
    };

    const fee = service.calculateFee(mockData);

    const expectedFee = (satPervB * transactionSize) / bitcoinToSatochi;
    expect(fee).toBe(expectedFee);
  });
});
