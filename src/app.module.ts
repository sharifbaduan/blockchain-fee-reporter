import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeeReportingService } from './services/fee-reporting.service';
import { FeeReportingSchedule } from './schedules/fee-reporter.schedule';
import winstonTransporter from './transporters/winston.transporter';
import { HttpModule } from '@nestjs/axios';
import { BitcoinFeeRetrievalService } from './services/crypto/bitcoin-fee-retrieval.service';
import { FeeServiceFactoryService } from './factories/fee-service-factory.service';
import { BitcoinFeeCalculationService } from './services/crypto/bitcoin-fee-calculation.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: winstonTransporter,
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FeeReportingSchedule,
    FeeReportingService,
    BitcoinFeeRetrievalService,
    BitcoinFeeCalculationService,
    FeeServiceFactoryService,
  ],
})
export class AppModule {}
