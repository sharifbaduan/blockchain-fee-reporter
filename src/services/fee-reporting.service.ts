import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { IFeeReportingService } from 'src/common/interfaces/fee-reporting.interface';

@Injectable()
export class FeeReportingService implements IFeeReportingService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async reportFee(name: string, fee: number, unit: string): Promise<void> {
    const lastValueReported = await this.cacheManager.get<number>(unit);
    if (lastValueReported === fee) {
      return;
    }

    const timestamp = new Date().toISOString();
    this.logger.log(`Fee for ${name} at ${timestamp}: ${fee} ${unit}`);

    await this.cacheManager.set(unit, fee, 0);
  }
}
