import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeeReportingService } from './services/fee-reporting.service';
import { FeeReportingSchedule } from './schedules/fee-reporter.schedule';
import winstonTransporter from './transporters/winston.transporter';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: winstonTransporter,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, FeeReportingSchedule, FeeReportingService],
})
export class AppModule {}
