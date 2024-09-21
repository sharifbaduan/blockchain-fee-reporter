import { Test, TestingModule } from '@nestjs/testing';
import { FeeReportingService } from './fee-reporting.service';
import { Logger } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

describe('FeeReportingService', () => {
  let service: FeeReportingService;
  let logger: Logger;

  const mockDate = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(async () => {
    jest.useFakeTimers();
    jest.setSystemTime(mockDate);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeeReportingService,
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FeeReportingService>(FeeReportingService);
    logger = module.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should log the correct fee reporting message', () => {
    const name = 'Bitcoin';
    const fee = 0.00012;
    const unit = 'BTC';

    service.reportFee(name, fee, unit);

    const timestamp = mockDate.toISOString();
    expect(logger.log).toHaveBeenCalledWith(
      `Fee for ${name} at ${timestamp}: ${fee} ${unit}`,
    );
  });
});
