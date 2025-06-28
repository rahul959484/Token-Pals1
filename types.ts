export interface Trade {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  counterparty?: string;
  escrowAddress: string;
  creator: string;
}

export interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}