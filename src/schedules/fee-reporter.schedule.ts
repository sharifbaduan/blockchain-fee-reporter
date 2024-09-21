import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FeeServiceFactoryService } from 'src/factories/fee-service-factory.service';
import { FeeReportingService } from 'src/services/fee-reporting.service';

@Injectable()
export class FeeReportingSchedule {
  constructor(
    private readonly feeReportingService: FeeReportingService,
    private readonly feeServiceFactory: FeeServiceFactoryService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const feeRetrievalService =
      this.feeServiceFactory.createFeeRetrievalService('bitcoin');

    const feeCalculationService =
      this.feeServiceFactory.createFeeCalculationService('bitcoin');

    const fee = feeCalculationService.calculateFee(
      await feeRetrievalService.fetchFeeData(),
    );

    this.feeReportingService.reportFee('Bitcoin', fee, 'BTC');
  }
}
