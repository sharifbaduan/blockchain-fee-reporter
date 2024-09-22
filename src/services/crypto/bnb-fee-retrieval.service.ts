import { Injectable } from '@nestjs/common';
import { BaseFeeRetrievalService } from '../base-fee-retrieval.service';
import { lastValueFrom } from 'rxjs';
import { BnbFeeAPIResponse } from 'src/common/types/bnb-fee-retrieval.types';

@Injectable()
export class BnbFeeRetrievalService extends BaseFeeRetrievalService {
  protected endpoint = 'https://bsc.publicnode.com';

  async fetchFeeData(): Promise<BnbFeeAPIResponse> {
    const body = {
      jsonrpc: '2.0',
      method: 'eth_maxPriorityFeePerGas',
      params: [],
      id: 1,
    };

    try {
      const response = this.httpService.post(this.endpoint, body);
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      throw new Error(
        `Failed to fetch data from the BNB API: ${error.message}`,
      );
    }
  }
}
