export interface IFeeReportingService {
  reportFee(crypto: string, fee: number, unit: string): Promise<void>;
}
