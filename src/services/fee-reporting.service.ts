import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { IFeeReportingService } from 'src/common/interfaces/fee-reporting.interface';

@Injectable()
export class FeeReportingService implements IFeeReportingService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  reportFee(name: string, fee: number, unit: string): void {
    const timestamp = new Date().toISOString();
    this.logger.log(`Fee for ${name} at ${timestamp}: ${fee} ${unit}`);
  }
}
