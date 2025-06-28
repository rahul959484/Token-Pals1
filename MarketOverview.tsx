import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Token } from '../types';

interface MarketOverviewProps {
  tokens: Token[];
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ tokens }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Market Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{token.symbol}</h4>
                <p className="text-sm text-gray-600">{token.name}</p>
              </div>
              <div className="flex items-center">
                {token.change24h >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-lg font-bold text-gray-900">
                ${token.price.toFixed(4)}
              </p>
              <p
                className={`text-sm font-medium ${
                  token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};