import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import { FeeReportingService } from './services/fee-reporting.service';
import { FeeReportingSchedule } from './schedules/fee-reporter.schedule';
import winstonTransporter from './transporters/winston.transporter';
import { HttpModule } from '@nestjs/axios';
import { BitcoinFeeRetrievalService } from './services/crypto/bitcoin-fee-retrieval.service';
import { FeeServiceFactoryService } from './factories/fee-service-factory.service';
import { BitcoinFeeCalculationService } from './services/crypto/bitcoin-fee-calculation.service';
import { BnbFeeRetrievalService } from './services/crypto/bnb-fee-retrieval.service';
import { BnbFeeCalculationService } from './services/crypto/bnb-fee-calculation.service';

@Module({
  imports: [
    CacheModule.register(),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: winstonTransporter,
    }),
    HttpModule,
  ],
  providers: [
    FeeReportingSchedule,
    FeeReportingService,
    BitcoinFeeRetrievalService,
    BitcoinFeeCalculationService,
    BnbFeeRetrievalService,
    BnbFeeCalculationService,
    FeeServiceFactoryService,
  ],
})
export class AppModule {}
