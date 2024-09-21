import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FeeReportingService } from 'src/services/fee-reporting.service';

@Injectable()
export class FeeReportingSchedule {
  constructor(private readonly feeReportingService: FeeReportingService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const crypto = 'Bitcoin';
    const fee = 0.0223;
    const unit = 'BTC';
    this.feeReportingService.reportFee(crypto, fee, unit);
  }
}
