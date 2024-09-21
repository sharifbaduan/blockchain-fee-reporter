import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CRYPTO_CONFIG } from 'src/config/crypto.config';
import { FeeServiceFactoryService } from 'src/factories/fee-service-factory.service';

@Injectable()
export class FeeReportingSchedule {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    private readonly feeServiceFactory: FeeServiceFactoryService,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    for (const crypto of CRYPTO_CONFIG) {
      try {
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
      } catch (error) {
        this.logger.error(`Failed to process ${crypto.name}: ${error.message}`);
      }
    }
  }
}
