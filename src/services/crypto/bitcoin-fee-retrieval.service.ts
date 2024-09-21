import { Injectable } from '@nestjs/common';
import { BaseFeeRetrievalService } from '../base-fee-retrieval.service';

@Injectable()
export class BitcoinFeeRetrievalService extends BaseFeeRetrievalService {
  protected endpoint = 'https://bitcoiner.live/api/fees/estimates/latest';
}
