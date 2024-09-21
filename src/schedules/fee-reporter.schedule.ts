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
    const feeData = await feeRetrievalService.fetchFeeData();
    console.log(JSON.stringify(feeData));

    const crypto = 'Bitcoin';
    const fee = 0.0223;
    const unit = 'BTC';
    this.feeReportingService.reportFee(crypto, fee, unit);
  }
}
