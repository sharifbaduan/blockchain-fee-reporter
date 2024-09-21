interface BitcoinFeeEstimates {
  sat_per_vbyte: number;
}

export interface BitcoinFeeEstimatesResponse {
  estimates: Record<string, BitcoinFeeEstimates>;
}
