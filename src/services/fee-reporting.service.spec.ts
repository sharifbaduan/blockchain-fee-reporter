import { Test, TestingModule } from '@nestjs/testing';
import { FeeReportingService } from './fee-reporting.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';

describe('FeeReportingService', () => {
  let service: FeeReportingService;
  let cacheManager: Cache;
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
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FeeReportingService>(FeeReportingService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
    logger = module.get<Logger>(WINSTON_MODULE_NEST_PROVIDER);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should log the correct fee reporting message and set the cache when the fee is different', async () => {
    const name = 'Bitcoin';
    const fee = 0.00012;
    const unit = 'BTC';

    await service.reportFee(name, fee, unit);

    const timestamp = mockDate.toISOString();
    expect(logger.log).toHaveBeenCalledWith(
      `Fee for ${name} at ${timestamp}: ${fee} ${unit}`,
    );
    expect(cacheManager.set).toHaveBeenCalledWith(unit, fee, 0);
  });

  it('should not report the fee if it has not changed', async () => {
    const name = 'Bitcoin';
    const fee = 0.00012;
    const unit = 'BTC';

    (cacheManager.get as jest.Mock).mockResolvedValue(fee);

    await service.reportFee(name, fee, unit);

    expect(logger.log).not.toHaveBeenCalled();
    expect(cacheManager.set).not.toHaveBeenCalled();
  });
});
