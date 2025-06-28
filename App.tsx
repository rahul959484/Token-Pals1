import React, { useState } from 'react';
import { Header } from './components/Header';
import { EscrowForm } from './components/EscrowForm';
import { TradeHistory } from './components/TradeHistory';
import { MarketOverview } from './components/MarketOverview';
import { Trade, Token } from './types';

const mockTokens: Token[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43250.75, change24h: 2.34 },
  { symbol: 'ETH', name: 'Ethereum', price: 2580.42, change24h: -1.23 },
  { symbol: 'USDC', name: 'USD Coin', price: 1.0001, change24h: 0.01 },
  { symbol: 'USDT', name: 'Tether', price: 0.9998, change24h: -0.02 },
  { symbol: 'SOL', name: 'Solana', price: 98.76, change24h: 5.67 },
  { symbol: 'ADA', name: 'Cardano', price: 0.4523, change24h: -2.45 },
  { symbol: 'DOT', name: 'Polkadot', price: 7.89, change24h: 1.78 },
  { symbol: 'LINK', name: 'Chainlink', price: 14.56, change24h: 3.21 }
];

function App() {
  const [trades, setTrades] = useState<Trade[]>([]);

  const handleCreateEscrow = (tradeData: Omit<Trade, 'id' | 'createdAt'>) => {
    const newTrade: Trade = {
      ...tradeData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    setTrades(prevTrades => [newTrade, ...prevTrades]);
  };

  const handleCompleteTrade = (tradeId: string) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === tradeId
          ? { ...trade, status: 'completed' as const }
          : trade
      )
    );
  };

  const handleCancelTrade = (tradeId: string) => {
    setTrades(prevTrades =>
      prevTrades.map(trade =>
        trade.id === tradeId
          ? { ...trade, status: 'cancelled' as const }
          : trade
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Secure Token
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {' '}Exchange
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trade tokens safely with our decentralized escrow system. 
            Connect directly with other traders in a trustless environment.
          </p>
        </div>

        {/* Market Overview */}
        <div className="mb-8">
          <MarketOverview tokens={mockTokens} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Escrow Form */}
          <div>
            <EscrowForm tokens={mockTokens} onCreateEscrow={handleCreateEscrow} />
          </div>

          {/* Trade History */}
          <div>
            <TradeHistory 
              trades={trades} 
              onCompleteTrade={handleCompleteTrade}
              onCancelTrade={handleCancelTrade}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">24/7</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Always Available</h3>
            <p className="text-gray-600">Trade anytime with our automated escrow system</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">0%</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Zero Fees</h3>
            <p className="text-gray-600">No platform fees, only network gas costs</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">∞</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Infinite Pairs</h3>
            <p className="text-gray-600">Trade any token pair with custom rates</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;