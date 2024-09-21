import { IFeeRetrievalService } from 'src/common/interfaces/fee-retrieval.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export abstract class BaseFeeRetrievalService implements IFeeRetrievalService {
  protected abstract endpoint: string;

  constructor(protected httpService: HttpService) {}

  async fetchFeeData(): Promise<any> {
    try {
      const response = this.httpService.get(this.endpoint);
      const { data } = await lastValueFrom(response);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data from the API: ${error.message}`);
    }
  }
}
