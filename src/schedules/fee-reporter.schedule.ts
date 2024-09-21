import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CRYPTO_CONFIG } from 'src/config/crypto.config';
import { FeeServiceFactoryService } from 'src/factories/fee-service-factory.service';

@Injectable()
export class FeeReportingSchedule {
  constructor(private readonly feeServiceFactory: FeeServiceFactoryService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    for (const crypto of CRYPTO_CONFIG) {
      const feeRetrievalService =
        this.feeServiceFactory.createFeeRetrievalService(crypto.unit);

      const feeCalculationService =
        this.feeServiceFactory.createFeeCalculationService(crypto.unit);

      const fee = feeCalculationService.calculateFee(
        await feeRetrievalService.fetchFeeData(),
      );

      this.feeServiceFactory
        .createFeeReportingService()
        .reportFee(crypto.name, fee, crypto.unit);
    }
  }
}
