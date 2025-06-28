import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Token } from '../types';

interface TokenSelectProps {
  selectedToken: string;
  onTokenChange: (token: string) => void;
  tokens: Token[];
  label: string;
}

export const TokenSelect: React.FC<TokenSelectProps> = ({
  selectedToken,
  onTokenChange,
  tokens,
  label
}) => {
  const selectedTokenData = tokens.find(t => t.symbol === selectedToken);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <select
          value={selectedToken}
          onChange={(e) => onTokenChange(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer hover:border-gray-400 transition-colors"
        >
          {tokens.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol} - {token.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {selectedTokenData && (
        <div className="flex justify-between text-sm text-gray-600">
          <span>${selectedTokenData.price.toFixed(4)}</span>
          <span className={`${selectedTokenData.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {selectedTokenData.change24h >= 0 ? '+' : ''}{selectedTokenData.change24h.toFixed(2)}%
          </span>
        </div>
      )}
    </div>
  );
};