import React from 'react';
import { Coins, TrendingUp, Shield } from 'lucide-react';
import { WalletButton } from './WalletButton';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Token Pals</h1>
              <p className="text-xs text-gray-500">Exchange Hub</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span>Markets</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Shield className="w-4 h-4" />
              <span>Escrow</span>
            </a>
          </nav>
          
          <WalletButton />
        </div>
      </div>
    </header>
  );
};