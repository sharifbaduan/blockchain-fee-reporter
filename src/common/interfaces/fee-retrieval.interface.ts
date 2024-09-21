export interface IFeeRetrievalService {
  fetchFeeData(): Promise<number>;
}
