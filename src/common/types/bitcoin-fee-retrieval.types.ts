interface BitcoinFeeEstimates {
  sat_per_vbyte: number;
}

export interface BitcoinFeeAPIResponse {
  estimates: Record<string, BitcoinFeeEstimates>;
}
