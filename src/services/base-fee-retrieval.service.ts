import { IFeeRetrievalService } from 'src/common/interfaces/fee-retrieval.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseFeeRetrievalService implements IFeeRetrievalService {
  protected abstract endpoint: string;

  constructor(protected httpService: HttpService) {}

  async fetchFeeData(): Promise<any> {
    const response = await this.httpService.axiosRef.get(this.endpoint);
    return response.data;
  }
}
